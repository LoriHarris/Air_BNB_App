    
import tensorflow as tf
from flask import Flask, render_template, redirect, jsonify, request
from flask_pymongo import PyMongo
import pandas as pd
import pymongo
from pymongo import MongoClient
import os
# from bson.objectid import ObjectId
# import pprint
import sys
import json
import pandas as pd
import numpy as np
# import matplotlib.pyplot as plt
# import seaborn as sns

# import geopy
# from geopy import distance
# from geopy.distance import vincenty
# from tqdm import tqdm
# tqdm.pandas()
import tensorflow as tf
from keras.utils import to_categorical
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import RandomizedSearchCV
# from nltk.sentiment.vader import SentimentIntensityAnalyzer
from collections import Counter
from scipy import stats
from dateutil import parser
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.model_selection import KFold
from sklearn.model_selection import cross_val_score
k_fold = KFold(n_splits=10, shuffle=True, random_state=0)
import numpy as np
from keras.models import load_model
from keras import backend as K

app = Flask(__name__, static_url_path='', static_folder="")



mongo = PyMongo(app, uri="mongodb://Lori:Les4783!@ds223756.mlab.com:23756/heroku_r58qkhd7")

@app.route("/")
def index():
    listings_info = mongo.db.listings.find_one()
    json_info = mongo.db.geojson.find_one({})
  
    return render_template("index.html", data=json_info)
@app.route("/predict")
def predict_json():
    collection = mongo.db.model
   
    listings = []
    myquery = {}   

    for json in collection.find(myquery): 
        data = {}
        data.update({
        'MinNights': json['MinNights'],
        'Hood' : json['Hood'],
        'SqFt' : json['SqFt'],
        '#Reviews': json['#Reviews'],
        '#Guests' :json['#Guests'],
        'Listing Count' : json['Listing Count'],
        'Security':json['Security']      ,
        'CleanFee':json['CleanFee'],
        'Dist':json['Dist'],
        'BA':json['BA'],
        'BR':json['BR'],
        'Beds':json['Beds'],
        'Acc': json['Acc'],
        'Price':json['Price'],
        '#Booked':json['#Booked'],
        'Name':json['Name']
        })
        listings.append(data)
    return jsonify(listings)
    # return jsonify(data)    
@app.route('/predict/<listing>')
def api_call(listing):
    
    
    listings = []
    listings1=[]
# test1 = pd.DataFrame(prediction)
    collection = mongo.db.model
    myquery = {"Name":{ '$eq': (listing) }}
    myquery1={}
    
    # myquery = {"price":{ "$eq": "300" }}
    print('query', collection.find(myquery))
    for json in collection.find(myquery):
        data = {}
        data.update({
        'MinNights': json['MinNights'],
        'Hood' : json['Hood'],
        'SqFt' : json['SqFt'],
        '#Reviews': json['#Reviews'],
        '#Guests' :json['#Guests'],
        'Listing Count' : json['Listing Count'],
        'Security':json['Security']      ,
        'CleanFee':json['CleanFee'],
        'Dist':json['Dist'],
        'BA':json['BA'],
        'BR':json['BR'],
        'Beds':json['Beds'],
        'Acc': json['Acc'],
        '#Booked':json['#Booked'],
        'Price':json['Price'],
        'Name':json['Name'],
        'Polarity':json['Polarity']

        })
        listings.append(data)
    for json1 in collection.find(myquery1):
        data1 = {}
        data1.update({
        'MinNights': json1['MinNights'],
        'Hood' : json1['Hood'],
        'SqFt' : json1['SqFt'],
        '#Reviews': json1['#Reviews'],
        '#Guests' :json1['#Guests'],
        'Listing Count' : json1['Listing Count'],
        'Security':json1['Security']      ,
        'CleanFee':json1['CleanFee'],
        'Dist':json1['Dist'],
        'BA':json1['BA'],
        'BR':json1['BR'],
        'Beds':json1['Beds'],
        'Acc': json1['Acc'],
        '#Booked':json1['#Booked'],
        'Price':json1['Price'],
        'Name':json1['Name'],
        'Polarity':json1['Polarity']
        })
        listings1.append(data1)
    test = pd.DataFrame(listings)
    test1 = pd.DataFrame(listings1)
    x1 = test.drop('Price', axis=1)
    x = x1.drop('Name', axis=1)
    y = test['Price']

    x2=test1.drop('Name', axis=1)
    x1 = x2.drop('Price', axis=1)
    y1 = test1['Price']
    # model=load_model("reviews.h5")

    clf = RandomForestClassifier(n_estimators=11)
    # scoring = 'accuracy'
    # score = cross_val_score(clf, x1, y1, cv=k_fold, n_jobs=1, scoring=scoring)
    clf.fit(x1,y1)
    pred=()
    prediction1=clf.predict(x)
    # prediction1=model.predict_classes(x)
    if prediction1[0] < y[0]:
        pred='Great Deal!'
    if prediction1[0]==y[0]:
        pred='Great Deal!'
    if prediction1[0] >y[0]:
        pred='Bad Deal'
    prediction2=pd.DataFrame({"pred":pred, 'modl':prediction1[0],"sample":y})
    prediction=prediction2.to_json(orient="records")
    # print(prediction2)
    # print(pred)
    # prediction2
    return(prediction)
    # print(test)
    # return(jsonify(listings1))



@app.route("/New_Orleans.html")
def landing():
    return render_template("New_Orleans.html")

@app.route("/Visualizations.html")
def visuals():
    return render_template("Visualizations.html")

@app.route("/Coming_Soon.html")
def coming_soon():
    return render_template("Coming_Soon.html")

@app.route("/all_listings.html")    
def all_listings():
    return render_template("all_listings.html")

@app.route("/names")
def names():
   
    collection = mongo.db.neighborhoods
    data = pd.DataFrame(list(collection.find({})))
    return jsonify(list(data.neighbourhood))

@app.route("/venues_json")
def venues_json():
    collection = mongo.db.venues_json
    data = {}
    myquery = {}   

    for json in collection.find(myquery):
        data.update({'type': json['features']})
    
    return jsonify(data)

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