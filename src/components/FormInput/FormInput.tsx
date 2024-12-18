import styles from './FormInput.module.css'

const FormInput = ({name, type, register, registerName, rules}: any) => {
  return (
    <div className={styles.FormInput}>
        <label htmlFor="formInput">{name}</label>
        <input {...register(registerName, rules)} type={type} id='formInput'/>
    </div>
  )
}

export default FormInput