    
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
@app.route("/test")
def landing():
    return render_template("test.html")

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

@app.route("/museums")
def museums():
    collection = mongo.db.museums_json
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'type': json['features']})
    
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
        'area' : json['neighbourhood_cleansed'],
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


@app.route("/hood_json")
def hood_json():
    collection = mongo.db.hood_profiles_json
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'Name': json['Name'],
        'Rank#' : json['Rank#'],
        'Walk Score' : json['Walk Score'],
        'Transit Score': json['Transit Score'],
        'Bike Score' :json['Bike Score'],
        'Population' : json['Population']      
        })
    
    return jsonify(data)

@app.route("/brewery_json")
def brewery_json():
    collection = mongo.db.brewery_json
    listings = []
    myquery = {}   
    # myquery = {"price":{ "$eq": "300" }}
    print('query', collection.find(myquery))
    for json in collection.find(myquery):
        data = {}
        data.update({'Name': json['name'],
        'Type' : json['brewery_type'],
        'Street' : json['street'],
        'City': json['city'],
        'State' :json['state'],
        'Postal_Code' : json['postal_code'],
        'Country' : json['country'],
        'Longitude' : json['longitude'],
        'Latitude' : json['latitude'],
        'Phone' :json['phone'],
        'Updated_at': json['updated_at'],
        'Website' : json['website_url']        
        })
    
        listings.append(data)
        
        # print('data', data)
 
    return jsonify(listings)
@app.route("/listings/<name>")
def listings(name):

  
    collection = mongo.db.listings_json
    listings = []

    myquery = {"neighbourhood_cleansed":{ "$eq": (name) }}
    
    # myquery = {"price":{ "$eq": "300" }}
    print('query', collection.find(myquery))
    for json in collection.find(myquery):
        data = {}
        data.update({'listing_url': json['listing_url'],
        'name': json['name'],
        'area' : json['neighbourhood_cleansed'],
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

@app.route("/hood_json/<area>")
def hoodData(area):

    
    collection = mongo.db.hood_profiles_json
    data = {}
    myquery = {"Name":{ "$eq": (area) }}
 
    for json in collection.find(myquery):
        # data = {}
        data.update({
        'Name' : json['Name'],
        'Rank' : json['Rank#'],
        'Walk Score' : json['Walk Score'],
        'Transit Score': json['Transit Score'],
        'Bike Score' :json['Bike Score'],
        'Population' : json['Population']      
        })
    return jsonify(data)
@app.route("/url/<url>")
def url_listings(url):
    
    collection = mongo.db.listings_json
    urls = []

    myquery = {"name":{ "$eq": (url) }}
    
    # myquery = {"price":{ "$eq": "300" }}
    print('query', collection.find(myquery))
    for json in collection.find(myquery):
        data = {}
        data.update({'listing_url': json['listing_url'],
        'name': json['name'],
        'area' : json['neighbourhood_cleansed'],
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
  
    return jsonify(data)




if __name__== '__main__':
    app.run(debug=True)