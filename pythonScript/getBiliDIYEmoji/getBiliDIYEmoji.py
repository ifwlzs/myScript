"""
获取哔哩哔哩emoji表情图片


表情id获取方式：
分享链接，找到id=xxx参数
https://www.bilibili.com/blackboard/activity-Mz9T5bO5Q3.html?id=111643701&type=suit&f_source=plat&from=share
"""

import datetime
import re
import time
import aiohttp
import asyncio
import os
import requests

# 登陆b站后，f12，应用程序 -> 存储 -> Cookie -> https://www.bilibili.com -> bili_jct
# bili_jct = ""

# 需要爬取表情的ID
emoji_id_list = [
    "113144801",
    "116754301",
    "1684987411001",
    "1684747640001",
    "3493134470220310",
    "111643701",
]
# 默认下载目录
base_download_path = r"D:\download"


# 创建文件夹
def mkdir(path) -> None:
    """
    创建文件夹
    """
    isExists = os.path.exists(path)
    if not isExists:
        os.makedirs(path)


# 获取emoji返回的json
def get_emoji_json(emoji_id):
    url = "https://api.bilibili.com/x/garb/v2/mall/suit/benefit?part=emoji_package&item_id=" + emoji_id  # + "&csrf=" + bili_jct
    res = requests.get(url=url)
    return res.json()


# 获取某emoji_id中的emoji对象
def get_emoji_url(emoji_id):
    emoji_json = get_emoji_json(emoji_id)
    data = emoji_json['data']
    if data is None:
        print("[error] 请输入正确的emoji id：" + emoji_id)
        return []
    dir_name = data['name']
    suit_items = data['suit_items']
    emoji_package = suit_items['emoji_package']
    emoji_package_items = emoji_package[0]['items']
    emoji_url_list = []
    for item in emoji_package_items:
        emoji_name = item['name'][1:-1]
        emoji_url = item['properties']['image']
        emoji_url_list.append({'dir_name': dir_name, 'emoji_name': emoji_name, 'emoji_url': emoji_url})
    return emoji_url_list


# 异步下载每个id的emoji图片到对应目录中
async def fetch(session, emoji_object):
    dir_name = emoji_object['dir_name']
    emoji_name = emoji_object['emoji_name']
    emoji_url = emoji_object['emoji_url']
    # print("发送请求：", emoji_url)
    async with session.get(emoji_url, verify_ssl=False) as response:
        content = await response.content.read()
        base_path = os.path.join(base_download_path, dir_name)
        mkdir(base_path)
        file_name = os.path.join(base_path, emoji_name + re.compile(r".*(\..*)").sub(r"\1", emoji_url).strip())
        with open(file_name, mode='wb') as file_object:
            file_object.write(content)
        print("下载完成", dir_name, emoji_name, emoji_url)


# 携程方法入口
async def main():
    async with aiohttp.ClientSession() as session:
        emoji_url_list = []
        for emoji_id in emoji_id_list:
            emoji_url_list.extend(get_emoji_url(emoji_id))
            time.sleep(0.5)
        print(emoji_url_list)
        tasks = [asyncio.create_task(fetch(session, emoji_object)) for emoji_object in emoji_url_list]
        await asyncio.wait(tasks)


start_time = datetime.datetime.now()
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
end_time = datetime.datetime.now()
print("====================")
print("总共耗时：", end_time - start_time)
