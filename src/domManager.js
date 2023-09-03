import projectManager from './projectManager';

// Module for DOM interactions
const domManager = (() => {
  const projectList = document.getElementById('project-list');
  const todoList = document.getElementById('todo-list');
  const todoDetailsContainer = document.getElementById('todo-details');

  const displayProjects = () => {
    projectList.innerHTML = '';
    projectManager.projects.forEach((project, index) => {
      const projectItem = document.createElement('li');
      projectItem.textContent = project.name;
      projectItem.addEventListener('click', () => displayTodos(index));
      projectList.appendChild(projectItem);
    });
  };

  const displayTodos = (projectIndex) => {
    todoList.innerHTML = '';
    projectManager.projects[projectIndex].todos.forEach((todo, todoIndex) => {
      const todoItem = document.createElement('li');
      todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
      todoItem.addEventListener('click', () => expandTodoDetails(todo, projectIndex, todoIndex));
      todoList.appendChild(todoItem);
    });
  };

  const expandTodoDetails = (todo, projectIndex, todoIndex) => {
    todoDetailsContainer.innerHTML = '';
    const detailsHeading = document.createElement('h2');
    detailsHeading.textContent = 'Todo Details';
    todoDetailsContainer.appendChild(detailsHeading);

    // Create and display todo details
    const detailsList = document.createElement('ul');
    detailsList.innerHTML = `
      <li><strong>Title:</strong> ${todo.title}</li>
      <li><strong>Description:</strong> ${todo.description}</li>
      <li><strong>Due Date:</strong> ${todo.dueDate}</li>
      <li><strong>Priority:</strong> ${todo.priority}</li>
      <li><strong>Notes:</strong> ${todo.notes.join(', ')}</li>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Todo';
    deleteButton.addEventListener('click', () => deleteTodoFromProject(projectIndex, todoIndex));

    detailsList.appendChild(deleteButton);
    todoDetailsContainer.appendChild(detailsList);
  };

   const updateUI = () => {
    displayProjects();
  };

  projectManager.addChangeListener(updateUI);

  return {
    displayProjects,
    displayTodos,
    expandTodoDetails,
  };
})();

export default domManager;
