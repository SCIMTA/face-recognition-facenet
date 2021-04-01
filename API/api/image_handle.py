import os
import cv2
import pandas as pd
from core.face_recog_SVM import predict_multiple_per
from utils import upload_images, upload_single_image
from utils import on_fail, on_success

def upload_person(name, images):
    upload_images(name, images)

def upload_predict(image, le, clf):
    image_path = upload_single_image(image)
    print(image_path, end='')
    result = predict_multiple_per(le, clf, image_path)
    names = []
    for i in range(1,len(result)):
        names.append(result[i][1])
    print(" | Result: ", names)

    # convert data to json
    data = pd.DataFrame(result, columns={'base64', 'label'}).to_dict(orient='records')
    return on_success(data=data, message='Thành công', status=200)
