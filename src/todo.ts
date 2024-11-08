type Task = {
    id: number;
    name: string;
    priority: string;
    completed: boolean;
};

let tasks: Task[] = [];
let taskId = 0;

// Cargar tareas desde localStorage al iniciar
const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 0;
        displayTasks();
    }
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const priorityInput = document.getElementById("priorityInput") as HTMLSelectElement;
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    if (taskName) {
        const newTask: Task = { id: taskId++, name: taskName, priority: taskPriority, completed: false };
        tasks = [...tasks, newTask];
        taskInput.value = '';
        displayTasks();
        saveTasks();
    }
};

const displayTasks = () => {
    const taskList = document.getElementById("task-list");
    const taskSummary = document.getElementById("task-summary");

    taskList!.innerHTML = "<h2>Lista de Tareas:</h2>";
    tasks.forEach(task => {
        taskList!.innerHTML += `
            <p>
                <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? "checked" : ""}/>
                ${task.name} - Prioridad: ${task.priority}
                <button onclick="removeTask(${task.id})">Eliminar</button>
            </p>`;
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const priorityCount = tasks.reduce((count, task) => {
        count[task.priority] = (count[task.priority] || 0) + 1;
        return count;
    }, {} as { [key: string]: number });

    taskSummary!.innerHTML = `
        <h3>Resumen de Tareas</h3>
        <p>Total de Tareas: ${totalTasks}</p>
        <p>Completadas: ${completedTasks}</p>
        <p>Pendientes: ${pendingTasks}</p>
        <p>Prioridades:</p>
        <ul>${Object.entries(priorityCount).map(([priority, count]) => `<li>${priority}: ${count}</li>`).join('')}</ul>`;
};

const toggleTask = (taskId: number) => {
    tasks = tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task);
    displayTasks();
    saveTasks();
};

const removeTask = (taskId: number) => {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
    saveTasks();
};

// Inicializar las tareas cargadas desde localStorage
loadTasks();

(window as any).addTask = addTask;
(window as any).toggleTask = toggleTask;
(window as any).removeTask = removeTask;
