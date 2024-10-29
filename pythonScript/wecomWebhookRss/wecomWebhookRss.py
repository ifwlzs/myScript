# -*- coding: utf-8 -*-
from datetime import datetime, timedelta

import feedparser
import requests
import json
import time
import os
import re
import html
import base64
import hashlib
import sqlite3
from bs4 import BeautifulSoup as bs

# 配置
WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=你的key'  # 替换为你的Webhook Key
DB_FILE = 'sent_items.db'
SLEEP_TIME_SECOND = 3  # 发送间隔


def init_db():
    """初始化SQLite数据库并创建表"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS sent_articles (
                        id TEXT PRIMARY KEY,
                        title TEXT,
                        link TEXT,
                        sent_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        save_time TEXT,
                        update_time TEXT
                      )''')
    conn.commit()
    conn.close()


def is_article_sent(article_id):
    """检查文章是否已经发送"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT 1 FROM sent_articles WHERE id = ?", (article_id,))
    result = cursor.fetchone()
    conn.close()
    return result is not None


def save_sent_article(article_id, title, link,update_time,save_time):
    """保存已发送的文章ID到数据库"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO sent_articles (id, title, link,update_time,save_time) VALUES (?, ?, ?, ?, ?)", (article_id, title, link,update_time,save_time))
    conn.commit()
    conn.close()


def decode_html_text(encoded_text):
    """解码HTML字符编码的文本"""
    return html.unescape(encoded_text)


def fetch_image_data(img_url):
    """下载图片并返回其Base64编码和MD5值"""
    headers = {}

    # 使用正则表达式匹配 *.sinaimg.cn 域名
    if re.search(r'^https?://(?:\w+\.)?sinaimg\.cn', img_url):
        headers['Referer'] = 'https://weibo.com'

    try:
        response = requests.get(img_url, headers=headers, timeout=30)  # 设置超时为30秒
        if response.status_code == 200:
            img_base64 = base64.b64encode(response.content).decode('utf-8')
            img_md5 = hashlib.md5(response.content).hexdigest()
            print(f"图片下载成功：{img_url}")
            return img_base64, img_md5
        else:
            print(f"图片下载失败，状态码：{response.status_code}，链接：{img_url}")
    except requests.RequestException as e:
        print(f"图片下载异常：{e}，链接：{img_url}")
    return None, None


def extract_plain_text(content_html):

    """将HTML内容转换为纯文本"""

    soup = bs(content_html, "html.parser")

    # 处理 <br> 标签，替换为换行符
    for tag in soup.find_all(["img", "br"]):
        tag.replace_with("\n" if tag.name == "br" else "[图片]")

    # 处理 <p> 标签，替换为换行符，并保留标签内的内容
    for tag in soup.find_all("p"):
        tag.insert_before("\n")  # 在 p 标签内容之前插入换行
        tag.unwrap()  # 去掉 p 标签但保留其内容
    text = soup.get_text().strip()
    print(soup.text)
    # # 使用正则替换多个连续换行符为一个换行符
    text = re.sub(r'\n\n+', '\n\n', text)
    return text


def send_text_message(content):
    """发送文本消息到企业微信"""
    payload = {
        "msgtype": "text",
        "text": {
            "content": content
        }
    }
    response = requests.post(WEBHOOK_URL, headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    if response.status_code == 200:
        print("文本消息发送成功")
    else:
        print(f"文本消息发送失败，状态码：{response.status_code}，原因：{response.text}")


def send_image_message(img_base64, img_md5):
    """发送图片消息到企业微信"""
    payload = {
        "msgtype": "image",
        "image": {
            "base64": img_base64,
            "md5": img_md5
        }
    }
    response = requests.post(WEBHOOK_URL, headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    if response.status_code == 200:
        print("图片发送成功")
    else:
        print(f"图片发送失败，状态码：{response.status_code}，原因：{response.text}")


def send_rss_content_to_wechat(content, img_urls):
    """发送RSS内容和图片列表到企业微信"""
    send_text_message(content)
    time.sleep(SLEEP_TIME_SECOND)
    if img_urls:
        for img_url in img_urls:
            img_base64, img_md5 = fetch_image_data(img_url)
            if img_base64 and img_md5:
                send_image_message(img_base64, img_md5)
                time.sleep(SLEEP_TIME_SECOND)
            else:
                print(f"跳过发送图片，加载失败：{img_url}")


def check_rss_feed(feed_url):
    """检查RSS源的更新并将新文章发送到企业微信"""
    feed = feedparser.parse(feed_url)
    for entry in feed.entries:
        if not is_article_sent(entry.id):
            content_html = entry.content[0].value
            text_content = extract_plain_text(content_html)
            updatetime1 = datetime.fromisoformat(entry.updated)+timedelta(hours=8)
            updatetime = updatetime1.strftime('%Y-%m-%d %H:%M:%S')
            content = f"{entry.title}\n\n{text_content}\n\n--------------\n来源：Rss {entry.source.title} [Powered by 小萝狸BOT] \n详情链接: {entry.link}\n发布时间：{updatetime}"
            
            save_time = datetime.now()
            save_time = save_time.strftime('%Y-%m-%d %H:%M:%S')
            # 提取图片链接
            soup = bs(content_html, "html.parser")
            img_urls = [img["src"] for img in soup.find_all("img")]
            
            # 发送内容到企业微信
            print(f"\n\n准备发送的内容：{content}")
            print(f"图片链接：{img_urls}\n\n")
            send_rss_content_to_wechat(content, img_urls)
            
            # 记录已发送的文章
            save_sent_article(entry.id, entry.title, entry.link,updatetime,save_time)


def main():
    # 初始化数据库
    init_db()

    # RSS源URL
    rss_feed_url = 'rss源'  # 替换为你需要监控的RSS源URL
    check_rss_feed(rss_feed_url)
    # # 开始轮询检查RSS源
    # while True:
    #     check_rss_feed(rss_feed_url)
    #     time.sleep(SLEEP_TIME_SECOND)  # 检查间隔


if __name__ == "__main__":
    main()
