var addButton = document.getElementById("addbttn");
var toDoEntryBox = document.getElementById("inputan");
var toDoList = document.getElementById("listnya");
addButton.addEventListener("click", addToDoItem);

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText)

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function addToDoItem(event) {
    event.preventDefault(); // Tambahkan ini untuk mencegah perilaku default formulir
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

function toggleToDoItemState(event) {
    var clickedItem = event.target;
    if (clickedItem.tagName === 'LI') {
        clickedItem.classList.toggle("completed");
    }
}

function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
};

function saveList() {
    var toDos = [];
    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);
        var toDoItemInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoItemInfo);
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
    console.log("masuk kesini ya")
}


function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList()