import { Check, Trash } from "phosphor-react";

import styles from './item.module.css'
import { ITask, IToggleTask } from "../../App";

interface IItemProps {
  data: ITask
  handleToggleTaskStatus: ({ id, value }: IToggleTask) => void
  removeTask: (id: number) => void
}

export function Item({ data, handleToggleTaskStatus, removeTask }: IItemProps) {
  function handleToggle() {
    handleToggleTaskStatus({ id: data.id, value: !data.isDone })
  }

  function handleRemoveTask() {
    removeTask(data.id)
  }

  const checkboxCheckedClassname = data.isDone
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']

  const paragraphCheckedClassname = data.isDone
    ? styles['paragraph-checked'] : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToggle}>
          <input type="checkbox" readOnly checked={data.isDone} />
          <span className={`${styles.chekbox} ${checkboxCheckedClassname}`}>
            {data.isDone && <Check size={12} />}
          </span>
          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>{data.text}</p>
        </label>
      </div>

      <button onClick={handleRemoveTask}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}