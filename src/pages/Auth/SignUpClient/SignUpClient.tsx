import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import styles from "./SignUpClient.module.css";


const SignUpClient = () => {

  const {} = useForm;

  
  return (
    <div className={styles.main}>
      <h1>Регистрация</h1>
      <h5>
        Уже есть аккаунт? <span>Войти</span>
      </h5>
      <FormInput name="Имя" type="text" />
      <FormInput name="Фамилия" type="text" />
      <FormInput name="Телефон" type="text" />
      <FormInput name="Почта" type="email" />
      <FormInput name="Пароль" type="password" />
      <h5 className={styles.h5}>
        При создании аккаунта Вы соглашаетесь с нашими{" "}<br />
        <span className={styles.span}>Условиями</span> и{" "}
        <span className={styles.span}>Политикой конфиденциальности.</span>
      </h5>
      <button>Зарегистрироваться</button>
    </div>
  );
};

export default SignUpClient;
