from flask import Flask, request, jsonify
from chat import get_response

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello"

@app.post("/predict")
def getPredict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)