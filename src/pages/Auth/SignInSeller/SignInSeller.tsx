import { useForm } from "react-hook-form";
import styles from "./SignInSeller.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import { authModel } from "../../../services/authModel";
import PswdInput from "../../../components/FormInput/PswdInput/PswdInput";

const SignInSeller = () => {
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required("Введите почту")
        .matches(/^\S+@\S+\.\S+$/, "Введите почту в правильном формате"),
      password: yup.string().required("Введите пароль"),
    }).required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const authorization = async (data: any) => {
    const {success} = await authModel.loginSeller(data);
    if(success){
      alert(success);
    }
  };

  return (
    <form onSubmit={handleSubmit(authorization)} className={styles.main}>
      <h1>Авторизация</h1>
      <h5>
        Нет аккаунта? <span>Зарегистрироваться</span>
      </h5>
      <BasicInput
        name="Почта"
        type="email"
        register={register}
        registerName="email"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.email?.message}</p>
      <PswdInput
        name="Пароль"
        register={register}
        registerName="password"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.password?.message}</p>
      <input
        className={styles.button}
        type="submit"
        value="Войти"
        style={{opacity: isValid ? 1 : 0.5}}
      />
    </form>
  );
};

export default SignInSeller;
