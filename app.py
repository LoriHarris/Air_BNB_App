from flask import Flask, render_template, redirect, jsonify, request
from flask_pymongo import PyMongo
import pandas as pd
import pymongo
from pymongo import MongoClient
import os
from bson.objectid import ObjectId
import pprint
import sys
import json


app = Flask(__name__, static_url_path='', static_folder="")


mongo = PyMongo(app, uri="mongodb://Lori:Les4783!@ds223756.mlab.com:23756/heroku_r58qkhd7")

@app.route("/")
def index():
    listings_info = mongo.db.listings.find_one()
    json_info = mongo.db.geojson.find_one({})
  
    return render_template("index.html", data=json_info)


@app.route("/names")
def names():
   
    collection = mongo.db.neighborhoods
    data = pd.DataFrame(list(collection.find({})))
    return jsonify(list(data.neighbourhood))

@app.route("/geojson")
def geojson():
    collection = mongo.db.geojson
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'type': json['features']})
    
    return jsonify(data)

@app.route("/bikeshare")
def bikeshare():
    collection = mongo.db.bikeshare_json
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'type': json['features']})
    
    return jsonify(data)

@app.route("/reviews_json")
def reviews_json():
    collection = mongo.db.reviews_json
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'id': json['id'],
        'listing_id' : json['listing_id'],
        'date' : json['date'],
        'reviewer_id': json['reviewer_id'],
        'reviewer_name' :json['reviewer_name'],
        'comments' : json['comments']      
        })
    
    return jsonify(data)

@app.route("/listings")
def full_listings():
   collection = mongo.db.listings_json
   listings = []
   myquery = {}
   # myquery = {"price":{ "$eq": "300" }}
   print('query', collection.find(myquery))
   for json in collection.find(myquery):
       data = {}
       data.update({'listing_url': json['listing_url'],
       'name': json['name'],
       'host_name' : json['neighbourhood_cleansed'],
       'latitude' : json['latitude'],
       'longitude' : json['longitude'],
       'property_type' : json['property_type'],
       'room type' : json['room_type'],
       'accommodates' :json['accommodates'],
       'bathrooms' : json['bathrooms'],
       'bedrooms' : json['bedrooms'],
       'beds' : json['beds'],
       'price' : json['price'],
       'minimum_nights' : json['minimum_nights']
       })
       listings.append(data)

   print('data', data)

   return jsonify(listings)

@app.route("/museums")
def museums():
   collection = mongo.db.museums_json
   data = {}
   myquery = {}

   for json in collection.find(myquery):
       data.update({'type': json['features']})

   return jsonify(data)


if __name__== '__main__':
    app.run(debug=True)