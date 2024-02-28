# run.py

from flask import Flask

# Create the Flask application instance
app = Flask(__name__)

# Set configuration variables
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['DEBUG'] = True

# Import and register routes
from app import route

if __name__ == '__main__':
    app.run()
