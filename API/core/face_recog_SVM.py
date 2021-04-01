import numpy as np
import os
import cv2
import base64
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from imageio import imread
from skimage.transform import resize
from keras.models import load_model
from joblib import dump, load
from time import time
from datetime import datetime

# load face detection model
cascade_path = './core/model/cv2/haarcascade_frontalface_alt2.xml'
# load data to train
image_dir_basepath = './core/data/images/'
names = []
for path in os.listdir(image_dir_basepath):
    names.append(path)
image_size = 160

model_path = "./core/model/keras/facenet_keras.h5"
model = load_model(model_path)

def prewhiten(x):
    if x.ndim == 4:
        axis = (1, 2, 3)
        size = x[0].size
    elif x.ndim == 3:
        axis = (0, 1, 2)
        size = x.size
    else:
        raise ValueError('Dimension should be 3 or 4')

    mean = np.mean(x, axis=axis, keepdims=True)
    std = np.std(x, axis=axis, keepdims=True)
    std_adj = np.maximum(std, 1.0/np.sqrt(size))
    y = (x - mean) / std_adj
    return y

def l2_normalize(x, axis=-1, epsilon=1e-10):
    output = x / np.sqrt(np.maximum(np.sum(np.square(x), axis=axis, keepdims=True), epsilon))
    return output

def load_and_align_images(filepaths, margin):
    cascade = cv2.CascadeClassifier(cascade_path)

    aligned_images = []
    for filepath in filepaths:
        print(filepath)
        img = cv2.imread(filepath)
        # print(img.shape)
        faces = cascade.detectMultiScale(img,
                                         scaleFactor=1.1,
                                         minNeighbors=3)
        if len(faces) == 0:
            os.remove(filepath)
            print("face not found, file removed")
        else:
            print(faces)
            (x, y, w, h) = faces[0]
            cropped = img[y - margin // 2:y + h + margin // 2,
                      x - margin // 2:x + w + margin // 2, :]
            aligned = resize(cropped, (image_size, image_size), mode='reflect')
            # print(aligned.shape) 
            aligned_images.append(aligned)
    return np.array(aligned_images)

def calc_embs(filepaths, margin=10, batch_size=1):
    aligned_images = prewhiten(load_and_align_images(filepaths, margin))
    pd = []
    for start in range(0, len(aligned_images), batch_size):
        pd.append(model.predict_on_batch(aligned_images[start:start+batch_size]))
    embs = l2_normalize(np.concatenate(pd))
    return embs

def train(dir_basepath, names, max_num_img=10):
    labels = []
    embs = []
    for name in names:
        dirpath = os.path.abspath(dir_basepath + name)
        filepaths = [os.path.join(dirpath, f) for f in os.listdir(dirpath)][:max_num_img]
        embs_ = calc_embs(filepaths)
        print(embs_.shape)
        # print(filepaths)
        labels.extend([name] * len(embs_))
        embs.append(embs_)

    embs = np.concatenate(embs)
    le = LabelEncoder().fit(labels)
    y = le.transform(labels)
    clf = SVC(kernel='linear', probability=True).fit(embs, y)
    return le, clf

def infer(le, clf, filepaths):
    embs = calc_embs(filepaths)
    pred = le.inverse_transform(clf.predict(embs))
    return pred

#TODO write predict function
# start = time()
# le, clf = train(image_dir_basepath, names)
# print(time() - start)
#
# pred = infer(le, clf, test_filepaths)

# reload data
def reload_data(names):
    names.clear()
    for path in os.listdir(image_dir_basepath):
        names.append(path)

# retrain model if failed
def re_train():
    reload_data(names)
    start_time_train = time()
    le, clf = train(image_dir_basepath, names)
    end_time_train = time() - start_time_train
    # model_name = str(datetime.now().strftime("%m%d%Y_%H%M%S")) + '_svc.joblib'
    model_name = 'faceReg_final.joblib'
    dump(clf, './core/model/svc/faceReg_final.joblib')
    np.save('./core/model/svc/label_final.npy', le.classes_)
    print("Saved SVC model: " + model_name + " in " + str(round(end_time_train,2)) + " seconds.")

def get_label():
    le = LabelEncoder()
    le.classes_ = np.load('./core/model/svc/label_final.npy')
    return le

## this shit won't work, but it's a part of history
# def predict(le, clf, pred_filepaths):
#     # print(pred_filepaths)
#     dirpaths = os.path.join(pred_filepaths)
#     filepaths = [os.path.join(dirpaths, f) for f in os.listdir(dirpaths)]
#     pred = infer(le, clf, filepaths)
#     name_predicted = pred[0]
#     return name_predicted

def calc_embs_per(np_face, margin=10, batch_size=1):
  aligned_images = prewhiten(np_face)
  pd = []
  for start in range(0, len(aligned_images), batch_size):
        pd.append(model.predict_on_batch(aligned_images[start:start+batch_size]))
  embs = l2_normalize(np.concatenate(pd))
  return embs

def image_to_base64(img):
    # don't pass resized image, it's will return black image
    string = base64.b64encode(cv2.imencode('.jpg', img)[1]).decode()
    return string

def predict_multiple_per(le, clf, pred_filepaths, margin=10):
    dirpaths = os.path.join(pred_filepaths)
    filepaths = [os.path.join(dirpaths, f) for f in os.listdir(dirpaths)]
    cascade = cv2.CascadeClassifier(cascade_path)
    people = []
    for filepath in filepaths:

        if filepath[-4:] != '.jpg':
            return "Bad file input"
            # pass
        else:
            img = cv2.imread(filepath)
            people.append(['None', "OriginalImage"])
            faces = cascade.detectMultiScale(img, scaleFactor=1.1, minNeighbors=3)
            # print(faces)
            for face in faces:
                aligned_images = []
                (x, y, w, h) = face
                cropped = img[y - margin // 2:y + h + margin // 2,
                          x - margin // 2:x + w + margin // 2, :]
                # cv2_imshow(cropped)
                aligned = resize(cropped, (image_size, image_size), mode='reflect')
                aligned_images.append(aligned)
                # print(len(aligned_images))
                emb = calc_embs_per(np.array(aligned_images))
                pred = le.inverse_transform(clf.predict(emb))
                img_base64 = image_to_base64(aligned*255)
                people.append([img_base64, pred[0]])       # we need return every person
                # print(pred)
                name = pred[0]
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 1)
                cv2.putText(img, name, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
            people[0][0] = image_to_base64(img)
            # print(img)
            # return img
    # print("data to return", people)
    return people