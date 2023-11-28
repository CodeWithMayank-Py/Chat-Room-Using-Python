from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import random, string, uuid, jsonify

app = Flask(__name__)
socketio = SocketIO(app)

# Placeholder to store created calls
created_calls = set()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Handle login logic here
        pass
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Handle signup logic here
        pass
    return render_template('signup.html')


@app.route('/createButton', methods=['GET', 'POST'])
def dashboard():
    if request.method == 'POST':
        # Handle signup logic here
        pass
    return render_template('dashboard.html')


@app.route('/create_call', methods=['POST'])
def create_call():
    caller_id = generate_unique_call_id()
    created_calls.add(caller_id)
    return jsonify({'caller_id': caller_id})


@socketio.on('disconnect')
def handle_disconnect():
    # Handle disconnect logic here
    pass

def generate_unique_call_id():
    while True:
        call_id = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

        # Check if the call ID meets the criteria
        lowercase_count = sum(c.islower() for c in call_id)
        uppercase_count = sum(c.isupper() for c in call_id)
        digit_count = sum(c.isdigit() for c in call_id)

        if lowercase_count >= 2 and uppercase_count >= 2 and digit_count >= 2:
            return call_id


if __name__ == '__main__':
    app.run(debug=True)
