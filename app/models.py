class User:
    def __init__(self, db, username, password):
        self.db = db
        self.username = username
        self.password = password

    def save(self):
        self.db.users.insert_one({
            "username": self.username,
            "password": self.password
        })

    @staticmethod
    def find(db, username):
        return db.users.find_one({"username": username})

class Restaurant:
    def __init__(self, db, name, location, cuisine):
        self.db = db
        self.name = name
        self.location = location
        self.cuisine = cuisine

    def save(self):
        self.db.restaurants.insert_one({
            "name": self.name,
            "location": self.location,
            "cuisine": self.cuisine
        })

    @staticmethod
    def all(db):
        return list(db.restaurants.find())
