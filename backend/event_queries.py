from db import get_connection

def add_event(date, status, act_id, host_email):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Event (Date, Status, Act_id, Host_email) VALUES (%s, %s, %s, %s)",
            (date, status, act_id, host_email),
        )
        conn.commit()
        return {"status": "success", "message": "Event added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_event(e_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("DELETE FROM Event WHERE e_id = %s", (e_id,))
        if cur.rowcount == 0:
            return {"status": "error", "message": "Event not found."}
        conn.commit()
        return {"status": "success", "message": "Event deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def add_participant(email, e_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Participants (Email, E_id) VALUES (%s, %s)",
            (email, e_id),
        )
        conn.commit()
        return {"status": "success", "message": "Participant added successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_participant(email, e_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM Participants WHERE Email = %s AND E_id = %s",
            (email, e_id),
        )
        if cur.rowcount == 0:
            return {"status": "error", "message": "Participant not found."}
        conn.commit()
        return {"status": "success", "message": "Participant deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()