from flask import Flask, Response
import cv2
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the ASL model
model = load_model('src\pages\keras_model.h5')

def predict_sign(frame):
    # Preprocess the frame (resize, normalize, etc.)
    # Perform prediction using your ASL model
    # For example:
    # prediction = model.predict(preprocessed_frame)
    # Convert prediction to human-readable format (e.g., letters corresponding to ASL signs)
    # For example:
    # predicted_sign = decode_prediction(prediction)
    predicted_sign = 'A'  # Replace 'A' with the actual predicted sign
    return predicted_sign

def generate_frames():
    camera = cv2.VideoCapture(0)  # Use 0 for the default camera (usually the built-in webcam)
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Perform prediction on the frame
            predicted_sign = predict_sign(frame)
            # Draw the predicted sign on the frame
            cv2.putText(frame, predicted_sign, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
