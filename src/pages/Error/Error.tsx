import { useNavigate } from 'react-router-dom'
import styles from './Error.module.css'

const Error = () => {
const navigate = useNavigate();

const toHome = () =>{
  navigate("/home")
}

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.h1}>404</h1>
      <p className={styles.p}>Нет страницы, но зато есть возможность создать что-то новое...</p>
      <button className={styles.button} onClick={toHome}>На главную</button>
    </div>
  )
}

export default Error