import { Controller, useForm } from "react-hook-form";
import styles from "./ClientProfile.module.css"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";
import PswdInput from "../../../components/FormInput/PswdInput/PswdInput";
import api from '../../../http/axios'

const ClientProfile = () => {


  const schema = yup
    .object()
    .shape({
      name: yup.string().trim().required("Введите имя"),
      surname: yup.string().trim().required("Введите фамилию"),
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
    })
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      control,
    } = useForm({ resolver: yupResolver(schema) });

    const updateData = async () => {
      const response = await api.get("/clients/profile");
      console.log(response)
      return response
    }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileImage}>
        <img src="../../../public/icons/profile.svg" alt="" />
      </div>
      <form onSubmit={handleSubmit(updateData)} className={styles.main}>
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
    </div>
  )
}

export default ClientProfile