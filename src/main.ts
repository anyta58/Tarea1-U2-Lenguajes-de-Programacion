const params = new URLSearchParams(window.location.search);
const app = params.get('app');

if (app === 'inventory') {
    import('./inventory').then(module => {
        // Opcional: puedes inicializar algo del módulo si es necesario
        console.log('Gestión de Inventario cargada');
    }).catch(err => {
        console.error('Error al cargar el módulo de inventario:', err);
    });
} else if (app === 'tasks') {
    import('./todo').then(module => {
        // Opcional: puedes inicializar algo del módulo si es necesario
        console.log('Gestión de Tareas cargada');
    }).catch(err => {
        console.error('Error al cargar el módulo de tareas:', err);
    });
} else {
    console.error('No se ha seleccionado ninguna aplicación');
}
