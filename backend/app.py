# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from api.routes import api_blueprint
import os

# Load environment variables from .env file
load_dotenv()

# Create the Flask application instance
app = Flask(__name__)

# Configure CORS (Cross-Origin Resource Sharing) to allow
# the frontend to communicate with the backend.
CORS(app)

# Register the API blueprint to organize routes
app.register_blueprint(api_blueprint, url_prefix='/api')

@app.route("/")
def home():
    """A simple home route to confirm the backend is running."""
    return "<h1>Weather Dashboard Backend is running!</h1>"

if __name__ == "__main__":
    # In a production environment, you would use a more robust
    # server like Gunicorn or uWSGI.
    app.run(debug=True, host='0.0.0.0', port=5000)