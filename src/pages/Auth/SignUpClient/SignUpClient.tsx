import { useForm } from "react-hook-form";
import styles from "./SignUpClient.module.css";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";


const SignUpClient = () => {

  const schema = yup.object().shape({
    firstName: yup.string().trim().required('Введите имя'),
    surName: yup.string().trim().required('Введите фамилию'),
    // phone: yup.string().required('Введите номер телефона').matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    //   'Введите корректный номер телефона в формате +7 (xxx) xxx-xx-xx'),
    email: yup.string().required('Введите почту').matches(/^\S+@\S+\.\S+$/, 'Неверный формат почты'),
    password: yup.string().required('Введите пароль'),
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
      <BasicInput name="Имя" type="text" register={register} registerName="firstName" rules={{required: true}}/>
      <p>{errors.firstName?.message}</p>
      <BasicInput name="Фамилия" type="text" register={register} registerName="surName" rules={{required: true}}/>
      <p>{errors.surName?.message}</p>
      <PhoneInput name="Телефон" register={register} registerName="phone" rules={{required: true}}/>
      {/* <p>{errors.phone?.message}</p> */}
      <BasicInput name="Почта" type="email" register={register} registerName="email" rules={{required: true}}/>
      <p>{errors.email?.message}</p>
      <BasicInput name="Пароль" type="password" register={register} registerName="password" rules={{required: true}}/>
      <p>{errors.password?.message}</p>
      <div className={styles.checkboxContainer}>
      <input type="checkbox" />
      <h5 className={styles.h5}>
        При создании аккаунта Вы соглашаетесь с нашими{" "}<br />
        <span className={styles.span}>Условиями</span> и{" "}
        <span className={styles.span}>Политикой конфиденциальности.</span>
      </h5>
      </div>
      <input className={styles.button} type="submit" value="Зарегистрироваться" />
    </form>
  );
};

export default SignUpClient;
