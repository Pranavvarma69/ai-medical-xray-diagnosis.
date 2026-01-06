X-ray AI medical analyser
This is a full-stack web application that allows users to upload chest X-ray images and get predictions using a deep learning model.
The main goal of this project was to understand how to connect an ML model with a real web application and handle end-to-end flow 

project usage
•	Users can register and log in
•	Upload chest X-ray images
•	The image is sent to an AI model for prediction
•	The result is stored and can be viewed later in history
•	Each user only sees their own scans

model predictions
•	COVID
•	Normal
•	Viral Pneumonia

Features
•User authentication (Register / Login)
•Upload chest X-ray images
•AI model inference using EfficientNet
•Predicts medical conditions:
•COVID-19
•Normal
•Viral Pneumonia
•Scan history per user
•View detailed scan results
•REST API based architecture

Tech stack

Frontend
•React
•Vite
•Axios
•Tailwind CSS

Backend
•Node.js
•Express
•MongoDB (Mongoose)
•JWT authentication
•Multer for image uploads

AI / ML
•TensorFlow / Keras
•EfficientNet-B3
•FastAPI (for inference)
•OpenCV (image preprocessing)

how it works
1.	User uploads an X-ray image from the frontend
2.	Backend receives the image and stores it temporarily
3.	Backend sends the image to the AI inference API
4.	The AI model predicts the class and confidence
5.	Backend saves the result in MongoDB
6.	Frontend shows the result and stores it in history

model architecture
•Architecture: EfficientNet-B3
•Input size: 300 × 300
•preprocessing:
•Resize to 300×300
•Normalize pixel values to range [0, 1]
•Output: Softmax probabilities for 3 classes

