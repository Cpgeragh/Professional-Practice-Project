from flask import render_template, request, redirect, url_for, session
from app.models import User  
from app import app

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get username and password from the form
        username = request.form['username']
        password = request.form['password']

        # Check if the username and password are valid
        user = User.find(username)
        if user and user.verify_password(password):
            session['username'] = username
            return redirect(url_for('menu'))
        else:
            # If login fails, redirect to the same page (login.html)
            return redirect(url_for('login'))

    # If request method is GET or login fails, render the login page
    return render_template('login.html')
