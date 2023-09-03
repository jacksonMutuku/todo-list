// projectManager.js
const projectManager = (() => {
  const projects = [
    { name: 'Default Project', todos: [] },
  ];

  const changeListeners = []; 

  const addChangeListener = (listener) => {
    changeListeners.push(listener);
  };

  const notifyChangeListeners = () => {
    for (const listener of changeListeners) {
      listener(); 
    }
  };

  const createProject = (name) => {
    const newProject = { name, todos: [] };
    projects.push(newProject);
    notifyChangeListeners(); 
    return newProject;
  };

  const createTodo = (projectIndex, todo) => {
    projects[projectIndex].todos.push(todo);
    notifyChangeListeners(); 
  };

  const deleteTodo = (projectIndex, todoIndex) => {
    projects[projectIndex].todos.splice(todoIndex, 1);
    notifyChangeListeners(); 
  };

  

  return {
    projects,
    createProject,
    createTodo,
    deleteTodo,
    addChangeListener, 
  };
})();

export default projectManager;
