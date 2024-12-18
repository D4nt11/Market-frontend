import { useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput/FormInput";
import styles from "./SignUpClient.module.css";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


const SignUpClient = () => {


  const schema = yup.object({
    firstName: yup.string().required(),
    surName: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).required()


  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)});
  const registration = async (data: any) => {
    console.log(data);
  }
  
  return (
    <form onSubmit={handleSubmit(registration)} className={styles.main}>
      <h1>Регистрация</h1>
      <h5>
        Уже есть аккаунт? <span>Войти</span>
      </h5>
      <FormInput name="Имя" type="text" register={register} registerName="firstName" rules={{required: true}}/>
      <p>{errors.firstName?.message}</p>
      <FormInput name="Фамилия" type="text" register={register} registerName="surName" rules={{required: true}}/>
      <FormInput name="Телефон" type="text" register={register} registerName="phone" rules={{required: true}}/>
      <FormInput name="Почта" type="email" register={register} registerName="email" rules={{required: true}}/>
      <FormInput name="Пароль" type="password" register={register} registerName="password" rules={{required: true}}/>
      <h5 className={styles.h5}>
        При создании аккаунта Вы соглашаетесь с нашими{" "}<br />
        <span className={styles.span}>Условиями</span> и{" "}
        <span className={styles.span}>Политикой конфиденциальности.</span>
      </h5>
      <input className={styles.button} type="submit" value="Зарегистрироваться" />
    </form>
  );
};

export default SignUpClient;
