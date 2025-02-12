const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");
const uncheckButton = document.getElementById("uncheck-all");

let allTodos = getTodos();
updateTodoList();

const quotes = [
  "Believe in yourself and all that you are.",
  "Success is not final, failure is not fatal.",
  "Do what you can, with what you have, where you are.",
  "Opportunities don't happen, you create them.",
  "Don't watch the clock; do what it does. Keep going.",
  "It's not how good you are, it's how bad you want it.",
  "You only live once, but if you do it right, once is enough.",
  "Insanity is doing the same thing, over and over again, but expecting different results.",
  "Tough times don't last, tough people do.",
  "Every accomplishment starts with the decision to try.",
  "The vast majority of us are slaves to our minds. Most don’t even make the first effort when it comes to mastering their thought process because it’s a never-ending chore and impossible to get right every time.",
  "From the time you take your first breath, you become eligible to die. You also become eligible to find your greatness and become the one warrior.",
  "You want to be uncommon amongst uncommon people. Period.",
  "I don’t stop when I’m tired, I stop when I’m done.",
  "You may lose the battle of the morning but don’t lose the war of the day.",
  "No one prepares for battle on the day it begins.",
  "Don't covet what you lack. Building plans on elusive desires sets you up for downfall.",
  "Lose focus, and you lose interest. No focus means no interest. To achieve something you truly desire, keep it top of mind.",
  "Deconstruct, self-correct, eliminate barriers, and practice relentlessly.",
  "It will happen whether you want it or not, so make up your mind and embrace the change.",
  "Life isn't a game of dice where outcomes rely on coincidence; it's a game of chess where one wrong move concludes the end.",
  "When it rains, the unprepared blame the weather; the accountable prepare their umbrella.",
  "If nothing changes, nothing changes. If you want change, make some.",
  "If you always do what you've always done, you'll always get what you've always got.",
  "Either you run the day, or the day runs you.",
  "Once you start, keep going until it's done.",
  "A disciplined mentality, a calm mind, and a fit body cannot be bought; they must be earned.",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length); // Pick a random index
  return quotes[randomIndex]; // Return the random quote
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(
    ".quote"
  ).innerHTML = `&#x201C;<i>${getRandomQuote()}</i>&#x201D;`;
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

document.getElementById("uncheck-all").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    ".todo-list input[type='checkbox']"
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  allTodos.forEach((todo) => {
    todo.completed = false;
  });
  saveTodos();
});

document.addEventListener("DOMContentLoaded", () => {
  const hand = document.getElementById("hand");
  let angle = 15; // Initial angle
  let direction = 1; // 1 for right, -1 for left

  function waveHand() {
    angle = direction * 15; // Toggle between 15 and -15
    hand.style.transform = `rotate(${angle}deg)`;
    direction *= -1; // Reverse direction
  }

  // Start waving immediately
  waveHand();

  // Run the wave animation every 300ms
  setInterval(waveHand, 300);
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}
function updateTodoList() {
  todoListUl.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUl.append(todoItem);
  });
  toggleUncheckButton();
}
function createTodoItem(todo, todoIndex) {
  const todoId = `todo-${todoIndex}`;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}" />
          <label for="${todoId}" class="custom-checkbox">
            <svg
              fill="transparent"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoId}" class="todo-text">
            ${todoText}
          </label>
          <button type="button" aria-label="Delete" class="delete-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
    `;
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}
function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}
function saveTodos() {
  const todosJson = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJson);
}
function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
function toggleUncheckButton() {
  const checkboxes = document.querySelectorAll(
    ".todo-list input[type='checkbox']"
  );

  if (checkboxes.length > 1) {
    uncheckButton.style.display = "block";
  } else {
    uncheckButton.style.display = "none";
  }
}
