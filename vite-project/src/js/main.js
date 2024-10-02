const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


tasks.forEach(task => addTaskToDOM(task));


addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = { text: taskText, completed: false };
    tasks.push(task);
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = '';
  }
});


function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'flex justify-between items-center p-2 border-b border-gray-200 cursor-pointer';
  
  const taskText = document.createElement('span');
  taskText.className = `flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`;
  taskText.textContent = task.text;
  
  taskText.addEventListener('click', () => {
    task.completed = !task.completed;
    taskText.classList.toggle('line-through');
    taskText.classList.toggle('text-gray-500');
    saveTasks();
  });
  
  const editBtn = document.createElement('button');
  editBtn.className = 'bg-yellow-400 text-white px-2 py-1 rounded mr-2';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editTask(task, taskText));
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'bg-red-500 text-white px-2 py-1 rounded';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(task, li));
  
  li.appendChild(taskText);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  
  taskList.appendChild(li);
}

function editTask(task, taskTextElement) {
  const newText = prompt('Edit task:', task.text);
  if (newText !== null && newText.trim() !== '') {
    task.text = newText.trim();
    taskTextElement.textContent = task.text;
    saveTasks();
  }
}

function deleteTask(task, taskElement) {
  tasks = tasks.filter(t => t !== task);
  taskElement.remove();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}