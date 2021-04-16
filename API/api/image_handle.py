import os
import cv2
import pandas as pd
from core.face_recog_SVM import predict_multiple_per
from utils import upload_images, upload_single_image
from utils import on_fail, on_success

def upload_person(name, images):
    # print(type(images))
    # print(images)
    try:
        path = upload_images(name, images)
        print("{} | with label '{}'".format(path,name))
        return on_success()
    except Exception as err:
        return on_fail(message=err)

def upload_predict(image, le, clf):
    try:
        image_path = upload_single_image(image)
        print(image_path, end='')
        result = predict_multiple_per(le, clf, image_path)
        names = result
        if not names:
            return on_fail(message='Không tìm thấy đối tượng.', status=400)
        if len(names) > 1:
            return on_fail(message='Lỗi! Có nhiều người trong ảnh.', status=400)
        print(" | Result: ", names)

        # convert data to json
        data = pd.DataFrame(result, columns={'label'}).to_dict(orient='records')
        return on_success(data=data, message='Thành công.', status=200)
    except Exception as err:
        return on_fail(message=err)
