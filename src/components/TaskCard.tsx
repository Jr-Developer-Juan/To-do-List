import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button, Skeleton } from "@nextui-org/react";
import toast from "react-hot-toast";
import { fetchTasks } from '../lib/api'; // Importa la función para obtener tareas de la API

const TaskCard = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Estado para almacenar las tareas
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar la carga

  // Función para obtener tareas de la API
  const handleFetchTasks = async () => {
    setLoading(true); // Inicia la carga
    try {
      // Simulando un retraso adicional en la carga
      await new Promise(resolve => setTimeout(resolve, 2000)); // Añadir un delay de 2 segundos
      const fetchedTasks = await fetchTasks(); // Llama a la función para obtener las tareas
      setTasks(fetchedTasks); // Actualiza el estado con las tareas obtenidas
      toast.success("Tareas Obtenidas con Éxito!", { // Muestra un mensaje de éxito
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
    } catch (error) {
      toast.error("No se pudieron obtener las tareas.", { // Muestra un mensaje de error
        style: {
          borderRadius: '10px',
          backgroundColor: 'rgb(220 38 38)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '10px',
        }
      });
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // Función para alternar el estado de completado de una tarea
  const toggleTaskCompletion = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <Card className="max-w-[1000px]"> {/* Tarjeta para mostrar las tareas */}
        <CardHeader className="flex items-center justify-between gap-3"> {/* Encabezado de la tarjeta */}
          <div className="flex flex-col">
            <p className="text-md">Obtener Tareas de la API</p> {/* Título de la sección */}
            <p className="text-small text-default-500">@JsonPlaceholder</p> {/* Fuente de las tareas */}
          </div>
          <Button onClick={handleFetchTasks} variant="bordered" color="success" className="cursor-pointer">
            Obtener Tareas {/* Botón para obtener las tareas */}
          </Button>
        </CardHeader>
        <Divider /> {/* Separador entre el encabezado y el cuerpo */}
        <CardBody>
          {loading ? ( // Condicional para mostrar un estado de carga
            <div className="space-y-2">
              {/* Esqueletos que simulan la carga de datos */}
              <Skeleton className="rounded-xl">
                <div className="w-2/5 h-8 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <div className="w-2/5 h-8 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <div className="w-2/5 h-8 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="rounded-xl">
                <div className="w-2/5 h-8 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          ) : tasks.length > 0 ? ( // Condicional para mostrar las tareas si hay alguna
            <ul>
              {tasks.map((task) => ( // Mapeo de las tareas para generar elementos de lista
                <div key={task.id}>
                  <li className="flex items-center justify-between py-2">
                    <span className={task.completed ? 'line-through' : ''}> {/* Estilo para tareas completadas */}
                      {task.title} {/* Título de la tarea */}
                    </span>
                    <Button 
                      onClick={() => toggleTaskCompletion(task.id)} // Maneja el clic en el botón
                      variant="bordered" 
                      color="success"
                    >
                      {task.completed ? 'Completada' : 'No completada'} {/* Estado de la tarea */}
                    </Button>
                  </li>
                  <Divider /> {/* Separador entre tareas */}
                </div>
              ))}
            </ul>
          ) : (
            <p>Presiona el botón para obtener tareas.</p> // Mensaje si no hay tareas
          )}
        </CardBody>
        <Divider /> {/* Separador antes del pie de la tarjeta */}
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/Jr-Developer-Juan"
          >
            Visita mi perfil de Github. {/* Enlace al código fuente */}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TaskCard; // Exporta el componente para su uso en otras partes de la aplicación
