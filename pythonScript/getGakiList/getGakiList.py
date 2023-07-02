# -*- coding: UTF-8 -*-
"""
获取ガキの使い的节目单
"""
from bs4 import BeautifulSoup
import os
import re
import lxml
import requests
from faker import Faker
import xlwings as xw
import time
import datetime
from googletrans import Translator


# 获取请求地址是
def get_url(now_year):
    this_year = int(datetime.datetime.now().year)
    if now_year == this_year:
        return base_url + "index.html"
    else:
        return base_url + str(now_year) + ".html"


# 创建文件夹
def mkdir(path) -> None:
    isExists = os.path.exists(path)
    if not isExists:
        os.makedirs(path)


#  全角字符转半角字符
def Q2B(uchar):
    """单个字符 全角转半角"""
    inside_code = ord(uchar)
    if inside_code == 0x3000:
        inside_code = 0x0020
    else:
        inside_code -= 0xfee0
    if inside_code < 0x0020 or inside_code > 0x7e:  # 转完之后不是半角字符返回原来的字符
        return uchar
    return chr(inside_code)


def stringQ2B(ustring):
    """把字符串全角转半角"""
    return "".join([Q2B(uchar) for uchar in ustring])


# 写入表格内容（页，行，列，内容）
def wrtxl(a, b, c, value):
    # wb就是新建的工作簿(workbook)，下面则对wb的sheet1的A1单元格赋值
    wb.sheets[a - 1][b - 1, c - 1].value = value
    # print(wb.sheets[0][1,1].value)
    wb.save()


# 获取谷歌翻译


def getGoogleTrans(context):
    try:
        return translater.translate(context, dest='zh-cn', src='ja').text
    except Exception as e:
        print("Error ", e)
        return ""


def getBody(now_year):
    url = get_url(now_year)
    hander = {'User-Agent': "'" + faker.user_agent() + "'"}
    # print(hander)
    response = requests.get(url, headers=hander)
    response.encoding = 'utf-8'  # 使用正确的字符编码方式进行解码
    soup = BeautifulSoup(response.text, "lxml")
    oa_month_lists = soup.find("ul", attrs={'class': 'oa-month-lists'})
    li = oa_month_lists.findAll("li", attrs={'id': None})
    res_list = []
    for i in li:
        # print(res_list)
        time.sleep(1)
        title = i.find("h3").text
        title = stringQ2B(title)
        context = i.find("div").text.strip()
        context = stringQ2B(context)
        num = re.findall(r"\d+", title)
        release_date = str(now_year) + "-" + num[0] + "-" + num[1]
        print("\t--", release_date, context)
        tran_context = getGoogleTrans(context)

        res_list.append(
            {"release_date": release_date,
             "tran_context": tran_context,
             "title": title,
             "context": context})
    return res_list


