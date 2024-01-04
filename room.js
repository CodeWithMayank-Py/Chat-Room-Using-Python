// Add this to your JavaScript file
function toggleSettingMenu() {
    var settingDropdown = document.getElementById("settingDropdown");
    settingDropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.closest('.setting-btn')) {
        var dropdowns = document.getElementsByClassName("setting-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function showSettingContent(contentType) {
    // Implement logic to show the corresponding setting content based on contentType (e.g., Info, Settings)
    console.log('Showing ' + contentType + ' content');
}

function exitRoom() {
    // Implement logic to exit the room
    console.log('Exiting room');
}

// ----------------------------------------------------
// Body Sliding part
function toggleSlidableArea() {
    var slidableArea = document.getElementById("slidableArea");
    slidableArea.classList.toggle("show");
}
