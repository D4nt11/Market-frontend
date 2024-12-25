import { Controller, useForm } from "react-hook-form";
import styles from "./SignUpSeller.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import { authModel } from "../../../services/authModel";
import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";
import PswdInput from "../../../components/FormInput/PswdInput/PswdInput";
import { useNavigate } from "react-router-dom";

const SignUpSeller = () => {

  const navigate = useNavigate();
  const toSignIn = () =>{
    navigate(`/seller/sign-in`, {replace: true});
  }

  const schema = yup
    .object()
    .shape({
      shopName: yup.string().trim().required("Введите название магазина"),
      name: yup.string().trim().required("Введите имя"),
      surname: yup.string().trim().required("Введите фамилию"),
      patronymic: yup.string().trim(),
      phone: yup
        .string()
        .required("Введите номер телефона")
        .matches(
          /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
          "Введите корректный номер телефона в формате +7 (xxx) xxx-xx-xx"
        ),
      email: yup
        .string()
        .required("Введите почту")
        .matches(/^\S+@\S+\.\S+$/, "Введите почту в правильном формате"),
      password: yup.string().required("Введите пароль"),
      checkbox: yup.bool().oneOf([true], "Требуется согласие с условиями").required("Требуется согласие с условиями"),
      INN: yup.string().required('Введите ИНН').trim().matches(/^\d{10}/, "Введите ИНН в правильном формате(10 цифр)"),
    })
    .required();


  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const registration = async (data: any) => {
    delete data.checkbox;
    const {success} = await authModel.registrationSeller(data);
    if(success){
      alert(success);
    }
  };

  return (
    <form onSubmit={handleSubmit(registration)} className={styles.main}>
      <h1>Регистрация</h1>
      <h5>
        Уже есть аккаунт? <span onClick={toSignIn}>Войти</span>
      </h5>
      <BasicInput
        name="Название магазина"
        type="text"
        register={register}
        registerName="shopName"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.shopName?.message}</p>
      <BasicInput
        name="Имя"
        type="text"
        register={register}
        registerName="name"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.name?.message}</p>
      <BasicInput
        name="Фамилия"
        type="text"
        register={register}
        registerName="surname"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.surname?.message}</p>
      <BasicInput
        name="Отчество(если есть)"
        type="text"
        register={register}
        registerName="patronymic"
        rules={{ }}
      />
      <p className={styles.p}>{errors.patronymic?.message}</p>
      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <div className={styles.PhoneInput}>
            <PhoneInput field={field} name="Телефон"/>
          </div>
        )}
      />
      <p className={styles.p}>{errors.phone?.message}</p>
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
      <BasicInput
        name="ИНН"
        type="text"
        register={register}
        registerName="INN"
        rules={{ required: true }}
      />
      <p className={styles.p}>{errors.INN?.message}</p>
      <div className={styles.checkboxContainer}>
        <input {...register("checkbox", {required: true})} type="checkbox" />
        <h5 className={styles.h5}>
          При создании аккаунта Вы соглашаетесь с нашими <br />
          <span className={styles.span}>Условиями</span> и{" "}
          <span className={styles.span}>Политикой конфиденциальности.</span>
        </h5>
      </div>
        <p className={styles.p} style={{marginBottom: "20px"}}>{errors.checkbox?.message}</p>
      <input
        className={styles.button}
        type="submit"
        value="Зарегистрироваться"
        style={{opacity: isValid ? 1 : 0.5}}
      />
    </form>
  );
};

export default SignUpSeller;
