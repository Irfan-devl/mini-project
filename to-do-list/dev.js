document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector(".search button");
    const taskInput = document.querySelector(".in");
    const uncompletedTaskList = document.querySelector(".unl");

    // Load tasks from local storage on page load
    loadTasks();

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        const listItem = createListItem(taskText);
        uncompletedTaskList.appendChild(listItem);
        saveTasks();
        taskInput.value = "";
    }

    function createListItem(taskText, isCompleted = false) {
        const listItem = document.createElement("li");
        listItem.className = isCompleted ? "lis completed" : "lis";

        const taskParagraph = document.createElement("p");
        taskParagraph.className = "para";
        taskParagraph.innerText = taskText;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "but";

        const completeButton = document.createElement("button");
        completeButton.className = "comp";
        completeButton.innerText = isCompleted ? "Uncompleted" : "Completed";
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            completeButton.innerText = listItem.classList.contains('completed') ? "Uncompleted" : "Completed";
            saveTasks();
        });

        const removeButton = document.createElement("button");
        removeButton.className = "rem";
        removeButton.innerText = "Remove";
        removeButton.addEventListener('click', () => {
            listItem.remove();
            saveTasks();
        });

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(removeButton);

        listItem.appendChild(taskParagraph);
        listItem.appendChild(buttonContainer);

        return listItem;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.lis').forEach(item => {
            const taskText = item.querySelector('.para').innerText;
            const isCompleted = item.classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const listItem = createListItem(task.text, task.completed);
                uncompletedTaskList.appendChild(listItem);
            });
        }
    }
});