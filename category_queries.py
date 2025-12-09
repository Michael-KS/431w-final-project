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

def get_all_categories():
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT Description, Suited_for FROM Category")
        categories = cur.fetchall()
        category_list = [
            {"description": row[0], "suited_for": row[1]}
            for row in categories
        ]
        return {"status": "success", "categories": category_list}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()