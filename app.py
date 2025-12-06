from flask import Flask, jsonify, request
from db import get_connection
from profile_queries import *

app = Flask(__name__)


@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    location = data.get("location")
    gender = data.get("gender")

    if not all([email, username, password, location, gender]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = create_profile(email, username, password, location, gender)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500

@app.route("/login", methods=["POST"]) # submitting sensitive info requires POST
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"status": "error", "message": "Missing email or password"}), 400

    profile = get_profile_for_login(email, password)

    if profile:
        return jsonify({"status": "success", "profile": profile})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401


@app.route("/update_profile", methods=["PUT"])
def update_user_profile():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")
    location = data.get("location")
    gender = data.get("gender")
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400
    
    result = update_profile(email, username, password, location, gender)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500



@app.route("/delete_profile", methods=["DELETE"])
def delete_user_profile():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400

    result = delete_profile(email)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    

if __name__ == "__main__":
    app.run(debug=True)