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



# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder="")
# setup mongo connection

mongo = PyMongo(app, uri="mongodb://Lori:Les4783!@ds223756.mlab.com:23756/heroku_r58qkhd7")

# connect to mongo db and collection



@app.route("/")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    listings_info = mongo.db.listings.find_one()
    json_info = mongo.db.geojson.find_one({})
  
    return render_template("index.html", data=json_info)


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    
    collection = mongo.db.neighborhoods
    data = pd.DataFrame(list(collection.find({})))
    # Return a list of the column names (sample names)
    return jsonify(list(data.neighbourhood))
# db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )

@app.route("/geojson")
def geojson():
    collection = mongo.db.geojson
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'type': json['features']})
    print(data)
    
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
    print(data)
    
    return jsonify(data)

@app.route("/listings/<name>")
def listings(name):

    
    # client = MongoClient()
    # db = client["air_bnb"]
    collection = mongo.db["listings"]

    data1 = {}
    myquery = {"neighbourhood":{ "$eq": (name) }}
    for listing in collection.find(myquery):
        data1.update({'id':listing['id'],
        'host_id':listing['host_id'],
        'Host_Name': listing['host_name'],
        'Description':listing['name'],
        'Neighborhood':listing['neighbourhood'],
        'Latitude':listing['latitude'],
        'Longitude': listing['longitude'],
        'Room_Type': listing['room_type'],
        'Price':listing['price'],
        'Minimum_Stay':listing ['minimum_nights'],
        'Number_Reviews':listing['number_of_reviews'],
        'Most_Recent_Review':listing['last_review'],
        'Reviews_per_month':listing['reviews_per_month'],
        'Availability':listing['availability_365']
        })
    # print(data1)

    return jsonify(data1)


   


if __name__== '__main__':
    app.run(debug=True)