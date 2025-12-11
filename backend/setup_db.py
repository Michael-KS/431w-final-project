import mysql.connector
from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

def run_script(): # Renamed from run_schema for clarity
    db_name = 'outing_app'
    
    # --- Step 1: Connect to MySQL server (no specific database) ---
    # This connection is just to be able to drop/create the main database
    conn = mysql.connector.connect(
        host='localhost',
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD')
    )
    cur = conn.cursor()
    print("--- Running schema.sql ---")

    sql_file = Path('schema.sql').read_text(encoding='utf-8')
    
    # Split the file into individual SQL statements
    sql_statements = sql_file.split(';')

    # --- Step 2: Execute each statement from schema.sql one by one ---
    for statement in sql_statements:
        # Skip empty statements that result from the split
        if not statement.strip():
            continue
        
        try:
            print(f"Executing: {statement.strip()[:80]}...") # Print the start of the statement
            cur.execute(statement)
        except Exception as e:
            print(f"  -> FAILED: {e}")

    print("--- Schema setup complete ---")
    conn.commit()
    cur.close()
    conn.close()

def seed_initial_data():
    # --- Step 3: Connect to the newly created 'outing_app' database to seed data ---
    conn = mysql.connector.connect(
        host='localhost',
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database='outing_app'
    )
    cur = conn.cursor()
    
    print("\n--- Seeding initial data ---")
    try:
        print("Adding Categories...")
        cur.execute("INSERT INTO Category (Cat_id, Description, Suited_for) VALUES (1, 'Social Meetups', 'S') ON DUPLICATE KEY UPDATE Description=VALUES(Description)")
        cur.execute("INSERT INTO Category (Cat_id, Description, Suited_for) VALUES (2, 'Active & Outdoors', 'S') ON DUPLICATE KEY UPDATE Description=VALUES(Description)")
        cur.execute("INSERT INTO Category (Cat_id, Description, Suited_for) VALUES (3, 'Relaxing & Creative', 'C') ON DUPLICATE KEY UPDATE Description=VALUES(Description)")
        cur.execute("INSERT INTO Category (Cat_id, Description, Suited_for) VALUES (4, 'Learning & Growth', 'S') ON DUPLICATE KEY UPDATE Description=VALUES(Description)")

        
        print("Adding Locations...")
        cur.execute("INSERT INTO Location (Loc_id, Name, Address) VALUES (1, 'Central Cafe', '123 Main St') ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Location (Loc_id, Name, Address) VALUES (2, 'City Park Trails', '456 Oak Ave') ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Location (Loc_id, Name, Address) VALUES (3, 'Art Studio Downtown', '789 Pine Ln') ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Location (Loc_id, Name, Address) VALUES (4, 'Community Library', '101 Elm Rd') ON DUPLICATE KEY UPDATE Name=VALUES(Name)")

      
        print("Adding Activities...")
        cur.execute("INSERT INTO Activity (Act_id, Loc_id, Title, Duration, Price, Cat_id) VALUES (1, 1, 'Coffee Chat', 1.5, 5.00, 1) ON DUPLICATE KEY UPDATE Title=VALUES(Title)")
        cur.execute("INSERT INTO Activity (Act_id, Loc_id, Title, Duration, Price, Cat_id) VALUES (2, 2, 'Morning Hike', 3.0, 0.00, 2) ON DUPLICATE KEY UPDATE Title=VALUES(Title)")
        cur.execute("INSERT INTO Activity (Act_id, Loc_id, Title, Duration, Price, Cat_id) VALUES (3, 3, 'Painting Workshop', 2.0, 30.00, 3) ON DUPLICATE KEY UPDATE Title=VALUES(Title)")
        cur.execute("INSERT INTO Activity (Act_id, Loc_id, Title, Duration, Price, Cat_id) VALUES (4, 4, 'Book Club Meeting', 1.0, 0.00, 4) ON DUPLICATE KEY UPDATE Title=VALUES(Title)")
        cur.execute("INSERT INTO Activity (Act_id, Loc_id, Title, Duration, Price, Cat_id) VALUES (5, 1, 'a_activity', 1.0, 10.00, 1) ON DUPLICATE KEY UPDATE Title=VALUES(Title)")

    
        print("Adding Interests...")
        cur.execute("INSERT INTO Interest (In_id, Name, Cat_id) VALUES (1, 'Gaming', 1) ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Interest (In_id, Name, Cat_id) VALUES (2, 'Hiking', 2) ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Interest (In_id, Name, Cat_id) VALUES (3, 'Reading', 3) ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Interest (In_id, Name, Cat_id) VALUES (4, 'Cooking', 1) ON DUPLICATE KEY UPDATE Name=VALUES(Name)")
        cur.execute("INSERT INTO Interest (In_id, Name, Cat_id) VALUES (5, 'Yoga', 2) ON DUPLICATE KEY UPDATE Name=VALUES(Name)")

        conn.commit()
        print("--- Initial data seeding complete! ---")
    except Exception as e:
        conn.rollback()
        print(f"Error seeding data: {e}")
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    run_script()
    seed_initial_data()