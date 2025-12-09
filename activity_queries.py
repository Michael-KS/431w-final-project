from db import get_connection

def add_activity(loc_id, title, duration, price, cat_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Activity (Loc_id, Title, Duration, Price, Cat_id) VALUES (%s, %s, %s, %s, %s)",
            (loc_id, title, duration, price, cat_id),
        )
        conn.commit()
        return {"status": "success", "message": "Activity added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_activity(act_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM Activity WHERE Act_id = %s", (act_id,))
        if cur.rowcount == 0:
            return {"status": "error", "message": "Activity not found."}
        conn.commit()
        return {"status": "success", "message": "Activity deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()