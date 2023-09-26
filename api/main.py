"""Module providing image api"""
import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    """get random image from unsplash api"""
    word = request.args.get("query")
    headers = {"Authorization": "Client-ID " + UNSPLASH_KEY, "Accept-version": "v1"}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params, timeout=1)
    data = response.json()

    return data


@app.route("/images", methods=["GET", "POST"])
def images():
    """images endpoint"""
    if request.method == "GET":
        # read images from the db
        imgs = images_collection.find({})

        return jsonify([img for img in imgs])
    if request.method == "POST":
        # save image in the db
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id

        return jsonify({"inserted_id": inserted_id})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
