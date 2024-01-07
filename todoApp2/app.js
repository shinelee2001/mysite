/* ------------- */
/* drag and drop */
/* ------------- */
const todos = document.querySelectorAll('.todo');
const all_status = document.querySelectorAll('.status');

// dragables
let dragableTodo = null;

function dragStart() {
  dragableTodo = this;
}

function dragEnd() {
  dragableTodo = this;
}

todos.forEach((todo) => {
  todo.addEventListener('dragstart', dragStart);
  todo.addEventListener('dragend', dragEnd);
});

// status
function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = '1px dashed #ccc';
}

function dragLeave() {
  this.style.border = 'none';
}

function dragDrop() {
  this.style.border = 'none';
  this.appendChild(dragableTodo);
}

all_status.forEach((status) => {
  status.addEventListener('dragover', dragOver);
  status.addEventListener('dragenter', dragEnter);
  status.addEventListener('dragleave', dragLeave);
  status.addEventListener('drop', dragDrop);
});

/* ------------- */
/* modal control */
/* ------------- */
const modal = document.getElementById('addModal');
const openModal = document.getElementById('add_btn');
const closeBtn = document.getElementsByClassName('modalCloseBtn')[0];

openModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

/* ------------------- */
/* add todo from modal */
/* ------------------- */
const todo_submit = document.getElementById('todo_submit');

function createTodo() {
  const todo_div = document.createElement('div');
  const input_val = document.getElementById('todo_input').value;
  const txt = document.createTextNode(input_val);
  todo_div.classList.add('todo');
  todo_div.setAttribute('draggable', 'true');
  todo_div.appendChild(txt);

  const closeBtn = document.createElement('span');
  const closeTxt = document.createTextNode('\u00D7');
  closeBtn.classList.add('close');
  closeBtn.appendChild(closeTxt);

  closeBtn.addEventListener('click', () => {
    closeBtn.parentElement.style.display = 'none';
  });

  todo_div.appendChild(closeBtn);
  todo_div.addEventListener('dragstart', dragStart);
  todo_div.addEventListener('dragend', dragEnd);

  notStarted.appendChild(todo_div);
  modal.style.display = 'none';

  document.getElementById('todo_input').value = '';
}

todo_submit.addEventListener('click', createTodo);

/* ---------------------- */
/* remove todo from board */
/* ---------------------- */
const closeTodo = document.querySelectorAll('.close');

closeTodo.forEach((close) => {
  close.addEventListener('click', () => {
    close.parentElement.style.display = 'none';
  });
});
