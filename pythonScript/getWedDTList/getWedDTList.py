import re
import pymysql
from bs4 import BeautifulSoup
from datetime import datetime

# === 配置区 ===
html_file = r"Z:\Video\综\水曜日的Downtown\水DT节目单.html"

mysql_config = {
    "host": "localhost",
    "port": 3306,
    "user": "your_username",
    "password": "your_password",
    "database": "your_database",
    "charset": "utf8mb4"
}


# === 连接数据库 ===
conn = pymysql.connect(**mysql_config)
cur = conn.cursor()

# === 读取 HTML ===
with open(html_file, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

year = None
episode = None

# === 提取节目单内容 ===
for elem in soup.select("#write > *"):
    if elem.name == "h1":
        year = elem.get_text(strip=True)
    elif elem.name == "blockquote":
        raw = elem.get_text(strip=True)
        match = re.match(r"(\d{8})", raw)
        if not match:
            continue
        issue_no = match.group(1)
        title = raw  # 包括括号说明，如“20250409(みんなの説)”
        release_date = datetime.strptime(issue_no, "%Y%m%d").date()
        sub_issue_no = issue_no[2:]  # 取后6位
    elif elem.name == "figure" and elem.find("table"):
        table = elem.find("table")
        headers = [th.get_text(strip=True) for th in table.find_all("th")]
        rows = table.find("tbody").find_all("tr")

        for row in rows:
            cols = [td.get_text(strip=True) for td in row.find_all("td")]
            if len(cols) != 5:
                continue  # 容错

            row_data = dict(zip(headers, cols))

            try:
                seq = int(row_data.get("ID", 0))
                context = row_data.get("説", "")
                host = row_data.get("プレゼンター", "")
                results = row_data.get("検証結果", "")
                comment = row_data.get("コメント", "")

                cur.execute("""
                    INSERT INTO src_wed_dt_playlist_import (
                        issue_no, sub_issue_no, release_date, seq,
                        title, context, host, results, comment
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    issue_no,
                    sub_issue_no,
                    release_date,
                    seq,
                    title,
                    context,
                    host,
                    results,
                    comment
                ))
            except Exception as e:
                print(f"[错误] 插入失败: {e}")
                print(f"  📅 期号: {issue_no}")
                print(f"  🔢 ID: {seq}")
                print(f"  🧠 説: {context}")
                print(f"  📦 原始数据: {row_data}")

# === 提交并关闭 ===
conn.commit()
cur.close()
conn.close()

print("✅ HTML 节目单已成功导入 MySQL 数据库")
