# Import Modules
import sqlite3

# Databses file path
DATABASE_FILE = "chat_app_database.db"

# Function to generate a unique user ID
def generate_user_id(user_count):
    # Format the user ID with leading zeros (e.g., #user0001)
    return f"#user{user_count:04}"

# Function to check if the users table exists
def table_exists():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='users' ''')
    exists = cursor.fetchone()[0]
    conn.close()
    return exists

# Function to create the users table if it doesn't exist
def create_user_table():
    if not table_exists():
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        # Create the users table with fields: user_id, username, email, password
        cursor.execute('''CREATE TABLE users
                          (user_id TEXT PRIMARY KEY,
                           username TEXT NOT NULL,
                           email TEXT NOT NULL,
                           password TEXT NOT NULL)''')
        conn.commit()
        conn.close()


# Function to add a new user to the users table
def add_user(username, email, password):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    # Get the current user count from the database
    cursor.execute('''SELECT COUNT(*) FROM users''')
    user_count = cursor.fetchone()[0] + 1
    # Generate a unique user ID
    user_id = generate_user_id(user_count)
    # Insert a new user into the users table
    cursor.execute('''INSERT INTO users (user_id, username, email, password)
                      VALUES (?, ?, ?, ?)''', (user_id, username, email, password))
    conn.commit()
    conn.close()

# Function to retrieve user information by username
def get_user_by_username(username):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    # Retrieve user information based on the username
    cursor.execute('''SELECT * FROM users WHERE username = ?''', (username,))
    user = cursor.fetchone()
    conn.close()
    return user

# Function to retrieve user information by email
def get_user_by_email(email):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    # Retrieve user information based on the email
    cursor.execute('''SELECT * FROM users WHERE email = ?''', (email,))
    user = cursor.fetchone()
    conn.close()
    return user