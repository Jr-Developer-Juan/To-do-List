// Función para obtener tareas desde la API
export const fetchTasks = async () => {
  try {
    // Realiza una solicitud a la API para obtener tareas, limitando el resultado a 4 tareas
    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=4"); // Limitar a 4 tareas como ejemplo
    // Verifica si la respuesta de la API es exitosa
    if (!response.ok) throw new Error("Error al obtener las tareas."); // Lanza un error si la respuesta no es ok
    // Convierte la respuesta en formato JSON y la retorna
    return await response.json();
  } catch (error) {
    console.error("Error en la función fetchTasks:", error); // Muestra el error en la consola
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};
