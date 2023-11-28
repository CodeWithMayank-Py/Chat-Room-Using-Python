import sqlite3
from user_db import get_user_by_username  # Import the function from user_db.py


# Database file path
DATABASE_FILE = "chat_app_database.db"

# Function to check if the chat_rooms table exists
def table_exists():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='chat_rooms' ''')
    exists = cursor.fetchone()[0]
    conn.close()
    return exists

# Function to generate a unique room ID
def generate_room_id(room_count):
    # Format the room ID with leading zeros (e.g., #roomid0001)
    return f"#roomid{room_count:04}"

# Function to create the chat_rooms table if it doesn't exist
def create_chat_rooms_table():
    # Check if the database file exists
    if not os.path.exists(DATABASE_FILE):
        # If the file doesn't exist, create the database and the table
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        # Create the chat_rooms table with fields: id, user_id, room_id, room_name, password, members, created_at, deleted_at, status
        cursor.execute('''CREATE TABLE chat_rooms
                          (user_id INTEGER NOT NULL,
                           room_id TEXT NOT NULL,
                           room_name TEXT NOT NULL,
                           password TEXT NOT NULL,
                           members INTEGER NOT NULL,
                           created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                           deleted_at DATETIME,
                           status TEXT NOT NULL,
                           FOREIGN KEY (user_id) REFERENCES users(user_id))''')
        conn.commit()
        conn.close()

# Function to add a new room to the chat_rooms table
def add_room(username, room_id, room_name, password, members, status):
    # Get user information based on the provided username
    user = get_user_by_username(username)
    if user:
        user_id = user[0]  # Assuming the user_id is the first column in the users table
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        # Insert a new room into the chat_rooms table with the correct user_id
        cursor.execute('''INSERT INTO chat_rooms (user_id, room_id, room_name, password, members, status)
                          VALUES (?, ?, ?, ?, ?, ?)''', (user_id, room_id, room_name, password, members, status))
        conn.commit()
        conn.close()
    else:
        print("User not found.")

# Function to retrieve room information by room ID
def get_room_by_id(room_id):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    # Retrieve room information based on the room ID
    cursor.execute('''SELECT * FROM chat_rooms WHERE room_id = ?''', (room_id,))
    room = cursor.fetchone()
    conn.close()
    return room
