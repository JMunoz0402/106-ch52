// Function to save a task
function saveTask() {
    console.log("Saving task...");

    // Retrieve form values
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // Create a task object
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log("Task to save:", taskToSave);

    // Send POST request to save the task to the server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
            console.log("Task saved successfully:", response);
        },
        error: function(error) {
            console.error("Error saving task:", error);
        }
    });
}

// Function to load tasks from the server
function loadTask() {
    console.log("Loading tasks...");

    // Send GET request to retrieve tasks
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response) {
            const data = JSON.parse(response); // Convert JSON string to objects
            console.log("Tasks loaded:", data);

            // Display tasks that belong to the user "Jesus"
            data.forEach(task => {
                if (task.name === "Jesus") {
                    displayTask(task);
                }
            });
        },
        error: function(error) {
            console.error("Error loading tasks:", error);
        }
    });
}

// Function to display a task in the task list
function displayTask(task) {
    const taskHTML = `
        <div class="task-container" style="border-color: ${task.color}">
            <div class="task">
                <div class="info">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                </div>
                <div class="status">${task.status}</div>
                <div class="date-budget">
                    <span>${task.date}</span>
                    <span>$${task.budget}</span>
                </div>
            </div>
        </div>
    `;
    $("#list").append(taskHTML);
}

// Test function to ensure server connection
function testRequest() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net",
        success: function(response) {
            console.log("Server response:", response);
        },
        error: function(error) {
            console.error("Error testing request:", error);
        }
    });
}

// Initialization function to set up event listeners
function init() {
    console.log("Initializing...");

    // Bind click event to the Save button
    $("#btnSave").click(saveTask);

    // Load existing tasks on page load
    loadTask();
}

// Run init function when the page finishes loading
window.onload = init;

// Task class definition
class Task {
    constructor(title, description, color, date, status, budget) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.date = date;
        this.status = status;
        this.budget = budget;
        this.name = "Jesus"; // Replace this with dynamic user info if needed
    }
}
