from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    restaurant_pizzas = db.relationship('RestaurantPizza', backref='restaurant')

    @validates('name')
    def validate_description(self, key, name):
        if not name:
            raise ValueError("Name must be present")
        if len(name) < 4:
            raise ValueError("Name must be at least 4 characters long")
        return name


    def __repr__(self):
        return f'<Restaurant {self.name}>'


class Pizza(db.Model):
    __tablename__ = 'pizzas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    restaurant_pizzas = db.relationship('RestaurantPizza', backref='pizza')

    def __repr__(self):
        return f'<Pizza {self.name}>'


class RestaurantPizza(db.Model):
    __tablename__ = 'restaurant_pizzas'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'), nullable = False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable = False)

    @validates('price')
    def validate_price(self, key, price):
        if not (1 <= int(price) <= 30):
            raise ValueError("Price must be between 1 and 30.")
        return price

    def __repr__(self):
        return f'<RestaurantPizzas {self.price}>'