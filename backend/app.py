from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_connection
from profile_queries import *
from category_queries import *
from interest_queries import *
from location_queries import *
from activity_queries import *
from event_queries import *
from review_queries import *


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=['Content-Type'])

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

@app.route("/login", methods=["POST", "OPTIONS"]) # submitting sensitive info requires POST
def login_user():
    if request.method == 'POST':
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

    return '', 204

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
    
@app.route("/add_category", methods=["POST"])
def add_new_category():
    data = request.get_json()
    desc = data.get("description")
    suited_for = data.get("suited_for")

    if not all([desc, suited_for]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_category(desc, suited_for)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_category", methods=["DELETE"])
def delete_existing_category():
    data = request.get_json()
    cat_id = data.get("cat_id")

    if not cat_id:
        return jsonify({"status": "error", "message": "Category ID is required"}), 400

    result = delete_category(cat_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/get_categories", methods=["GET"])
def get_categories():
    result = get_all_categories()

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/add_interest", methods=["POST"])
def add_new_interest():
    data = request.get_json()
    name = data.get("name")
    cat_id = data.get("cat_id")

    if not all([name, cat_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_interest(name, cat_id)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_interest", methods=["DELETE"])
def delete_existing_interest():
    data = request.get_json()
    interest_id = data.get("in_id")

    if not interest_id:
        return jsonify({"status": "error", "message": "Interest ID is required"}), 400

    result = delete_interest(interest_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/add_interest_to_profile", methods=["POST"])
def add_interest_to_profile_route():
    data = request.get_json()
    email = data.get("email")
    interest_id = data.get("in_id")

    if not all([email, interest_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_interest_to_profile(email, interest_id)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500   
    
@app.route("/remove_interest_from_profile", methods=["DELETE"])
def remove_interest_from_profile_route():
    data = request.get_json()
    email = data.get("email")
    interest_id = data.get("in_id")

    if not all([email, interest_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = remove_interest_from_profile(email, interest_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/get_profile_interests", methods=["GET"])
def get_profile_interests_route():
    email = request.args.get("email")

    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 400

    interests = get_profile_interests(email)

    if interests is not None:
        return jsonify({"status": "success", "interests": interests}), 200
    else:
        return jsonify({"status": "error", "message": "Could not retrieve interests"}), 500

@app.route("/add_location", methods=["POST"])
def add_location_route():
    data = request.get_json()
    name = data.get("name")
    address = data.get("address")

    if not all([name, address]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_location(name, address)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_location", methods=["DELETE"])
def delete_location_route():
    data = request.get_json()
    location_id = data.get("loc_id")

    if not location_id:
        return jsonify({"status": "error", "message": "Location ID is required"}), 400

    result = delete_location(location_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500

@app.route("/add_activity", methods=["POST"])
def add_activity_route():
    data = request.get_json()
    loc_id = data.get("loc_id")
    title = data.get("title")
    duration = data.get("duration")
    price = data.get("price")
    cat_id = data.get("cat_id")

    if not all([loc_id, title, duration, price, cat_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_activity(loc_id, title, duration, price, cat_id)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_activity", methods=["DELETE"])
def delete_activity_route():
    data = request.get_json()
    act_id = data.get("act_id")

    if not act_id:
        return jsonify({"status": "error", "message": "Activity ID is required"}), 400

    result = delete_activity(act_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/add_event", methods=["POST"])
def add_event_route():
    data = request.get_json()
    date = data.get("date")
    status = data.get("status")
    act_id = data.get("act_id")
    host_email = data.get("host_email")

    if not all([date, status, act_id, host_email]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_event(date, status, act_id, host_email)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500

@app.route("/delete_event", methods=["DELETE"])
def delete_event_route():
    data = request.get_json()
    e_id = data.get("e_id")

    if not e_id:
        return jsonify({"status": "error", "message": "Event ID is required"}), 400

    result = delete_event(e_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/add_participant", methods=["POST"])
def add_participant_route():
    data = request.get_json()
    email = data.get("email")
    e_id = data.get("e_id")

    if not all([email, e_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_participant(email, e_id)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_participant", methods=["DELETE"])
def delete_participant_route():
    data = request.get_json()
    email = data.get("email")
    e_id = data.get("e_id")

    if not all([email, e_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = delete_participant(email, e_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500

@app.route("/add_review", methods=["POST"])
def add_review_route():
    data = request.get_json()
    author_email = data.get("author_email")
    star_level = data.get("star_level")
    e_id = data.get("e_id")

    if not all([author_email, star_level, e_id]):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    result = add_review(author_email, star_level, e_id)
    if result["status"] == "success":
        return jsonify(result), 201
    else:
        return jsonify(result), 500
    
@app.route("/delete_review", methods=["DELETE"])
def delete_review_route():
    data = request.get_json()
    rev_id = data.get("rev_id")

    if not rev_id:
        return jsonify({"status": "error", "message": "Review ID is required"}), 400

    result = delete_review(rev_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500
    
@app.route("/get_activities_by_category", methods=["GET"])
def get_activities_by_category_route():
    cat_id = request.args.get("cat_id")

    if not cat_id:
        return jsonify({"status": "error", "message": "Category ID is required"}), 400

    result = get_activities_by_category(cat_id)

    if result["status"] == "success":
        return jsonify(result), 200
    else:
        return jsonify(result), 500

@app.route("/get_events_by_host", methods=["GET", "OPTIONS"])
def get_events_by_host_route():
    if request.method == 'GET':
        host_email = request.args.get("host_email")

        if not host_email:
            return jsonify({"status": "error", "message": "Host email is required"}), 400

        result = get_events_by_host(host_email)

        if result["status"] == "success":
            return jsonify(result), 200
        else:
            return jsonify(result), 500

    return '', 204

if __name__ == "__main__":
    app.run(debug=True)