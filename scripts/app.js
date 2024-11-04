function saveTask() {
    console.log("save task fn")
    // get the values
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    let taskToSave = new Task(title, desc, color, date, status, budget)
    console.log(taskToSave);
    // displayTask(taskToSave);
    // save to server (POST)
    $.ajax({
    type: "POST",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(taskToSave),
    contentType:"application/json",
    success: function(response){
        console.log(response);
    },
    error: function(error)
    {
        console.log(error);
    }
    })
    //display the task (GET)
}
function loadTask(){
    // create the logic of the ajax, but for the get 
    $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/api/tasks",
    success: function(response){
        let data = JSON.parse(response);//convert from JSON into objects
        console.log(data);
        //create the logic to show only the messages that match
        // with your name
        //hint
        for(let i=0;i<data.length;i++)
        {
        let task = data[i];
        if(task.name == "Adrian52")
        {
            console.log(task);
            displayTask(task);
        }
        }
    },
    error: function(error){
        console.log(error)
    }
    })
}
function displayTask(taskToSave) {
    let syntax = ` 
    <div class="task-container" style="border-color:${taskToSave.color}">
        <div class="task">
        <div class="info">
            <h5>${taskToSave.title}</h5>
            <p>${taskToSave.description}</p>
        </div>
        
        <div class="status">${taskToSave.status}</div>
        <div class="date-budget">
            <span>${taskToSave.date}</span>
            <span>${taskToSave.budget}</span>
        </div>
        </div>
    </div>
    `
    $("#list").append(syntax)
}
function testRequest()
{
    $.ajax({
    type: "get", 
    url:"http://fsdiapi.azurewebsites.net",
    success: function(response){
        console.log(response);
    },
    error: function(error){
        console.log(error);
    }
    })
}
function init() {
    console.log("init");
    $("#btnSave").click(saveTask);
    loadTask();
}
window.onload = init;
