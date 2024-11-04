import { useState } from "react";
import TaskList from './components/TaskList';
import TaskModal from "./components/TaskModal";
import { Task } from './types';
import { Toaster, toast } from "react-hot-toast";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]); // Estado para almacenar las tareas

  // Maneja la adición de una nueva tarea
  const handleAddTask = (task: Omit<Task, "completed">) => {  
    setTasks([...tasks, { ...task, completed: false }]);
    toast.success("Tarea agregada correctamente!", { // Notificación de éxito
      duration: 4000,
      style: {
        backgroundColor: "#222",
        color: "#ffffff",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });
  };

  // Maneja la eliminación de una tarea
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filtra la tarea a eliminar
    setTasks(updatedTasks); // Actualiza el estado
    toast.success("Tarea Eliminada correctamente!", { // Notificación de éxito
      duration: 4000,
      style: {
        backgroundColor: "#222",
        color: "#ffffff",
        borderRadius: "10px",
        padding: "10px",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });
  };

  // Alterna el estado de completado de una tarea
  const handleToggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Actualiza el estado
  };

  return (
    <>
    <div className="w-full min-h-[100vh] flex justify-center flex-col items-center">
      <h1 className="mb-6 text-4xl font-orbitron">To do List</h1>
      <Toaster /> {/* Componente para notificaciones */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl p-4">
        <div className="flex justify-end w-full mb-4 sm:flex sm:w-full sm:justify-center">
          <TaskModal onAddTask={handleAddTask} /> {/* Modal para agregar tareas */}
        </div>
        <div className="flex flex-col w-full md:flex md:w-full md:items-center md:justify-center md:flex-col">
          <div className="order-2 w-full p-2 md:w-full md:order-1"> 
            <TaskList
              tasks={tasks} // Pasa las tareas al componente
              onDeleteTask={handleDeleteTask} // Función para eliminar tareas
              onToggleTask={handleToggleTask} // Función para alternar el estado de tareas
            />
           </div>
           <div className="order-1 w-full p-2 md:w-full md:order-2">
            <TaskCard /> {/* Tarjeta de tareas */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App; // Exporta el componente principal
