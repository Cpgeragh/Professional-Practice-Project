from flask import render_template, request, redirect, url_for, session
from app.models import User, Restaurant  # Adjusted import paths
from app import app


# Home page route
@app.route('/')
def home():
    return render_template('home.html')

# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get username and password from the form
        username = request.form['username']
        password = request.form['password']

        # Check if the username and password are valid
        user = User.find(username)
        if user and user['password'] == password:
            session['username'] = username
            return redirect(url_for('menu'))
        else:
            return render_template('login.html', error='Invalid username or password')

    return render_template('login.html')

# Signup route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Get username and password from the form
        username = request.form['username']
        password = request.form['password']

        # Check if the username already exists
        if User.find(username):
            return render_template('signup.html', error='Username already exists')

        # Create a new user
        user = User(username, password)
        user.save()

        session['username'] = username
        return redirect(url_for('menu'))

    return render_template('signup.html')

# Menu route
@app.route('/menu')
def menu():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('menu.html')

# Restaurants route
# @app.route('/restaurants')
# def restaurants():
#     if 'username' not in session:
#         return redirect(url_for('login'))
    
#     # Fetch restaurant information from MongoDB or API
#     restaurants = Restaurant.all()
    
#     return render_template('restaurants.html', restaurants=restaurants)

# Cinema route (similar to restaurants route)
# @app.route('/cinema')
# def cinema():
#     if 'username' not in session:
#         return redirect(url_for('login'))
    
#     # Fetch cinema information from MongoDB or API
    
#     return render_template('cinema.html')

# Events route (similar to restaurants route)
# @app.route('/events')
# def events():
#     if 'username' not in session:
#         return redirect(url_for('login'))
    
#     # Fetch events information from MongoDB or API
    
#     return render_template('events.html')

# Logout route
@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))
