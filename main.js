// -------------------------------------------------
// index.html

// Redirect Login page
document.getElementById('loginButton').addEventListener('click', function() {
    // Redirect to login.html
    window.location.href = 'login.html';
});


// redirect to Signup page
document.getElementById('signupButton').addEventListener('click', function() {
    // Redirect to login.html
    window.location.href = 'signup.html';
});

// Loading SVG icons
function loadIcon(iconName) {
    const iconElement = document.getElementById(`${iconName.replace('.svg', '-icon')}`);
    iconElement.src = `svg-icons/${iconName}`;
}