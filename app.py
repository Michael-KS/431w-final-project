# app.py
from flask import Flask, jsonify
from db import get_connection

app = Flask(__name__)

@app.route("/")
def health_check():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT 1")
    row = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify({"status": "ok", "db_result": row[0]})

if __name__ == "__main__":
    app.run()