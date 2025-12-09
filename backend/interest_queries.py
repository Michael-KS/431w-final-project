from db import get_connection

def add_interest(name, cat_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Interest (Name, Cat_id) VALUES (%s, %s)",
            (name, cat_id),
        )
        conn.commit()
        return {"status": "success", "message": "Interest added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_interest(interest_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM Interest WHERE In_id = %s",
            (interest_id,),
        )
        if cur.rowcount == 0:
            return {"status": "error", "message": "Interest id not found."}
        conn.commit()
        return {"status": "success", "message": "Interest deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def add_interest_to_profile(email, interest_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO ProfileInterest (Email, In_id) VALUES (%s, %s)",
            (email, interest_id),
        )
        conn.commit()
        return {"status": "success", "message": "Interest added to user successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def remove_interest_from_profile(email, interest_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM ProfileInterest WHERE Email = %s AND In_id = %s",
            (email, interest_id),
        )
        if cur.rowcount == 0:
            return {"status": "error", "message": "Interest not found for the user."}
        conn.commit()
        return {"status": "success", "message": "Interest removed from user successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def get_profile_interests(email):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            """
            SELECT i.Name, c.Description
            FROM Interest i
            JOIN Category c ON i.Cat_id = c.Cat_id
            JOIN ProfileInterest pi ON i.In_id = pi.In_id
            WHERE pi.Email = %s
            """,
            (email,),
        )
        interests = cur.fetchall()
        interest_list = [
            {"in_id": row[0], "name": row[1], "category": row[2]} for row in interests
        ]
        return {"status": "success", "interests": interest_list}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()