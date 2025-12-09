from db import get_connection

def add_review(author_email, star_level, e_id ):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Review (Author_email, star_level, E_id) VALUES (%s, %s, %s)",
            (author_email, star_level, e_id),
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