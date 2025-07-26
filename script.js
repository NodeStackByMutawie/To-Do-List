// Get references to the input, add button, and the list container
let inputBox = document.getElementById("input-box");
let addBtn = document.getElementById("addBtn");
let listContainer = document.getElementById("list-container");

// Add a new task when the add button is clicked
addBtn.addEventListener("click", function () {
    // Check if input is empty
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new <li> element for the task
        let li = document.createElement("li");
        li.textContent = inputBox.value;           // Set the text
        li.classList.add("task-item");             // Add a CSS class
        listContainer.appendChild(li);             // Add to the task list

        // Create a delete button with an image inside
        let deleteBtn = document.createElement("button");
        let img = document.createElement("img");
        img.classList.add("delete-icon");          // For styling the icon
        img.src = 'images/delete-icon.png';        // Path to delete icon image
        img.alt = "delete";

        // Put the image inside the button and add button to the task
        deleteBtn.appendChild(img);
        li.appendChild(deleteBtn);

        // Add click event to delete the task when the button is clicked
        deleteBtn.addEventListener("click", function () {
            li.remove();                           // Remove the task
        });
    }

    inputBox.value = ""; // Clear the input field after adding the task
});

// Handle click events inside the task list (event delegation)
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Toggle the 'checked' class to mark task as done or not
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "IMG" && e.target.classList.contains("delete-icon")) {
        // If the clicked element is the delete icon, remove the parent <li>
        e.target.closest("li").remove();
        saveData();
    }
});

// Save the current task list to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load tasks from localStorage when the page loads
function showTask() {
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    }
}

showTask(); // Call the function to show tasks on page load
