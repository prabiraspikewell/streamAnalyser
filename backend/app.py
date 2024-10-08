from flask import Flask, request, render_template, send_file, Response
from werkzeug.utils import secure_filename
import io
from ultralytics import YOLO
import numpy as np
from PIL import Image
import cv2
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'


class Detection:
    def __init__(self):
        #download weights from here:https://github.com/ultralytics/ultralytics and change the path
        self.model = YOLO(r"yolov8s.pt")

    def predict(self, img, classes=[], conf=0.5):
        if classes:
            results = self.model.predict(img, classes=classes, conf=conf, stream=True)
        else:
            results = self.model.predict(img, conf=conf,stream=True)

        return results

    def predict_and_detect(self, img, classes=[], conf=0.5, rectangle_thickness=2, text_thickness=1):
        results = self.predict(img, classes, conf=conf)
        for result in results:
            for box in result.boxes:
                cv2.rectangle(img, (int(box.xyxy[0][0]), int(box.xyxy[0][1])),
                              (int(box.xyxy[0][2]), int(box.xyxy[0][3])), (255, 0, 0), rectangle_thickness)
                cv2.putText(img, f"{result.names[int(box.cls[0])]}",
                            (int(box.xyxy[0][0]), int(box.xyxy[0][1]) - 10),
                            cv2.FONT_HERSHEY_PLAIN, 1, (255, 0, 0), text_thickness)
        return img, results

    def detect_from_image(self, image):
        result_img, _ = self.predict_and_detect(image, classes=[], conf=0.3)
        return result_img


detection = Detection()





def gen_frames():
    cap = cv2.VideoCapture(r"/Users/kunalspikewell/Downloads/people.mp4")
    while cap.isOpened():
        success, frame = cap.read()

        # Check if the frame was successfully captured
        if not success or frame is None:
            print("Failed to capture frame or end of stream reached.")
            break  # End the loop if no frame is captured (i.e., end of video or error)

        # Ensure the frame is not empty before processing
        if frame.size == 0:
            print("Empty frame received, skipping.")
            continue

        frame = cv2.resize(frame, (512, 512))
        if frame is None:
            break
        frame = detection.detect_from_image(frame)

        success, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
    #http://localhost:8000/video for video source
    #http://localhost:8000 for image source
