from db import get_connection

def add_category(desc, suited_for):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Category (Description, Suited_for) VALUES (%s, %s)",
            (desc, suited_for),
        )
        conn.commit()
        return {"status": "success", "message": "Category added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_category(cat_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM Category WHERE Cat_id = %s",
            (cat_id,),
        )
        if cur.rowcount == 0:
            return {"status": "error", "message": "Category id not found."}
        conn.commit()
        return {"status": "success", "message": "Category deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()