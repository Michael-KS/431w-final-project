from db import get_connection

def add_review(author_email, star_level, e_id, description ):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Review (Author_email, star_level, E_id, Description) VALUES (%s, %s, %s, %s)",
            (author_email, star_level, e_id, description),
        )
        conn.commit()
        return {"status": "success", "message": "Review added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_review(rev_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM Review WHERE rev_id = %s", (rev_id,))
        if cur.rowcount == 0:
            return {"status": "error", "message": "Review not found."}
        conn.commit()
        return {"status": "success", "message": "Review deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def get_reviews_by_event(e_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM Review WHERE E_id = %s", (e_id,))
        reviews = cur.fetchall()
        review_list = []
        for review in reviews:
            review_dict = {
                "rev_id": review[0],
                "Author_email": review[1],
                "star_level": review[2],
                "E_id": review[3],
                "Description": review[4],
            }
            review_list.append(review_dict)
        return {"status": "success", "reviews": review_list}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def get_top_ten():
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT a.Act_id, a.Title, a.Price, a.Duration, l.Name AS LocationName, COUNT(DISTINCT e.E_id) AS event_count, AVG(r.Star_level) AS avg_rating, COUNT(DISTINCT r.Rev_id) AS review_count FROM Activity a JOIN Location l ON a.Loc_id = l.Loc_id LEFT JOIN Event e ON a.Act_id = e.Act_id LEFT JOIN Review r ON e.E_id = r.E_id GROUP BY a.Act_id, a.Title, a.Price, a.Duration, l.Name ORDER BY avg_rating DESC, event_count DESC LIMIT 10;")
        outings = cur.fetchall()
        outing_list = []
        for outing in outings:
            outing_dict = {
                "act_id": outing[0],
                "title": outing[1],
                "price": outing[2],
                "duration": outing[3],
                "location_name": outing[4],
                "event_count": outing[5],
                "avg_rating": outing[6],
                "review_count": outing[7],
            }
            outing_list.append(outing_dict)
            return{"status": "success", "outings": outing_list}
    except Exception as e:
        return{"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()