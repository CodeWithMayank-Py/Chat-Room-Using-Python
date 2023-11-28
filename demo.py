import random, string


def generate_unique_call_id():
    while True:
        call_id = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))

        # Check if the call ID meets the criteria
        lowercase_count = sum(c.islower() for c in call_id)
        uppercase_count = sum(c.isupper() for c in call_id)
        digit_count = sum(c.isdigit() for c in call_id)

        if lowercase_count >= 2 and uppercase_count >= 2 and digit_count >= 2:
            return call_id
        

print(generate_unique_call_id())