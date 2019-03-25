from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd
import pymongo
from pymongo import MongoClient


# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder="")
# setup mongo connection

mongo = PyMongo(app, uri="mongodb://localhost:27017/air_bnb")

# connect to mongo db and collection



@app.route("/")
def index():
    # write a statement that finds all the items in the db and sets it to a variable
    listings_info = mongo.db.listings.find_one()
    return render_template("index.html", data=listings_info)


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    client = MongoClient()
    db = client.air_bnb
    collection = db.neighborhoods
    data = pd.DataFrame(list(collection.find({})))

    # Return a list of the column names (sample names)
    return jsonify(list(data.neighbourhood))




if __name__== '__main__':
    app.run(debug=True)