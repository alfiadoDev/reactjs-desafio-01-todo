import { Header } from "./components/Header";

import { Header as HeaderList } from './components/list/Header'

import styles from './app.module.css'
import { PlusCircle } from "phosphor-react";

import clipboard from './assets/clipboard.png'
import { Item } from "./components/list/Item";
import { useState } from "react";

export interface ITask {
  id: number
  text: string
  isDone: boolean
}

export interface IToggleTask {
  id: number
  value: boolean
}

function App() {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskInputValue, setNewTaskInputValue] = useState('')

  function handleAddNewTask() {
    if (!newTaskInputValue) return

    const newTask = {
      id: new Date().getTime(),
      text: newTaskInputValue,
      isDone: false
    }

    setTasks(state => [...state, newTask])
    setNewTaskInputValue('')
  }

  function handleToggleTask({ id, value }: IToggleTask) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, isDone: value }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const tasksWithoutRemoved = tasks.filter(tasks => tasks.id !== id)

    if (!confirm('Deseja eliminar esta tarefa?')) return

    setTasks(tasksWithoutRemoved)
  }

  return (
    <>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskFormContainer}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            required
            onChange={(e) => setNewTaskInputValue(e.target.value)}
            value={newTaskInputValue}
          />
          <button onClick={handleAddNewTask}>
            Criar
            <PlusCircle size={16} color="#f3f3f3" weight="bold" />
          </button>
        </div>

        <div className={styles.taskList}>
          <HeaderList />

          {tasks.length > 0 ?
            (
              <div>
                {tasks.map(task => (
                  <Item
                    key={task.id}
                    data={task}
                    handleToggleTaskStatus={handleToggleTask}
                    removeTask={handleRemoveTask}
                  />
                ))}
              </div>
            )
            :
            (
              <div className={styles.empty}>
                <img src={clipboard} alt="board" />
                <p>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default App
