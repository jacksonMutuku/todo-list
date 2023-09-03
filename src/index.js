
import { loadPage } from "./loadPage";
import projectManager from "./projectManager";
import domManager from './domManager';
import './index.css';


document.addEventListener('DOMContentLoaded', () => {
    loadPage();
});


domManager.displayProjects();

const newProject = projectManager.createProject('New Project');
const newTodo = {
  title: 'Sample Todo',
  description: 'This is a sample todo.',
  dueDate: '2023-09-15',
  priority: 'Medium',
  notes: ['Remember to buy groceries.'],
};
projectManager.createTodo(1, newTodo); 

console.log(newTodo)


