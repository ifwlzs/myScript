import json
import re
from datetime import datetime
from bs4 import BeautifulSoup


# 当前目录下的 gaki.json
json_path = r"gaki.json"
START_DATE = "2025-07-01"
END_DATE   = "2025-12-31"

def html_to_text(html):
    soup = BeautifulSoup(html, "html.parser")

    # 去掉 script / style
    for tag in soup(["script", "style"]):
        tag.decompose()

    # 获取纯文本
    text = soup.get_text(separator="\n")

    # 清理多余空行
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return "\n".join(lines)

with open(json_path, "r", encoding="utf-8") as f:
    articles = json.load(f)

results = []


start_dt = datetime.strptime(START_DATE, "%Y-%m-%d").date()
end_dt   = datetime.strptime(END_DATE, "%Y-%m-%d").date()

for item in articles:
    title_o = item.get("data", {}).get("title", "")
    display_date = item.get("display_date", "")
    raw_comment = item.get("data", {}).get("body", "")
    comment = html_to_text(raw_comment)

    if not display_date:
        continue

    dt = datetime.strptime(display_date, "%Y-%m-%d %H:%M:%S")
    release_date_date = dt.date()

    # 时间筛选
    if not (start_dt <= release_date_date <= end_dt):
        continue

    match = re.search(r"「(.+?)」", title_o)
    title = match.group(1) if match else None

    results.append({
        "original_title": title_o,
        "title": title,
        "release_date": dt.strftime("%Y-%m-%d"),
        "issue_no": dt.strftime("%Y%m%d"),
        "sub_issue_no": dt.strftime("%y%m%d"),
        "comment": comment
    })
results.sort(key=lambda x: x["release_date"])
# 输出查看
for r in results:
    print("title_o:", r["original_title"])
    print("title:", r["title"])
    print("release_date:", r["release_date"])
    print("issue_no:", r["issue_no"])
    print("sub_issue_no:", r["sub_issue_no"])
    print("comment:")
    print(r["comment"])
    print("=" * 60)
