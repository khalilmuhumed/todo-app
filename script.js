// Ota tarvittavat elementit käyttöön
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

// Funktio, joka luo uuden tehtävän
function createTodoItem(task) {
  const li = document.createElement('li');
  li.textContent = task;

  // Lisää nappi tehtävän poistamiseksi
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Poista';
  removeButton.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });

  // Lisää nappi tehtävän merkitsemiseksi hoidetuksi
  const doneButton = document.createElement('button');
  doneButton.textContent = 'Merkitse hoidetuksi';
  doneButton.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  li.appendChild(doneButton);
  li.appendChild(removeButton);
  todoList.appendChild(li);
}

// Funktio, joka tallentaa tehtävät localStorageen
function saveTodos() {
  const todos = [];
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    todos.push(item.textContent.replace('Merkitse hoidetuksiPoista', '').trim());
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Funktio, joka lataa tehtävät localStoragesta
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(task => {
    createTodoItem(task);
  });
}

// Tapahtuma, joka käsittelee lomakkeen lähettämistä
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();

  // Tarkista, että kenttä ei ole tyhjä ja että tehtävä on tarpeeksi pitkä
  if (task === '') {
    errorMessage.textContent = 'Tehtävä ei voi olla tyhjä!';
    todoInput.classList.add('error');
  } else if (task.length < 3) {
    errorMessage.textContent = 'Tehtävän on oltava vähintään 3 merkkiä pitkä!';
    todoInput.classList.add('error');
  } else {
    errorMessage.textContent = '';
    todoInput.classList.remove('error');
    createTodoItem(task);
    saveTodos();
  }

  todoInput.value = ''; // Tyhjennä kenttä
});

// Lataa aiemmat tehtävät
loadTodos();

// Lisää alla oleva koodi, jos haluat näyttää vain aktiiviset tehtävät
const filterButtons = document.querySelectorAll('.filter');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterTasks(filter);
  });
});

function filterTasks(filter) {
  const tasks = document.querySelectorAll('li');
  tasks.forEach(task => {
    if (filter === 'all' || (filter === 'done' && task.classList.contains('done')) || (filter === 'active' && !task.classList.contains('done'))) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
