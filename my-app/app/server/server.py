from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  # Take environment variables from .env.

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
mongo_uri = os.environ.get('MONGO_URI')
client = MongoClient(mongo_uri)
db = client.Pubs

# Dummy user data for initial testing (replace with your actual user authentication logic later)
users = {
    'user1': 'AppPassword123',
    'user2': 'password2'
}
@app.route('/pubs', methods=['GET'])
def get_pubs():
    pubs_collection = db.GalwayPubs  # Use your actual collection name
    pubs_list = list(pubs_collection.find({}, {'_id': 0}).limit(10))  # Convert the cursor to a list, exclude '_id', limit to 10 results
    return jsonify(pubs_list), 200


@app.route('/ping')
def ping():
    return jsonify({'message': 'Server is running'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username exists and the password matches
    # In a production environment, replace this with a query to your MongoDB
    # and make sure to use hashed passwords
    if username in users and users[username] == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

# Other routes and logic for interacting with MongoDB...

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
