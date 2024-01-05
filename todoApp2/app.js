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
