import { useState } from "react";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

//gerador de ID sequencial
let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

//estrutura de uma tarefa
// const task = {
//   id: 0,
//   title: "Nova Tarefa",
//   status: "Pendente"
// };

export default function App() {
  const [tasks, setTasks] = useState([]);

  //função que cria uma tarefa
  const addTask = (title, state) => {
    const newTask = {
      id: generateId(),
      title,
      state
    };

    //clonando array com destruct, adicionando a nova tarefa e alterando o state
    setTasks((existingTasks) => [...existingTasks, newTask]);
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      //itera pelas tasks existentes
      return existingTasks.map((task) => {
        //se encontrar a task com o id que foi passado
        if (task.id === id) {
          //pega tudo da task e atualiza o title e o state
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  //retorna as tasks diferente da task com o id passado
  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
