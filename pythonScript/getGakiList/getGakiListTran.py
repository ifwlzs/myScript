import os
import pymysql
from openai import OpenAI
import time

# 初始化 Ark OpenAI 客户端
client = OpenAI(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
    api_key=''  # 或直接写成 'your-api-key'
)
mysql_config = {
    "host": "localhost",
    "port": 3306,
    "user": "your_username",
    "password": "your_password",
    "database": "your_database",
    "charset": "utf8mb4"
}


# 连接数据库
conn = pymysql.connect(**mysql_config)
cursor = conn.cursor(pymysql.cursors.DictCursor)

# 查询未翻译的数据
cursor.execute("""
    SELECT id, context
    FROM src_gaki_playlist_import
    WHERE ai_tran_context IS NULL
     --  limit 10
""")

rows = cursor.fetchall()

# 翻译函数
def translate_text(text):
    if not text.strip():
        return ''
    try:
        response = client.chat.completions.create(
            model="deepseek-v3-250324",
            messages=[
                # {"role": "system", "content": "你是一个日语到中文的翻译助手，请保持意思准确，不要添加解释。"},
                {"role": "system", "content": "你是一位经验丰富的中日双语翻译，擅长将日本电视节目标题或句子翻译成自然、流畅、易懂的中文。请确保：\n1. 准确理解原文意思；\n2. 用通俗、贴切的中文表达；\n3. 必要时可略作润色以增强中文表达，但不要添加无关解释；\n4. 保持“标题语感”，如是节目标题请保持简洁有冲击力。\n5. 不用翻译末尾的说字，这个字含义是假说。"},
                # {
                #     "role": "system",
                #     "content": (
                #         "你是一位电视节目标题翻译师，擅长将日文综艺节目标题翻译成具有中文综艺感的标题。"
                #         "请用简洁、贴切、口语化、有冲击力的方式翻译原句，保留核心信息，可以加入疑问语气、中文综艺常用表达。"
                #         "不要添加注释或解释。"
                #     )
                # },
                # {"role": "system", "content": "你是一位经验丰富的中日双语翻译，擅长将日本电视节目标题或句子翻译成常见梗、抽象、自然、流畅、易懂的中文。不要添加注释或解释，不要翻译最后的説字，最后的説代表假说，不用管"},
                {"role": "user", "content": f"请将以下内容翻译成中文：\n{text.strip()}"}

            ],temperature=1.3
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"[翻译失败] 内容: {text[:30]}... 错误: {e}")
        return ''

# 翻译并写回
for row in rows:
    id = row['id']
    context = row['context'] or ''

    # 翻译
    tran_context = translate_text(context)

    # 打印进度
    print(f"✔ 正在翻译 ID={id}")
    print(f"  简介: {context} ➡ {tran_context}\n")

    # 写入数据库
    try:
        cursor.execute("""
            UPDATE src_gaki_playlist_import
            SET ai_tran_context=%s
            WHERE id=%s
        """, (tran_context, id))
        conn.commit()
    except Exception as e:
        print(f"[更新失败] ID={id}, 错误: {e}")
        conn.rollback()

    # 防止接口限流，简单 sleep 可选
    time.sleep(0.1)

cursor.close()
conn.close()
