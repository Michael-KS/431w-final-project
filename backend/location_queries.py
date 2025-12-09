from db import get_connection

def add_location(name, address):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Location (Name, Address) VALUES (%s, %s)",
            (name, address),
        )
        conn.commit()
        return {"status": "success", "message": "Location added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_location(location_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM Location WHERE Loc_id = %s",
            (location_id,),
        )
        conn.commit()
        return {"status": "success", "message": "Location deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()