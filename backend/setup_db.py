import mysql.connector
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

def run_schema():
    sql = Path('schema.sql').read_text(encoding ='utf-8')
    conn = mysql.connector.connect(
        host='localhost',
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
    )
    cursor = conn.cursor()
    for statement in sql.split(';'):
        if statement.strip():
            cursor.execute(statement)
    conn.commit()
    cursor.close()
    conn.close()

if __name__ == '__main__':
    run_schema()