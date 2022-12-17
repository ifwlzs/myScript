"""
生成交通费清单
python pip install chinese_calendar -i https://pypi.tuna.tsinghua.edu.cn/simple/
"""

import chinese_calendar
import datetime

# 起始时间
start_time = datetime.date(2022, 1, 1)
# 结束时间
end_time = datetime.date(2022, 12, 31)
# 上班出发时间
am = "8:00"
# 下班出发时间
pm = "19:00"
# 上午起始站
am_start_station = "丰潭路"
# 上午终点站
am_end_station = "聚才路"
# 下午起始站(默认是上午的终点站)
pm_start_station = am_end_station
# 上午终点站(默认是上午的起始站)
pm_end_station = am_start_station
# 工作内容
job_content = "驻场开发"
# 交通工具
traffic = "地铁"
# 上午单程费用
am_expenses = 5
# 下午单程费用(默认等于上午单程费用)
pm_expenses = am_expenses


def getTrafficExpensesList():
    work_days = chinese_calendar.get_workdays(start_time, end_time)
    # 累计费用
    sum_expenses = 0
    print("日期\t时间\t起始站\t终点站\t工作内容\t交通工具\t费用(元)")
    for work_day in work_days:
        # 上午
        print(work_day,end="\t" + am + "\t" + am_start_station + "\t" + am_end_station + "\t" + job_content + "\t" + traffic + "\t" + str(am_expenses) + "\n")
        # 下午
        print(work_day,end="\t" + pm + "\t" + pm_start_station + "\t" + pm_end_station + "\t" + job_content + "\t" + traffic + "\t" + str(pm_expenses) + "\n")
        # 合计
        sum_expenses = sum_expenses + am_expenses + pm_expenses
    print("合计\t\t\t\t\t\t", sum_expenses)


if __name__ == '__main__':
    getTrafficExpensesList()
