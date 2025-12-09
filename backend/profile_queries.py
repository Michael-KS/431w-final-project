from db import get_connection

def create_profile(email, username, password, location, gender):
    """
    Creates a new user profile in the database.
    """
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Profile (Email, Username, Password, Location, Gender) VALUES (%s, %s, %s, %s, %s)",
            (email, username, password, location, gender),
        )
        conn.commit()
        return {"status": "success", "message": "Profile created successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def get_profile_for_login(email, password):
    """
    Retrieves a user's profile for login verification.
    """
    conn = get_connection()
    cur = conn.cursor(dictionary=True)
    try:
        cur.execute(
            "SELECT Email, Username FROM Profile WHERE Email = %s AND Password = %s",
            (email, password),
        )
        profile = cur.fetchone()
        return profile
    except Exception as e:
        print(f"Error during login: {e}")
        return None
    finally:
        cur.close()
        conn.close()

def update_profile(email, username=None, password=None, location=None, gender=None):
    """
    Updates an existing user profile in the database.
    Only updates fields that are not None.
    """
    conn = get_connection()
    cur = conn.cursor()

    updates = []
    params = []

    if username is not None:
        updates.append("Username = %s")
        params.append(username)
    if password is not None:
        updates.append("Password = %s")
        params.append(password)
    if location is not None:
        updates.append("Location = %s")
        params.append(location)
    if gender is not None:
        updates.append("Gender = %s")
        params.append(gender)

    if not updates:
        return {"status": "error", "message": "No fields to update"}

    params.append(email)
    
    query = f"UPDATE Profile SET {', '.join(updates)} WHERE Email = %s"

    try:
        cur.execute(query, tuple(params))
        
        if cur.rowcount == 0:
            return {"status": "error", "message": "Profile not found or no new data to update"}

        conn.commit()
        return {"status": "success", "message": "Profile updated successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()

def delete_profile(email):
    """
    Deletes a user profile from the database.
    """
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "DELETE FROM Profile WHERE Email = %s",
            (email,),
        )
        if cur.rowcount == 0:
            return {"status": "error", "message": "Profile not found."}
        conn.commit()
        return {"status": "success", "message": "Profile deleted successfully."}
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cur.close()
        conn.close()