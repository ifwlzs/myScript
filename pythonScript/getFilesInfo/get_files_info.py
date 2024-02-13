import os
import time
import pandas as pd


def get_files(path):
    file_list = []
    for root, dirs, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            file_size = os.path.getsize(file_path)
            file_size_gb = file_size / (1024 * 1024 * 1024)
            file_size_mb = file_size / (1024 * 1024)
            file_size_kb = file_size / (1024)
            file_mtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(os.path.getmtime(file_path)))
            file_mdate = file_mtime[:10]
            current_dir = os.path.dirname(file_path)
            file_list.append(
                [current_dir, file, round(file_size_gb, 2), round(file_size_mb, 2), round(file_size_kb, 2), file_mdate,
                 file_mtime, file_path])
    return file_list


file_list = get_files('.')
df = pd.DataFrame(file_list,
                  columns=["当前目录", "文件名", "文件大小（GB）", "文件大小（MB）", "文件大小（KB）", "文件修改日",
                           "文件修改时间", "文件完整路径"])
df.to_excel('文件统计.xlsx', index=False)
