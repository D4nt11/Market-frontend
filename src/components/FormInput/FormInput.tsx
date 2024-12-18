import styles from './FormInput.module.css'

const FormInput = (props: any) => {
  return (
    <div className={styles.FormInput}>
        <label htmlFor="formInput">{props.name}</label>
        <input type={props.type} id='formInput'/>
    </div>
  )
}

export default FormInput