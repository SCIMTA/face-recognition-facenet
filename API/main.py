from typing import Optional

from fastapi import FastAPI, Header, Form, UploadFile, File


app = FastAPI(docs_url="/ditconmemayhackcailon", redoc_url=None)