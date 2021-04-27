import re
import os
import base64
import cv2
import random
import shutil
from datetime import datetime
from hashlib import sha256 as sh
from hashlib import md5
from fastapi.responses import FileResponse

def on_success(data=None, message='Thành công', status=1):
    if data is not None:
        return {
            'message': message,
            'data': data,
            'status': status,
        }

    return {
        'message': message,
        'status': status
    }


def on_fail(message='Thất bại', status=0):
    return {
        'message': message,
        'status': status
    }


def sha256(text):
    return sh(text.encode('utf-8')).hexdigest()


def gen_md5(text):
    return md5(text.encode('utf-8')).hexdigest()


def un_unicode(text):
    patterns = {
        '[àáảãạăắằẵặẳâầấậẫẩ]': 'a',
        '[đ]': 'd',
        '[èéẻẽẹêềếểễệ]': 'e',
        '[ìíỉĩị]': 'i',
        '[òóỏõọôồốổỗộơờớởỡợ]': 'o',
        '[ùúủũụưừứửữự]': 'u',
        '[ỳýỷỹỵ]': 'y'
    }
    output = text
    for regex, replace in patterns.items():
        output = re.sub(regex, replace, output)
        # deal with upper case
        output = re.sub(regex.upper(), replace.upper(), output)
    return output

def remove_bad_char(text):
    text = text.translate({ord(c): None for c in BAD_CHARACTER})
    return text

def upload_images(name, images):
    # seed = "gC&!`Ud~?,K'7\\G"         #we need other encrypt method
    datetime_now = str(datetime.now().strftime("%m%d%Y_%H%M%S"))
    folder = name.replace(" ", "_")
    # print(folder)                         #debug only
    image_folder_path_root = os.getcwd() + "/core/data/images"
    image_folder_path_person = image_folder_path_root + "/" + folder
    if not os.path.exists(image_folder_path_root):
        print("Root folder not found, maybe server is hacked! But we're creating...")
        os.makedirs(image_folder_path_root)
    if not os.path.exists(image_folder_path_person):
        os.mkdir(image_folder_path_person)
    for image in images:
        rand_number = random.randrange(99999999999999, 999999999999999)
        image_filename = str(datetime.now().strftime("%m%d%Y_%H%M%S")) + '_' + str(rand_number) + ".jpg"
        with open(image_folder_path_person + '/' + image_filename, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
    print("Upload at " + str(datetime.now()) + ':', end='')
    return image_folder_path_person

def upload_single_image(image):
    seed = "RT-$44xg;.yK7Ms"
    datetime_now = str(datetime.now().strftime("%m%d%Y_%H%M%S"))
    print("Predict at " + str(datetime.now()) + ':', end='')
    folder = gen_md5(seed + datetime_now)
    # print(folder)                         #debug only
    image_folder_path_root = os.getcwd() + '/image_upload/'
    image_folder_path_user = image_folder_path_root + '' + folder + '/'
    if not os.path.exists(image_folder_path_root):
        os.mkdir(image_folder_path_root)
    if not os.path.exists(image_folder_path_user):
        os.mkdir(image_folder_path_user)

    rand_number = random.randrange(99999999999999, 999999999999999)
    image_filename = datetime_now + '_' + str(rand_number)
    image_file_path = image_folder_path_user + image_filename + '.jpg'
    with open(str(image_file_path), "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return image_folder_path_user

def image_to_base64(image):
    string = base64.b64encode(cv2.imencode('.jpg', image)[1]).decode()
    return string

def get_file(file_uri):
    return FileResponse(file_uri)