import projectManager from "./projectManager";
import domManager from "./domManager";
import './index.css';

export function loadPage() {
    const selectElement = document.getElementById('selectElement');
    const mainContent = document.getElementById('content')
    const todoForm = document.getElementById('todoForm')
    const addButton = document.getElementById('addButton')
    const projectForm = document.getElementById('projectForm')

    
    const projectDropdown = document.getElementById('projectSelection');
    
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page
        const projectName = projectInput.value.trim();
        if (projectName !== '') {
            const newProject = projectManager.createProject(projectName);
            // Optionally, you can clear the input field or perform other actions here
            console.log(`Created new project: ${newProject.name}`);
            
            // After creating a new project, update the project selection dropdown
            updateProjectDropdown();

            saveProjectsToLocalStorage();
            
            // Display the projects
            domManager.displayProjects();
        }
    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const todoTitle = titleInput.value.trim();
        const todoDescription = descriptionInput.value.trim();
        const todoPriority = selectElement.value;
        const todoDueDate = dueDateInput.value;
        const todoNotes = notesInput.value.trim();

        if (todoTitle !== '') {
            const newTodo = {
                title: todoTitle,
                description: todoDescription,
                dueDate: todoDueDate,
                priority: todoPriority,
                notes: todoNotes !== '' ? todoNotes.split(', ') : [],
            };
            
            // Get the selected project index from the dropdown
            const selectedProjectIndex = projectDropdown.selectedIndex;
            
            projectManager.createTodo(selectedProjectIndex, newTodo);

            saveProjectsToLocalStorage();
            
            console.log(`Created new todo: ${newTodo.title}`);
            
            // Display the todos for the selected project
            domManager.displayTodos(selectedProjectIndex);
        }
    });

    updateProjectDropdown();
    loadProjectsFromLocalStorage();
    
    // todoForm.appendChild(selectElement);
    mainContent.appendChild(todoForm);

    // Function to update the project selection dropdown
    function updateProjectDropdown() {
        // Clear existing options
        projectDropdown.innerHTML = '';

        // Get the updated list of projects
        const projects = projectManager.projects;

        
        projects.forEach((project, index) => {
            const option = document.createElement('option');
            option.value = index; 
            option.textContent = project.name; 
            projectDropdown.appendChild(option);
        });

    
        projectDropdown.selectedIndex = 0;
    }
    function saveProjectsToLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(projectManager.projects));
    }

    function loadProjectsFromLocalStorage() {
        const savedProjects = JSON.parse(localStorage.getItem('projects'));
        if (savedProjects) {
            projectManager.projects = savedProjects;
            domManager.displayProjects();
        }
    }
}


window.addEventListener('load', loadPage);