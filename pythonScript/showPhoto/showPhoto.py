# 生成index.html，显示当前目录下所有的图片
import os
import re
def sort_key(s):
    # 排序关键字匹配
    # 匹配数字序号,根据数字进行排序
    if s:
        try:
            c = re.findall('[0-9]+', s)[0]
        except:
            c = -1
        # print(re.findall('[0-9]+', s)[0])
        # print("--",s,c)
        return int(c)
        
def all_files_path(rootDir):                       
    for root, dirs, files in os.walk(rootDir):     # 分别代表根目录、文件夹、文件
        # files.sort()
        files.sort(key=sort_key)
        # print(files)
        for file in files:                         # 遍历文件
            file_path = os.path.join(os.path.relpath(root), file)   # 获取文件绝对路径  
            filepaths.append(file_path)            # 将文件路径添加进列表
   
if __name__ == "__main__":
    filepaths = []   
    all_files_path(os.getcwd()) #获取当前目录
    #all_files_path("dirpath")手动替换目录
    html="""<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Expirse" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="93xo.ox39@gmail.com" />
    <meta name="description" content="自动生成，访问当前目录下图片" />
    <meta name="robots" content="none" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />

    <title>"""+os.getcwd().split("\\")[-1]+"""</title>
    <style>
        img {
            width: 100%;
            height: auto;
        }
    </style>
</head>  
<body>
"""
    print("文件列表：",filepaths)
    with open('index.html', 'w',encoding='utf-8') as f:
        for filepath in filepaths:
            if(filepath.lower().endswith(('.bmp', '.dib', '.png', '.jpg', '.jpeg', '.pbm', '.pgm', '.ppm', '.tif', '.tiff', '.gif'))):
                html+=filepath+"<br>\n<img src=\""+filepath+"\"\><br>\n"
        html+="</body>\n</html>"
        f.write(html)
