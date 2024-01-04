// Assuming you have a way to store the user's name
const storedUserName = localStorage.getItem('userName');

// Update the header with the user's name
const userNameElement = document.getElementById('userName');
if (storedUserName) {
    userNameElement.textContent = storedUserName;
}

// Dropdown functionality
const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');

userIcon.addEventListener('click', () => {
    userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.matches('#userIcon')) {
        userDropdown.style.display = 'none';
    }
});

// Reset all fields when clicking outside the modal content and the "Create Room" button
document.addEventListener('click', function (event) {
    const modalContent = document.querySelector('.modal-content');
    const createRoomBtn = document.getElementById('createRoomBtn');
    const roomNameField = document.getElementById('roomName');
    const passwordField = document.getElementById('roomPassword');

    if (!modalContent.contains(event.target) && event.target !== createRoomBtn &&
        event.target !== roomNameField && event.target !== passwordField) {
        resetFields();
    }
});

// Function to reset all fields
function resetFields() {
    document.getElementById('roomName').value = '';
    document.getElementById('roomPassword').value = '';
    document.getElementById('roomNameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
}

// Reset room name and password inputs when modal is closed
$('#exampleModalCenter').on('hidden.bs.modal', function () {
    resetFields();
});


// Check room name length while typing
document.getElementById('roomName').addEventListener('input', function () {
    const roomName = this.value;
    const errorElement = document.getElementById('roomNameError');

    if (roomName.length > 15) {
        errorElement.textContent = 'Room name cannot be more than 15 characters.';
    } else {
        errorElement.textContent = ''; // Clear error message
    }
});


// Check room name length while typing
document.getElementById('roomPassword').addEventListener('input', function () {
    const roomName = this.value;
    const errorElement = document.getElementById('passwordError');

    if (roomName.length > 8) {
        errorElement.textContent = 'Password must be less than or equal to 8 characters';
    } else {
        errorElement.textContent = ''; // Clear error message
    }
});

// Remove readonly attribute from password field to enable editing
document.getElementById('roomPassword').removeAttribute('readonly');


// Reset all fields when clicking outside the modal content and the "Join Room" button
document.addEventListener('click', function (event) {
    const joinRoomModalContent = document.querySelector('#joinRoomModal .modal-content');
    const joinRoomBtn = document.querySelector('#joinRoomModal .btn-primary');
    const joinRoomIdField = document.getElementById('joinRoomId');
    const joinRoomPasswordField = document.getElementById('joinRoomPassword');

    if (!joinRoomModalContent.contains(event.target) && event.target !== joinRoomBtn &&
        event.target !== joinRoomIdField && event.target !== joinRoomPasswordField) {
        resetJoinRoomFields();
    }
});

// Function to reset all fields in Join Room modal
function resetJoinRoomFields() {
    document.getElementById('joinRoomId').value = '';
    document.getElementById('joinRoomPassword').value = '';
    document.getElementById('joinRoomIdError').textContent = '';
    document.getElementById('joinRoomPasswordError').textContent = '';
}

// Flag to determine if the fields should be reset
let shouldResetJoinRoomFields = true;

// Focus event to set the flag when a field is focused
document.getElementById('joinRoomId').addEventListener('focus', function () {
    shouldResetJoinRoomFields = false;
});

document.getElementById('joinRoomPassword').addEventListener('focus', function () {
    shouldResetJoinRoomFields = false;
});

// Blur event to reset the fields if the flag is true
document.getElementById('joinRoomId').addEventListener('blur', function () {
    if (shouldResetJoinRoomFields) {
        resetJoinRoomFields();
    }
    shouldResetJoinRoomFields = true;
});

document.getElementById('joinRoomPassword').addEventListener('blur', function () {
    if (shouldResetJoinRoomFields) {
        resetJoinRoomFields();
    }
    shouldResetJoinRoomFields = true;
});

// --------------------------------
// Dropdown options
// Profile Button - Dropdown Option

// Function to open the profile modal
function openProfileModal() {
    $('#profileModal').modal('show');
}

// Add an event listener for the edit icon to toggle the emoji list
document.getElementById('editIcon').addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click event from reaching the document
    toggleEmojiList();
});

// Add a click event listener to the document to close the emoji list when clicking outside
document.addEventListener('click', function () {
    closeEmojiList();
});

// Add an event listener for each emoji to select and hide the emoji list
var emojis = document.getElementsByClassName('emoji');
for (var i = 0; i < emojis.length; i++) {
    emojis[i].addEventListener('click', function () {
        selectEmoji(this.textContent);
        closeEmojiList();
    });
}

// Function to handle emoji selection
function selectEmoji(emoji) {
    document.getElementById('selectedEmoji').textContent = emoji;
}

// Function to toggle the visibility of the emoji list
function toggleEmojiList() {
    var emojiList = document.getElementById('emojiList');
    if (emojiList.style.display === 'none' || emojiList.style.display === '') {
        emojiList.style.display = 'block';
    } else {
        emojiList.style.display = 'none';
    }
}

// Function to close the emoji list
function closeEmojiList() {
    document.getElementById('emojiList').style.display = 'none';
}

// Add a click event listener for the circle to prevent the default behavior
document.getElementById('editableAvatar').addEventListener('click', function (e) {
    e.preventDefault();
});

// Add a click event listener for the emoji list to stop propagation
document.getElementById('emojiList').addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click event from reaching the document
});

// --------------------------------
// Setting Modal Functions
// Add this script to handle the selection of privacy options
$(document).ready(function () {
    // Handle click on privacy option
    $('.privacy-option').on('click', function () {
        // Clear selected class from all options
        $('.privacy-option').removeClass('selected');
        
        // Add selected class to the clicked option
        $(this).addClass('selected');

        // Update the selected value in the hidden radio input
        var selectedMode = $(this).data('mode');
        $('input[name="privacyMode"][value="' + selectedMode + '"]').prop('checked', true);
    });
});

// Add this script to handle the "Exit" dropdown option
$(document).ready(function () {
    // Handle click on the "Exit" dropdown option
    $('#exitOption').on('click', function () {
        // Redirect to the main index.html page
        window.location.href = 'index.html';
    });
});