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

#get all activites in a specific catagory with their location details
def get_activities_by_category(cat_id):
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            """
            SELECT a.Title, a.Duration, a.Price, l.Name, l.Address
            FROM Activity a
            JOIN Location l ON a.Loc_id = l.Loc_id
            WHERE a.Cat_id = %s
            """,
            (cat_id,),
        )
        activities = cur.fetchall()
        activity_list = []
        for activity in activities:
            activity_info = {
                "Title": activity[0],
                "Duration": activity[1],
                "Price": activity[2],
                "Name": activity[3],
                "Address": activity[4],
            }
            activity_list.append(activity_info)
        return {"status": "success", "activities": activity_list}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def get_all_activities():
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT * FROM Activity")
        activities = cur.fetchall()
        activity_list = []
        for activity in activities:
            activity_info = {
                "Act_id": activity[0],
                "Loc_id": activity[1],
                "Title": activity[2],
                "Duration": activity[3],
                "Price": activity[4],
                "Cat_id": activity[5],
            }
            activity_list.append(activity_info)
        return {"status": "success", "activities": activity_list}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()