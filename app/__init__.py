from flask import Flask
from pymongo import MongoClient

# Create the Flask application instance
app = Flask(__name__)

# Database connection setup
client = MongoClient("YOUR_MONGODB_URI")
db = client["your_database_name"]

# Import and register routes
from app import route  # Adjusted import path

if __name__ == '__main__':
    app.run(debug=True)
