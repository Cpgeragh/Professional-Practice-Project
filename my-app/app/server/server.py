from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
mongo_uri = os.environ.get('MONGO_URI')
client = MongoClient(mongo_uri)

# Access the specific databases
pubs_db = client['Pubs']
movies_db = client['Cinema']
restaurants_db = client['Restaurants']
activities_db = client['Activity']
users_collection = client['UsersDatabase']['Users']
# Access the specific collections within those databases
pubs_collection = pubs_db['GalwayPubs']
movies_collection = movies_db['GalwayMovies']
restaurants_collection = restaurants_db['GalwayRestaurants']
activities_collection = activities_db['GalwayActivities']
bookings_collection = client['BookingDatabase']['Bookings']



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    # Check if the user already exists
    if users_collection.find_one({'username': username}):
        return jsonify({'success': False, 'message': 'Username already exists'}), 409

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Insert new user into the database
    user = {
        'username': username,
        'email': email,
        'password': hashed_password
    }
    users_collection.insert_one(user)
    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username exists and the password matches
    user = users_collection.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401


@app.route('/pubs', methods=['GET'])
def get_pubs():
    pubs_collection = pubs_db.GalwayPubs  # Use your actual collection name
    pubs_list = list(pubs_collection.find({}, {'_id': 0}).limit(10))  # Convert the cursor to a list, exclude '_id', limit to 10 results
    return jsonify(pubs_list), 200

@app.route('/movies', methods=['GET'])
def get_movies():
    movies_collection = movies_db.GalwayMovies  # Use your actual collection name
    movies_list = list(movies_collection.find({}, {'_id': 0}).limit(10))  # Convert the cursor to a list, exclude '_id', limit to 10 results
    return jsonify(movies_list), 200

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants_collection = restaurants_db.GalwayRestaurants  # Use your actual collection name
    restaraunts_list = list(restaurants_collection.find({}, {'_id': 0}).limit(10))  # Convert the cursor to a list, exclude '_id', limit to 10 results
    return jsonify(restaraunts_list), 200

@app.route('/activities', methods=['GET'])
def get_activities():
    activities_collection = activities_db.GalwayActivities  # Use your actual collection name
    activities_list = list(activities_collection.find({}, {'_id': 0}).limit(10))  # Convert the cursor to a list, exclude '_id', limit to 10 results
    return jsonify(activities_list), 200

@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    try:
        bookings_collection.insert_one(data)
        return jsonify({'success': True, 'message': 'Booking created successfully'}), 201
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        bookings_list = list(bookings_collection.find({}, {'_id': 0}))
        return jsonify(bookings_list), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/ping')
def ping():
    return jsonify({'message': 'Server is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
