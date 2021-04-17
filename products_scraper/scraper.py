import datetime
import hashlib
import requests
import json
import pymongo
import random

PRODUCTS_URL = "https://api-v3.findify.io/v3/search?user%5Buid%5D=517a1650-e7c4-4213-b9bd-c883d7f24d96&user%5Bsid%5D=9f61e961-71dc-4718-8191-2241509af86b&t_client=1616000548712&key=86221637-ce68-43ee-8ca6-1f4e6761e72c&q=socks&limit=100&offset=0&callback=__jpe4E7"
PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
PRODUCT_COLORS = ['Black', 'Yellow', 'Blue', 'Pink', 'Green', 'Red', 'Purple', 'Gray']
DB_URL = "mongodb://localhost:27017/"
DB_NAME = "stocks"
PRODUCTS_COLLECTION_NAME = "products"
USERS_COLLECTION_NAME = "users"


def parse_get_result(res_text):
    parsed_text = res_text[48:-2]
    products_json = json.loads(parsed_text)["items"]
    return products_json


def get_products():
    res = requests.get(PRODUCTS_URL)
    return parse_get_result(res.text)


def prepare_items_to_db(products):
    items_to_db = []
    for product in products:
        price = product["price"][0]
        image_url = product["image_url"].replace("bogus/", "com/media/")
        name = product["title"]
        items_to_db.append({
            "imageUrl": image_url,
			"createdAt": datetime.datetime.now(),
            "isHomePageProduct": True,
            "name": name,
            "shortDescription": name,
            "longDescription": name,
            "price": price,
            "color": random.choice(PRODUCT_COLORS),
            "size": random.choice(PRODUCT_SIZES)
        })

    return items_to_db


def insert_items_to_db(items_to_db):
    client = pymongo.MongoClient(DB_URL)
    db = client[DB_NAME]
    collection = db[PRODUCTS_COLLECTION_NAME]
    if not collection.count():
        return collection.insert_many(items_to_db).inserted_ids
    return []


def create_admin_user():
    client = pymongo.MongoClient(DB_URL)
    db = client[DB_NAME]
    collection = db[USERS_COLLECTION_NAME]
    query = {"role": "admin"}
    if not collection.find(query).count():
        return collection.insert_one({
            "onlineState": "OFFLINE",
            "createdAt": datetime.datetime.now(),
            "updatedAt": datetime.datetime.now(),
            "isDeleted": False,
            "firstName": "admin",
            "lastName": "admin",
            "email": "admin@gmail.com",
            "password": hashlib.md5("admin".encode()).hexdigest(),
            "role": "admin"
        })


if __name__ == '__main__':
    products = get_products()
    print(f"Got {len(products)} products.")
    items_to_db = prepare_items_to_db(products)
    print(f"Parsed {len(items_to_db)} items.")
    insert_result = insert_items_to_db(items_to_db)
    print(f"{len(insert_result)} items inserted successfully.")
    create_admin_user()
    print("Admin user created:")
    print("user: admin@gmail.com")
    print("pass: admin")
