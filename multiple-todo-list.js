// Array to store all the todo lists
let todoLists = [];
function createList() {
  const listNameInput = document.querySelector('.listName');
  const listName = listNameInput.value;

  if (listName) {
      const todoList = {
          name: listName,
          tasks: []
      };

      todoLists.push(todoList);
      listNameInput.value = "";

      renderTodoLists();
  }
}
function renderTodoLists(){
  const todoListsContainer = document.querySelector('.todoLists');
  todoListsContainer.innerHTML = "";

  todoLists.forEach((list,listIndex) => {
    const todoListDiv = document.createElement('div');
    todoListDiv.classList.add('todoList');

    const listNameHeading = document.createElement('h2');
    listNameHeading.textContent = list.name;
    const addTodoTaskDiv = document.createElement('div');
    addTodoTaskDiv.classList.add('addTodoTaskDiv');
    const taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.placeholder = 'Enter task name';
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'datetime-local';

    const addButton = document.createElement('button');
    addButton.classList.add('addButton');
    addButton.textContent = 'Add Task';

    const tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');

    addButton.addEventListener('click', () =>{
      const taskName = taskNameInput.value;
      const dueDate = dueDateInput.value;
      if(taskName && dueDate){
        const task = {
          name: taskName,
          dueDate: dueDate
        };
        list.tasks.push(task);
        renderTodoLists();
      }
    });

     list.tasks.forEach((task, taskIndex) =>{
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change',(event) =>{
        const nameElement = event.target.nextElementSibling;
        if(event.target.checked){
          nameElement.classList.add('completed');
         } else {
          nameElement.classList.remove('completed');
         }
      });
    
      const taskName = document.createElement('div');
      taskName.textContent = task.name;

      const dueDate = document.createElement('div');
      dueDate.textContent = task.dueDate;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('deleteButton');
      deleteButton.addEventListener('click', () => {
        list.tasks.splice(taskIndex, 1);
        renderTodoLists();
      });

      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskName);
      taskDiv.appendChild(dueDate);
      taskDiv.appendChild(deleteButton);
      tasksContainer.appendChild(taskDiv);

    });

    addTodoTaskDiv.appendChild(taskNameInput);
    addTodoTaskDiv.appendChild(dueDateInput);
    addTodoTaskDiv.appendChild(addButton);
   
  
    todoListDiv.appendChild(listNameHeading);
    todoListDiv.appendChild(addTodoTaskDiv);
    todoListDiv.appendChild(tasksContainer);
 /*  addTodoTaskDiv.appendChild(taskNameInput);
    addTodoTaskDiv.appendChild(dueDateInput);
    addTodoTaskDiv.appendChild(addButton);
    
    todoListDiv.appendChild(addTodoTaskDiv); 
    */
    
    
    todoListsContainer.appendChild(todoListDiv);

});
}

// Event listener for creating a new todo list
const createListButton = document.querySelector('.createListButton');
createListButton.addEventListener('click', createList);