if __name__ == '__main__':
    # 默认链接
    base_url = "https://www.ntv.co.jp/gaki/r_backnumber/"
    # 设置起始的年份
    start_year = 2023
    end_year = int(datetime.datetime.now().year)
    # 设置文件保存路径
    save_path = r"D:\MyCode\Python\output"
    # 设置保存的文件名
    save_filename = "gaki"
    mkdir(save_path)
    faker = Faker("zh_CN")
    translater = Translator()
    # visible=True   显示Excel工作簿；False  不显示工作簿
    app = xw.App(visible=False, add_book=False)
    # now_year = start_year
    # 设置爬虫程序
    for now_year in range(start_year, end_year + 1):
        print(now_year)
        res_list = getBody(now_year)
        # res_list = [{'release_date': '2010-12-31', 'title': '12月31日放送内容', 'context': 'ガキの使い大晦日年越し6時間スペシャル!絶対に笑ってはいけないスパイ24時始動!大物歌手がむかし話の主人公で美声大熱唱!極道マル秘女優が5人にドスをきかせてキレる!\n                   アノ芸人が変装で5人を笑い地獄に陥れる! トレンディ俳優たちが田中を大絶句させる! 女優&球界スター&おじいさんが夢の競演! 芸人軍団が身体を張って新マシーンに挑む!おブス女芸人セクシーユニット踊りまくり!恐怖!全員大絶叫深夜の驚いてはいけない!', 'tran_context': '除夕、除夕特别6小时儿童跑腿特辑！绝不能笑的间谍24:00开播！\n                   那个喜剧演员让五个人乔装打扮，让他们陷入笑声地狱！潮流演员让田中无话可说！性感单位狂舞！恐惧！大家大声尖叫，半夜别惊讶！'}, {'release_date': '2010-12-26', 'title': '12月26日放送内容', 'context': '今週のガキの使いは、いよいよあと5日後に迫った大晦日6時間放送「絶対笑ってはいけないスパイ」の記者会見の模様を一挙放送。松本をはじめ、とにかく今年はキツかったという。いろんな意味で風呂場での出来事がキツかったという遠藤。毎年恒例になっているあのプロレスラーCの怒声がトラウマになっているという山崎。そして、引き出しネタで地獄を見てきた田中。今年は、一体、どんな展開が待ち受けているのか!?乞うご期待!', 'tran_context': '本周少儿使者将播出6小时跨年档节目《不笑的间谍》的新闻发布会，距离5天后终于临近了。包括松本正贺在内的所有人都表示今年过得很艰难。远藤说，浴室里发生的事情在很多方面都很艰难。山崎说，职业摔跤手C的愤怒声音已经成为一年一度的事件，已经成为一种创伤。还有田中，他见识过抽屉材料的地狱。今年会有怎样的发展呢！？敬请期待！'}, {'release_date': '2010-12-19', 'title': '12月19日放送内容', 'context': '今週のガキの使いは、13年連続総合司会に選ばれたダウンタウンの元・マネージャー藤原寛による2010年 ガキの使いベスト10。バスに乗って100個の豆知識を5人で出し尽くすまで帰れない「豆知識でGO!GO!」や、お腹が痛くなった演技で後輩芸人や仲間を信じ込ませる「腹痛い王」など、2010年に生まれた新たな企画が、多数ベスト10入りする中、果たして、1位に選ばれる企画は何なのか!?ガキ使名物キャラ達も登場!', 'tran_context': '本周的儿童利用是连续13年被选为总主持人的Downtown前经理藤原浩评选的2010年10大最佳利用儿童。 《GO！GO！》是上车后吐出100条小知识才可以回家的节目；《肚痛王》是假装肚子疼说服学弟学妹的节目喜剧演员朋友们，2010年诞生的众多新项目进入前十，到底哪个项目会成为第一名呢！？'}, {'release_date': '2010-12-12', 'title': '12月12日放送内容', 'context': '今週のガキの使いは、先週に引き続き「怒り王」「お腹痛い王」に続く、シリーズ第3弾「クリスとイっちゃった王」。\n                    後輩や芸人仲間を相手に、クリス松村とベットを共にしてしまったという演技で競う。ほっしゃん。は、仲の良いスタイリスト、サンドウィッチマン・伊達は後輩芸人をターゲットに挑戦する。クリスとベットインしてしまった事をどうやって告白するのか!?そして、それを聞かされた相手は一体・・・?さらに、優勝者は!?', 'tran_context': '继上周的《愤怒的国王》和《胃痛国王》之后，本周的儿童信使是该系列的第三部《国王与克里斯》。\n                    假装与克里斯·松村同床共枕，与后辈和其他艺人竞争。霍斯坎。友好的造型师三明治男人约会挑战初级喜剧演员。他要如何承认自己和克里斯打赌了！？'}, {'release_date': '2010-12-5', 'title': '12月5日放送内容', 'context': '今週のガキの使いは、「怒り王」「お腹痛い王」に続く、シリーズ第3弾「クリスとイっちゃった王」。なんと、今回は、後輩や芸人仲間を相手にクリス松村とベットを共にしてしまったという演技で競う。はじめに挑戦するのはガキメンバーの遠藤、さらに有吉やカンニング竹山といったメンバーが、それぞれの性格を生かして挑戦!クリスとベットインしてしまった事をどう芸人仲間に告白するのか!?そして、聞いた相手は果たして!?', 'tran_context': '本周的少儿使者是继《愤怒的国王》、《胃痛之王》之后的第三季《King with Chris》。令人惊讶的是，这一次，他将与他的后辈和艺\u200b\u200b人一起竞争与克里斯·松村同床共枕的表演。少年成员远藤率先挑战，随后有吉、竹山狡猾等成员利用各自的性格接受挑战！到底是什么！？'}, {'release_date': '2010-11-28', 'title': '11月28日放送内容', 'context': '今週のガキの使いは、20年以上に渡るガキの歴史の中で誕生した強烈なキャラクターたちの名場面を一挙大公開!おばちゃん、ピカデリー梅田、下落合の母、板尾の嫁、新おにぃ、といった名物キャラからヘイポー、ヨシノブといったスタッフまで、一体、これまでに、どんな名シーンを生み出してきたのか!? 毎年、年末に行われる「笑ってはいけない…」シリーズやレギュラー放送の中から選りすぐりの名場面を一挙大放出!!', 'tran_context': '本周的《柿之使》为大家揭晓了柿子历史上20多年来诞生的实力人物的名场面！从平婆等名角到义信等工作人员，他们至今都创造了怎样的名场面！ ? 立即释放现场！'}, {'release_date': '2010-11-21', 'title': '11月21日放送内容', 'context': '今週のガキの使いは、先週に引き続き、極限の緊張状態から己のテンションを一気に最高点まで持っていくハイテンショングランプリ。いよいよ上位にランクインした芸人たちが、登場する。上位者たちの中にも、ドランクドラゴン、サバンナ八木といったハイテンションを行うのが人生初となる芸人たちが登場。上位常連組も含め、一体、どんなハイテンションを披露するのか?', 'tran_context': '本周的儿童用的是高张力大奖赛，延续上周，在这里你可以把你的紧张感从极度紧张一下子提升到最高点。最终排名靠前的艺人将会登场。顶尖表演者中，出现了生平第一次表演高度紧张的喜剧演员醉龙和八木莎凡娜。包括顶级常客在内的他们又会展现出怎样的高度紧张呢？'}, {'release_date': '2010-11-14', 'title': '11月14日放送内容', 'context': '今週のガキの使いは、約1年ぶりの開催となるあの恒例企画。極限の緊張状態から己のテンションを一気に最高点まで持っていくハイテンショングランプリ。今回は、ハイテンションのみならず、ガキの使い自体に初登場となる芸人が続々登場!ピース、オードリーといった注目の若手芸人たちが一体、どんなハイテンションを披露するのか?', 'tran_context': '本周孩子们的任务是大约一年后首次进行的年度项目。高压大奖赛，让你的紧张感从极度紧张一下子提升到最高点。这次不仅气氛紧张，首次以儿童使者身份登场的艺人也将陆续登场！'}, {'release_date': '2010-11-7', 'title': '11月7日放送内容', 'context': '今週のガキの使いは、山崎から届いた招待状を頼りにダウンタウン、ココリコの4人が呼ばれた場所に行ってみると、そこはどこかで見た事がある懐かしいスタジオ。そして、往年の名司会者に導かれて登場したのはなんと!山口百恵!?彼女のデビューから引退までの華麗なるヒストリーを「横須賀ストーリー」「プレイバック Part2」「美・サイレント」「さよならの向こう側」といった名曲と共に振り返る。', 'tran_context': '本周的儿童信使是根据山崎的邀请，前往可可里科四人被召唤的地方时在某个地方见过的怀旧工作室。山口百惠在昔日著名主持人的带领下登上舞台！？带着《Side》等名曲回首。'}, {'release_date': '2010-10-31', 'title': '10月31日放送内容', 'context': '今週のガキの使いは、収録に浜田が遅れて来るのを待っている間にメンバーたちから次々とありえない映像が持ち込まれる。なんと!それぞれのプライベート映像に浜田が映ってしまっているという。田中が引っ越そうと思って物件めぐりをしている時に回していた映像。遠藤がプライベートでゴルフに行った帰り、ファミレスで回していた映像。さらには、ライセンスが持って来た映像にも映ってしまっていた。果たして、衝撃映像の真相とは…!?', 'tran_context': '在本周的《Gaki no Tsukai》中，成员们在等待滨田迟到的录音时，陆续带来了不可能的影像。据说每个私人视频中都会反映出滨田的身影。田中在寻找可搬去的房产时旋转的视频。远藤在私人打完高尔夫球回家的路上在一家家庭餐馆里播放的视频。而且，在许可证带来的视频中也体现了这一点。令人震惊的镜头背后的真相是什么？'}, {'release_date': '2010-10-24', 'title': '10月24日放送内容', 'context': '今週のガキの使いは、“ちょい悪オトコ”の代名詞・ジローラモが、ガキメンバーたちを忍者教室にご招待!オシャレな忍者ファッションショーを開催したり、イタリア美女とゲームを楽しんだり、極上のイタリアンピザを食べたり、アノ男がこれまでに行ってきた教室とは、大違いの楽しい訓練の数々を体験。しかし、そんな訓練を楽しんできたメンバーをアノ男=村上ショージが黙っていなかった!!果たして、ショージの言い分は!?', 'tran_context': '本周的少儿使者是“小恶人”代名词的吉罗拉莫，邀请小朋友们参加忍者课堂！举办时尚忍者时装秀，与意大利美女一起游戏，享受最美味的意大利披萨，体验很多有趣的培训，与那个人迄今为止去过的教室非常不同。然而，那个男人=村上正司并没有对享受这样的训练的成员保持沉默！'}, {'release_date': '2010-10-17', 'title': '10月17日放送内容', 'context': '今週のガキの使いは、先週に引き続き、車を運転しながら景色やモノを見ていて、思いついた豆知識を披露していく「ドライブあっ!豆知識でGO!GO!」東京を出発して神奈川方面に向かい、全員で100個出すまで引き返せないというルール。一行は行き詰まり横浜中華街を歩きながら店を見て回り、なんとか豆知識をひねり出す。5人がそれぞれ得意な分野でなんとか豆知識を出そうとするが、果たして、100個出す事ができるのか!?', 'tran_context': '延续上周，本周小朋友的任务是“开车啊！Trivia de GO！GO！”规则是，在前往神奈川并凑齐100个之前不能回头。聚会陷入了僵局，他们在横滨唐人街散步时，环视商店，不知怎么想出了一些趣事。 5位成员各自尝试在各自的领域发表自己的知识，但他们能拿出100个吗？'}, {'release_date': '2010-10-10', 'title': '10月10日放送内容', 'context': '今週のガキの使いは、車を運転しながら見える景色やモノに対して、思いついた豆知識を披露していく 「ドライブ あっ!豆知識でGO!GO!」東京を出発して国道1号線を神奈川方面に向かいひた走り全員で100個出すまで戻れないというルール。松本が建物を見て思いついた豆知識とは?浜田がセブンイレブンを見て思いついた豆知識とは?山崎が東京タワーを見て思いついた豆知識とは?数字を見てココリコが思いついた豆知識とは?', 'tran_context': '这周孩子的任务是展示你所想到的关于开车时看到的风景和事物的小知识。规则是，除非你一路跑到神奈川并获得 100 分，否则你不能回去。松本看到大楼时想到了什么样的知识？滨田看到7-11时想到了什么样的知识？山崎看到东京塔时想到了什么样的知识？'}]
        # 输出的表格路径
        save_file = os.path.join(save_path, save_filename + "-" + str(now_year) + ".xlsx")
        if not os.path.exists(save_file):
            app.books.add().save(save_file)
        wb = app.books.open(save_file)
        wrtxl(1, 1, 1, "播放日期")
        wrtxl(1, 1, 2, "内容翻译（谷歌机翻）")
        wrtxl(1, 1, 3, "原标题")
        wrtxl(1, 1, 4, "原内容")
        for i, res in enumerate(res_list):
            wrtxl(1, i + 2, 1, res["release_date"])
            wrtxl(1, i + 2, 2, res["tran_context"])
            wrtxl(1, i + 2, 3, res["title"])
            wrtxl(1, i + 2, 4, res["context"])
            # print(i+1,res)
        # 关闭工作簿
        wb.close()
        time.sleep(3)
    # 退出Excel程序
    app.quit()

