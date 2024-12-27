const initialTodos = {
  tasks: [],
  completedTasks: [],
};

const todos = JSON.parse(localStorage.getItem("todos")) || initialTodos;

const input = document.getElementById("input");
const tasksList = document.getElementById("tasks");
const completedTasksList = document.getElementById("completed-tasks");
const tasksCounter = document.getElementById("tasks-counter");
const completedCounter = document.getElementById("completed-counter");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  if (input.value === "") {
    alert("You must write something!");
  } else {
    const text = input.value.trim();

    if (text.length > 100) {
      alert("Task is too long! Maximum 100 characters.");
    } else if (todos.tasks.includes(text)) {
      alert("This task already exists!");
    } else {
      todos.tasks.push(text);

      localStorage.setItem("todos", JSON.stringify(todos));

      input.value = "";
      input.focus();

      renderTodos();
    }
  }
}

function renderTodos() {
  // Clear tasks list
  tasksList.innerHTML = "";
  completedTasksList.innerHTML = "";

  // Fragments for tasks and completed tasks
  const tasksFragment = document.createDocumentFragment();
  const completedTasksFragment = document.createDocumentFragment();

  todos.tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list__item";

    // Task text
    const p = document.createElement("p");
    p.textContent = task;

    const buttonContainer = document.createElement("div");

    // Check button
    const checkButton = document.createElement("button");
    checkButton.className = "list__button list__button--check button";
    const checkIcon = document.createElement("img");
    checkIcon.src = "assets/images/check.svg";
    checkIcon.alt = "Check todo";
    checkButton.appendChild(checkIcon);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.className = "list__button list__button--trash button";
    const trashIcon = document.createElement("img");
    trashIcon.src = "assets/images/trash.svg";
    trashIcon.alt = "Delete todo";
    trashButton.appendChild(trashIcon);

    checkButton.addEventListener("click", () => checkTodo(index));
    trashButton.addEventListener("click", () => removeTodo(index));

    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(trashButton);
    li.appendChild(p);
    li.appendChild(buttonContainer);

    tasksFragment.appendChild(li);
  });

  todos.completedTasks.forEach((completedTask, index) => {
    const li = document.createElement("li");
    li.className = "list__item";

    const p = document.createElement("p");
    p.textContent = completedTask;

    const buttonContainer = document.createElement("div");

    // Return button
    const returnButton = document.createElement("button");
    returnButton.className = "list__button list__button--return button";
    const returnIcon = document.createElement("img");
    returnIcon.src = "assets/images/return.svg";
    returnIcon.alt = "Return task";
    returnButton.appendChild(returnIcon);

    returnButton.addEventListener("click", () => returnTodo(index));

    buttonContainer.appendChild(returnButton);

    li.appendChild(p);
    li.appendChild(buttonContainer);

    completedTasksFragment.appendChild(li);
  });

  tasksList.appendChild(tasksFragment);
  completedTasksList.appendChild(completedTasksFragment);

  updateCounters();
}

function removeTodo(index) {
  todos.tasks.splice(index, 1);

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
}

function checkTodo(index) {
  const completedTodo = todos.tasks.splice(index, 1);
  todos.completedTasks.push(...completedTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
}

function returnTodo(index) {
  const returnedTodo = todos.completedTasks.splice(index, 1);
  todos.tasks.push(...returnedTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos();
}

function updateCounters() {
  tasksCounter.textContent = "Tasks to do - " + todos.tasks.length;
  completedCounter.textContent = "Done - " + todos.completedTasks.length;
}

renderTodos();
