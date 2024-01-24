#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource

from flask_cors import CORS, cross_origin

from models import db, Pizza, Restaurant, RestaurantPizza

import os

abs_path = os.getcwd()
abs_python_path = os.path.normpath(abs_path)


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{abs_path}/db/app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

class Index(Resource):  
    @cross_origin
    def get(self):
        response_dict = {
            "index": "Welcome to the Heros RESTful API",
        }
        return jsonify(response_dict) 
    
 
api.add_resource(Index, '/')

class Restaurants(Resource):

    def get(self):
        restaurants = [{'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address} for restaurant in Restaurant.query.all()]
        return make_response(jsonify(restaurants), 200)


api.add_resource(Restaurants, '/restaurants')


class OneRestaurant(Resource):

    def get(self, id):

            restaurant = Restaurant.query.filter_by(id=id).first()
            
            if restaurant:
                restaurant_data = {
                    "id": restaurant.id,
                    "name": restaurant.name,
                    "address": restaurant.address,
                    "pizzas": [
                        {
                            "id": restaurant_pizza.pizza.id,
                            "name": restaurant_pizza.pizza.name,
                            "ingredients": restaurant_pizza.pizza.ingredients
                        }
                        for restaurant_pizza in restaurant.restaurant_pizzas
                    ]
                }

                return restaurant_data

            return {
                "error": "Restaurant not found"
            }, 404 
    
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if restaurant:
            RestaurantPizza.query.filter_by(restaurant_id=id).delete()
            db.session.delete(restaurant)
            db.session.commit()
            return '', 204
        else:
            return jsonify({"error": "Restaurant not found"}), 404
        
         
api.add_resource(OneRestaurant, '/restaurants/<int:id>')

class Pizzas(Resource):


    def get(self):
        pizzas = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in Pizza.query.all()]
        return make_response(jsonify(pizzas), 200)


api.add_resource(Pizzas, '/pizzas')


class RestaurantPizzas(Resource):
    
    def post(self):
        data = request.get_json()

        restaurant = Restaurant.query.filter(Restaurant.id == data['restaurant_id']).first()
        pizza = Pizza.query.filter(Pizza.id == data['pizza_id']).first()

        if not restaurant or not pizza:
            return {
                "errors": ["validation errors"]
            }, 404

        new_restaurant_pizza = RestaurantPizza(
            price=data['price'],
            restaurant_id=data['restaurant_id'],
            pizza_id=data['pizza_id']
        )

        db.session.add(new_restaurant_pizza)
        db.session.commit()

        pizza_data = {
            "id": pizza.id,
            "name": pizza.name,
            "ingredients": pizza.ingredients
        }

        return pizza_data, 201
    
api.add_resource(RestaurantPizzas, '/restaurant_pizzas')




if __name__ == '__main__':
    app.run(port=5555, debug=True)