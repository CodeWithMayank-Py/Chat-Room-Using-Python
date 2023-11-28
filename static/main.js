const createButton = document.getElementById('createButton');

createButton.addEventListener('click', async () => {
    console.log('Create button clicked');  // Log to see if the click event is detected

    try {
        const response = await fetch('/create_call', { method: 'POST' });
        const data = await response.json();
        console.log('Server response:', data);

        // You can handle the response data here (e.g., display the caller ID)
    } catch (error) {
        console.error('Error creating call:', error);
    }
});
