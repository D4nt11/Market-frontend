import styles from "./BasicInput.module.css";

const BasicInput = ({ name, type, register, registerName, rules }: any) => {
  return (
    <div className={styles.BasicInput}>
      <label htmlFor="basicInput">{name}</label>
      <input {...register(registerName, rules)} type={type} id="basicInput" />
    </div>
  );
};

export default BasicInput;
