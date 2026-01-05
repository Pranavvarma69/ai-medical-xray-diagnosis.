from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
import cv2
import os
from tensorflow.keras.applications import EfficientNetB3
from tensorflow.keras import layers, models

app = FastAPI()

IMG_SIZE = (300, 300)
CLASS_NAMES = ["COVID", "Normal", "Viral Pneumonia"]
NUM_CLASSES = 3

model = None  # 👈 IMPORTANT


def load_model():
    global model
    if model is not None:
        return model

    print("🟡 Loading model...")

    base_model = EfficientNetB3(
        weights=None,
        include_top=False,
        input_shape=(300, 300, 3)
    )

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dense(256, activation="relu"),
        layers.Dropout(0.4),
        layers.Dense(NUM_CLASSES, activation="softmax")
    ])

    model.load_weights("models/xray_classifier_b3_3class1.keras")

    # Warmup
    model.predict(np.zeros((1, 300, 300, 3)))

    print("✅ Model loaded successfully")
    return model


class PredictRequest(BaseModel):
    image_path: str


@app.get("/")
def health():
    return {"status": "API running"}


@app.post("/predict")
def predict(req: PredictRequest):
    print("🟡 Predict request received")

    model = load_model()

    if not os.path.exists(req.image_path):
        return {"error": "Image not found"}

    img = cv2.imread(req.image_path)
    if img is None:
        return {"error": "Invalid image"}

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, IMG_SIZE)
    img = img / 255.0
    input_tensor = np.expand_dims(img, axis=0)

    preds = model.predict(input_tensor)[0]
    idx = int(np.argmax(preds))

    return {
        "predictedClass": CLASS_NAMES[idx],
        "confidence": float(preds[idx]),
        "predictions": {
            CLASS_NAMES[i]: float(preds[i]) for i in range(len(CLASS_NAMES))
        }
    }