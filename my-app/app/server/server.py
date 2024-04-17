from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Route to check if the server is running
@app.route('/ping')
def ping():
    return jsonify({'message': 'Server is running'}), 200
# Dummy user data (replace with your actual user authentication logic)
users = {
    'user1': 'AppPassword123',
    'user2': 'password2'
}

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username exists and the password matches
    if username in users and users[username] == password:
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)