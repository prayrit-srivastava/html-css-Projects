// Retrieve HTML elements
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDescInput = document.getElementById('task-desc');
const dueDateInput = document.getElementById('due-date');
const taskList = document.getElementById('task-list');

// Event listener for form submission
taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form input values
  const taskName = taskNameInput.value;
  const taskDesc = taskDescInput.value;
  const dueDate = dueDateInput.value;

  // Create task object
  const task = {
    name: taskName,
    description: taskDesc,
    dueDate: dueDate,
    completed: false
  };

  // Add task to the task list
  addTaskToList(task);

  // Clear input fields
  taskNameInput.value = '';
  taskDescInput.value = '';
  dueDateInput.value = '';
});

// Function to add a task to the task list
function addTaskToList(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
    <button class="complete-btn">Complete</button>
    <button class="delete-btn">Delete</button>
  `;
  
  // Event listeners for complete and delete buttons
  const completeBtn = li.querySelector('.complete-btn');
  completeBtn.addEventListener('click', function() {
    li.classList.toggle('completed');
    task.completed = !task.completed;
  });

  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', function() {
    li.remove();
  });

  // Append the task to the task list
  taskList.appendChild(li);
}
