document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const listSelect = document.getElementById('list-select');
    const taskDue = document.getElementById('task-due');
    const taskList = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item' + (task.completed ? ' completed' : '');
  
        taskDiv.innerHTML = `
          <div>
            <strong>${task.text}</strong><br/>
            <small>List: ${task.list}</small><br/>
            <small>Due: ${task.due || 'Not set'}</small>
          </div>
          <div>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(taskDiv);
      });
    }
  
    window.toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    window.editTask = (index) => {
      const newText = prompt("Edit your task:", tasks[index].text);
      if (newText !== null) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    };
  
    window.deleteTask = (index) => {
      if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      const selectedList = listSelect.value;
      const dueDate = taskDue.value;
  
      if (taskText === '') return;
  
      tasks.push({
        text: taskText,
        list: selectedList,
        due: dueDate,
        completed: false
      });
  
      taskInput.value = '';
      taskDue.value = '';
      saveTasks();
      renderTasks();
    });
  
    renderTasks();
  });