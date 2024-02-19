import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.container}>
      <aside>
        <p>Tarefas criadas</p>
        <span>0</span>
      </aside>

      <aside>
        <p>Concluidas</p>
        <span>0 de 0</span>
      </aside>
    </header>
  )
}