import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { SVGProps, useState } from "react";
import { Task } from "../types"; // Importa el tipo Task para usar en las props
import { JSX } from "react/jsx-runtime"; // Importa JSX para el uso de JSX
import toast from "react-hot-toast"; // Importa toast para mostrar notificaciones

// Define las propiedades que espera recibir el componente
interface TaskModalProps {
  onAddTask: (task: Omit<Task, "completed">) => void; // Función para agregar una nueva tarea
}

// Componente principal para el modal de tareas
export default function TaskModal({ onAddTask }: TaskModalProps) {
  // Control de estado para el modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Estados para el nombre y la descripción de la tarea
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  // Icono para agregar tarea
  const TaskAdd01Icon = (
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
  ) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#000000"}
      fill={"none"}
      {...props}
    >
      {/* Definición del SVG para el icono */}
      <path
        d="M18 15L18 22M21.5 18.5L14.5 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 16H11M7 11H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 3.5C4.9442 3.54667 4.01661 3.71984 3.37477 4.36227C2.49609 5.24177 2.49609 6.6573 2.49609 9.48836L2.49609 15.9944C2.49609 18.8255 2.49609 20.241 3.37477 21.1205C4.25345 22 5.66767 22 8.49609 22H11.5M15.4922 3.5C17.048 3.54667 17.9756 3.71984 18.6174 4.36228C19.4961 5.24177 19.4961 6.6573 19.4961 9.48836V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.49609 3.75C6.49609 2.7835 7.2796 2 8.24609 2H13.7461C14.7126 2 15.4961 2.7835 15.4961 3.75C15.4961 4.7165 14.7126 5.5 13.7461 5.5H8.24609C7.2796 5.5 6.49609 4.7165 6.49609 3.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Manejo de la adición de una nueva tarea
  const handleAddTask = () => {
    // Validación para asegurarse de que los campos no están vacíos
    if (!taskName || !taskDescription) {
      toast.error("Por favor completa todos los campos.",{
        style:{
          borderRadius:'10px',
          backgroundColor:'rgb(220 38 38)',
          color:'white',
          fontSize:'16px',
          fontWeight:'bold',
          padding:'10px',
        }
      });
      return; // Si hay un error, salimos de la función
    }

    setError(""); // Resetea el error
    // Llama a la función para agregar la tarea
    onAddTask({ name: taskName, description: taskDescription });
    // Limpia los campos de entrada
    setTaskName("");
    setTaskDescription("");
    onClose(); // Cierra el modal
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <Button
        variant="bordered"
        color="success"
        onPress={onOpen}
        className="text-lg"
      >
        Nueva Tarea
        <TaskAdd01Icon className="text-white" /> {/* Muestra el icono */}
      </Button>

      {/* Modal para agregar una nueva tarea */}
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="text-white bg-black bg-opacity-70">
          <ModalHeader className="flex flex-col gap-1">
            <h1 className="text-3xl">To do List</h1>
          </ModalHeader>
          <ModalBody>
            {error && <div className="mb-4 text-red-500">{error}</div>} {/* Muestra un mensaje de error si existe */}
            <div className="flex flex-col w-full gap-4">
              <Input
                type="text"
                label="Nombre de la Tarea" // Etiqueta para el campo
                variant="bordered"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)} // Actualiza el estado con el valor del campo
                isRequired // Indica que el campo es obligatorio
              />
              <Textarea
                label="Descripción de la Tarea" // Etiqueta para el campo
                className="w-full"
                variant="bordered"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)} // Actualiza el estado con el valor del campo
                isRequired // Indica que el campo es obligatorio
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {/* Botón para cerrar el modal */}
            <Button color="danger" variant="bordered" onPress={onClose}>
              Cerrar
            </Button>
            {/* Botón para agregar la tarea */}
            <Button
              color="success"
              variant="bordered"
              onPress={() => {
                handleAddTask(); // Llama a la función para agregar la tarea
              }}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
