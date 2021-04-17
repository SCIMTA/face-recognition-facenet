import os
from core.face_recog_SVM import re_train, get_label
from typing import Optional, List
from joblib import dump, load
from fastapi import FastAPI, Header, Form, UploadFile, File
from api.image_handle import upload_person, upload_predict
from api.export_report import export_day_report, export_month_report
from utils import on_fail, on_success

app = FastAPI(docs_url="/chongtromcaponline", redoc_url=None)

# load model
if not os.path.exists("./core/model/svc/faceReg_final.joblib") or not os.path.exists("./core/model/svc/label_final.npy"):
    print("Failed to load model, re-training...")
    re_train()
clf = load("./core/model/svc/faceReg_final.joblib")
le = get_label()
print(le.classes_)
print("Model loaded")


@app.post("/upload_person")
async def _upload_person(name: str = Form(...),
                         files: List[UploadFile] = File(...),
                         train_option: int = Form(...)):
    message = upload_person(name, files)
    if (train_option != 0):
        try:
            re_train()
            reload_model()
        except Exception as err:
            print(err)
            return on_fail()
    return message

@app.post("/upload_predict")
async def _upload_predict(file: UploadFile = File(...)):
    return upload_predict(file, le, clf)

@app.get("/export_day_report")
async def _export_day_report(day: int,
                             month: int,
                             year:int):
    return export_day_report(day, month, year)

@app.get("/export_month_report")
async def _export_month_report(month: int,
                               year:int):
    return export_month_report(month, year)

@app.post("/train")
async def _train_svm():
    try:
        re_train()
        reload_model()
        return on_success(message="Train success!")
    except Exception as err:
        print(err)
        return on_fail()

def reload_model():
    global clf
    global le
    clf = load("./core/model/svc/faceReg_final.joblib")
    le = get_label()
    print("Model loaded")
    print_le()

def print_le():
    print(le.classes_)
