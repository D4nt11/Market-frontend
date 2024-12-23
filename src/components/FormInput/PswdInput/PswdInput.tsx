import { useState } from 'react'
import styles from './PswdInput.module.css'

const PswdInput = ({name, register, registerName, rules}: any) => {

    const [isPswdVisible, setPswdVisible] = useState(false);

    const togglePswdVisible = () => {
        setPswdVisible(!isPswdVisible);
    }

    return (
      <div className={styles.PswdInput}>
      <label htmlFor="pswdInput">{name}</label>
      <input {...register(registerName, rules)} type={isPswdVisible ? 'text' : 'password'} id='pswdInput'/>
      <a href="#" className={`${styles.passwordControl} ${isPswdVisible ? styles.view : ''}`} onClick={(e) => {
        e.preventDefault();
        togglePswdVisible();
      }}></a>
  </div>
  )
}

export default PswdInput