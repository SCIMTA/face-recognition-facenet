import os

import pandas as pd
import numpy as np
from datetime import datetime
from utils import on_fail, get_file
from core.face_recog_SVM import get_label

def check_face(le, names):
    # time: 2017-12-16 03:02:35.500000
    now = datetime.now()
    year = str(now.strftime("%Y"))
    month = str(now.strftime("%m"))
    day = str(now.strftime("%d"))

    # gio_den > gio_di_lam -> muon
    gio_di_lam = pd.Timestamp("08:30:00")
    # gio_ve < gio_tan_lam -> ve som
    gio_tan_lam = pd.Timestamp("17:00:00")

    # print(year, month, day)
    folder_path = os.getcwd() + "/report/{}/{}".format(year, month)
    file_path = folder_path + "/{}.xlsx".format(day)
    # print(file_path)      ### debug
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    if not os.path.exists(file_path):
        df = pd.DataFrame(columns=['Họ tên', 'Giờ đến', 'Giờ về', 'Trạng thái'])
        df['Họ tên'] = le.classes_  ###
        # print(le.classes_)              ###
        df.to_excel(file_path, index=False)
        print("Tạo báo cáo ngày {}/{}/{}".format(day, month, year))

    df = pd.read_excel(file_path, engine='openpyxl')

    if (len(df['Họ tên']) != len(le.classes_)):
        df_name = pd.DataFrame(columns=['Họ tên'], data=le.classes_)
        df_new = pd.concat([df,df_name], axis=0).drop_duplicates(subset=['Họ tên']).reset_index(drop=True)
        df = df_new
    for name in names:
        # print(name)
        # print("what the fuck?")
        index = df.loc[df['Họ tên'] == name].index.tolist()[0]

        null_df = df[df['Giờ đến'].isnull()].index.tolist()
        if index in null_df:
            df.loc[index, 'Giờ đến'] = now.strftime("%H:%M:%S")
            if pd.Timestamp(now.strftime("%H:%M:%S")) > gio_di_lam:
                df.loc[index, 'Trạng thái'] = "M|V"
            else:
                df.loc[index, 'Trạng thái'] = "D|V"
        else:
            df.loc[index, 'Giờ về'] = now.strftime("%H:%M:%S")
            status = df.loc[index, 'Trạng thái']
            if pd.Timestamp(now.strftime("%H:%M:%S")) < gio_tan_lam:
                df.loc[index, 'Trạng thái'] = status.replace("V", "VS")
            else:
                df.loc[index, 'Trạng thái'] = status.replace("V", "D")
    # print(now.strftime("%H:%M:%S"))

    df.to_excel(file_path, index=False)


def generate_month_report(month, year):
    month_file_path = os.getcwd() + "/../report/{}/{:02d}/TongKetThang{:02d}.xlsx".format(year, month, month)
    folder_path = os.getcwd() + "/../report/{}/{:02d}".format(year, month)
    le = get_label()

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        return on_fail(message="Tháng này chưa có thông tin để xuất báo cáo.")
    if not os.path.exists(month_file_path):
        df = pd.DataFrame(columns=['Họ tên'])
        df['Họ tên'] = le.classes_  ###
        df.to_excel(month_file_path, index=False)

    # append report all day of month
    df = pd.read_excel(month_file_path, engine='openpyxl')
    for date in sorted(os.listdir(folder_path)):
        if len(date) < 8:
            ex_date = folder_path + "/{}".format(date)
            df_date = pd.read_excel(ex_date, engine='openpyxl')
            # df_status = pd.DataFrame(df_date['Trạng thái'], columns=[str(date[:2])])
            df[str(date[:2])] = df_date['Trạng thái']

    # create some param to evaluate employe
    so_ngay_tong = len(df.iloc[0]) - 5
    df['Số ngày muộn'] = 0
    df['Số ngày về sớm'] = 0
    df['Số ngày vắng'] = 0
    df['Số ngày làm'] = 0

    df.replace(np.nan, 'V', inplace=True)
    df.replace('M|V', 'V', inplace=True)

    # count all params
    for i in range(0, len(df.index)):
        stats = df.iloc[i].value_counts()
        #################
        if ('M|VS' in stats) and ('M|D' in stats):
            df.loc[i, 'Số ngày muộn'] = stats['M|VS'] + stats['M|D']
        elif 'M|D' in stats:
            df.loc[i, 'Số ngày muộn'] = stats['M|D']
        elif 'M|VS' in stats:
            df.loc[i, 'Số ngày muộn'] = stats['M|VS']
        #################
        if ('M|VS' in stats) and ('D|VS' in stats):
            df.loc[i, 'Số ngày về sớm'] = stats['M|VS'] + stats['D|VS']
        elif 'M|VS' in stats:
            df.loc[i, 'Số ngày về sớm'] = stats['M|VS']
        elif 'D|VS' in stats:
            df.loc[i, 'Số ngày về sớm'] = stats['D|VS']
        ################
        if 'V' in stats:
            df.loc[i, 'Số ngày vắng'] = df.iloc[i].value_counts()['V']
            df.loc[i, 'Số ngày làm'] = so_ngay_tong - df.iloc[i].value_counts()['V']
        else:
            df.loc[i, 'Số ngày làm'] = so_ngay_tong

    df.to_excel(month_file_path, index=False)


def export_month_report(_month, _year):
    # prevent LFI by timestamp
    try:
        time_report = pd.to_datetime(f"{_month}/{_year}", format='%m/%Y')
        year = str(time_report.strftime("%Y"))
        month = int(time_report.strftime("%m"))

        generate_month_report(month, year)
        month_file_path = os.getcwd() + "/../report/{}/{:02d}/TongKetThang{:02d}.xlsx".format(year, month, month)
        # folder_path = os.getcwd() + "/../report/{}/{:02d}".format(year, month)

        return get_file(month_file_path)
    except Exception as err:
        print(err)
        return on_fail(message="Có lỗi trong quá trình xuất báo cáo!")


def export_day_report(_day, _month, _year):
    try:
        # prevent LFI by timestamp
        time_report = pd.to_datetime(f"{_day}/{_month}/{_year}", format='%d/%m/%Y')
        year = str(time_report.strftime("%Y"))
        month = int(time_report.strftime("%m"))
        day = int(time_report.strftime("%d"))

        day_file_path = os.getcwd() + "/../report/{}/{:02d}/{:02d}.xlsx".format(year, month, day)
        return get_file(day_file_path)
    except Exception as err:
        print(err)
        return on_fail(message="Có lỗi trong quá trình xuất báo cáo!")
