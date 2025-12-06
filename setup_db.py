import mysql.connector
from pathlib import Path

def run_schema():
    sql = Path('schema.sql').read_text(encoding ='utf-8')
    conn = mysql.connector.connect(
        host='localhost',
        user='Mike',
        password='mango',
        database='outing_app'
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