import os
from core.face_recog_SVM import re_train, get_label
from typing import Optional, List
from joblib import dump, load
from fastapi import FastAPI, Header, Form, UploadFile, File
from api.image_handle import upload_person, upload_predict

app = FastAPI(docs_url="/ditconmemayhackcailon", redoc_url=None)

try:
    clf = load("./core/model/svc/faceReg_final.joblib")
    le = get_label()
    print("Model loaded.")
except:
    print("Failed to load model, re-training...")
    re_train()
    clf = load("./core/model/svc/faceReg_final.joblib")
    le = get_label()
    print("Model loaded")

@app.post("/upload_person/")
async def _upload_person(name: str = Form(...),
                         files: List[UploadFile] = File(...)):
    return upload_person(name, files)

@app.post("/upload_predict/")
async def _upload_predict(file: UploadFile = File(...)):
    return upload_predict(file, le, clf)
