from flask import Flask, Response
import cv2
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image, ImageOps

app = Flask(__name__)

model = load_model('src\pages\keras_model .h5')
class_names = [line.strip() for line in open("src/pages/labels.txt")]

def preprocess_frame(frame):
    # Convert frame to RGB
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    # Resize and crop the image
    image = Image.fromarray(frame_rgb)
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    # Convert image to numpy array
    image_array = np.asarray(image)
    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    # Expand dimensions to match model input shape
    return np.expand_dims(normalized_image_array, axis=0)

def predict_sign(frame):
    preprocessed_frame = preprocess_frame(frame)
    prediction = model.predict(preprocessed_frame)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]
    return class_name, confidence_score

def generate_frames():
    camera = cv2.VideoCapture(0)  
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            predicted_sign, confidence_score = predict_sign(frame)

            cv2.putText(frame, f"{predicted_sign} ({confidence_score:.2f})", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
