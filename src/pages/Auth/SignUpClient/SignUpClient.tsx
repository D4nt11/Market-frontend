import { Controller, useForm } from "react-hook-form";
import styles from "./SignUpClient.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";
import MaskedInput from "react-text-mask";

const SignUpClient = () => {
  const schema = yup
    .object()
    .shape({
      firstName: yup.string().trim().required("Введите имя"),
      surName: yup.string().trim().required("Введите фамилию"),
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
        .matches(/^\S+@\S+\.\S+$/, "Неверный формат почты"),
      password: yup.string().required("Введите пароль"),
      checkbox: yup.bool().oneOf([true], "Требуется согласие с условиями").required("Требуется согласие с условиями"),
    })
    .required();

  // const defaultValues = {
  //   firstName: '',
  //   surName: '',
  //   phone: '+7 (xxx) xxx-xx-xx',
  //   email: '',
  //   password: '',
  // }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const registration = async (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(registration)} className={styles.main}>
      <h1>Регистрация</h1>
      <h5>
        Уже есть аккаунт? <span>Войти</span>
      </h5>
      <BasicInput
        name="Имя"
        type="text"
        register={register}
        registerName="firstName"
        rules={{ required: true }}
      />
      <p>{errors.firstName?.message}</p>
      <BasicInput
        name="Фамилия"
        type="text"
        register={register}
        registerName="surName"
        rules={{ required: true }}
      />
      <p>{errors.surName?.message}</p>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <div className={styles.PhoneInput}>
            <label htmlFor="phoneInput">Телефон</label>
            <MaskedInput
              id="phoneInput" 
              {...field}
              mask={[
                "+",
                "7",
                " ",
                "(",
                /\d/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
              ]}
              placeholder="+7 (xxx) xxx-xx-xx"
              onChange={(e) => field.onChange(e.target.value)}
            />
          </div>
        )}
      />
      <p>{errors.phone?.message}</p>
      <BasicInput
        name="Почта"
        type="email"
        register={register}
        registerName="email"
        rules={{ required: true }}
      />
      <p>{errors.email?.message}</p>
      <BasicInput
        name="Пароль"
        type="password"
        register={register}
        registerName="password"
        rules={{ required: true }}
      />
      <p>{errors.password?.message}</p>
      <div className={styles.checkboxContainer}>
        <input {...register("checkbox", {required: true})} type="checkbox" />
        <h5 className={styles.h5}>
          При создании аккаунта Вы соглашаетесь с нашими <br />
          <span className={styles.span}>Условиями</span> и{" "}
          <span className={styles.span}>Политикой конфиденциальности.</span>
        </h5>
      </div>
        <p style={{marginBottom: "20px"}}>{errors.checkbox?.message}</p>
      <input
        className={styles.button}
        type="submit"
        value="Зарегистрироваться"
        // style={{cursor: isValid ? "pointer" : "not-allowed"}}
        // disabled={!isValid}
      />
    </form>
  );
};

export default SignUpClient;

// import { Controller, useForm } from "react-hook-form";
// import styles from "./SignUpClient.module.css";
// import * as yup from 'yup'
// import { yupResolver } from "@hookform/resolvers/yup";
// import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
// import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";

// const SignUpClient = () => {

//   const schema = yup.object().shape({
//     firstName: yup.string().trim().required('Введите имя'),
//     surName: yup.string().trim().required('Введите фамилию'),
//     phone: yup.string().required('Введите номер телефона').matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
//       'Введите корректный номер телефона в формате +7 (xxx) xxx-xx-xx'),
//     email: yup.string().required('Введите почту').matches(/^\S+@\S+\.\S+$/, 'Неверный формат почты'),
//     password: yup.string().required('Введите пароль'),
//   }).required()

//   // const defaultValues = {
//   //   firstName: '',
//   //   surName: '',
//   //   phone: '+7 (xxx) xxx-xx-xx',
//   //   email: '',
//   //   password: '',
//   // }

//   const {register, handleSubmit, formState: {errors}, control} = useForm({ resolver: yupResolver(schema)});
//   const registration = async (data: any) => {
//     console.log(data);
//   }

//   return (
//     <form onSubmit={handleSubmit(registration)} className={styles.main}>
//       <h1>Регистрация</h1>
//       <h5>
//         Уже есть аккаунт? <span>Войти</span>
//       </h5>
//       <BasicInput name="Имя" type="text" register={register} registerName="firstName" rules={{required: true}}/>
//       <p>{errors.firstName?.message}</p>
//       <BasicInput name="Фамилия" type="text" register={register} registerName="surName" rules={{required: true}}/>
//       <p>{errors.surName?.message}</p>

//       <Controller
//       control={control}
//       name="phone"
//       render={({field}) =>(
//         <PhoneInput {...field}  name="Телефон"/>
//       )}
//       />
//       <p>{errors.phone?.message}</p>
//       <BasicInput name="Почта" type="email" register={register} registerName="email" rules={{required: true}}/>
//       <p>{errors.email?.message}</p>
//       <BasicInput name="Пароль" type="password" register={register} registerName="password" rules={{required: true}}/>
//       <p>{errors.password?.message}</p>
//       <div className={styles.checkboxContainer}>
//       <input type="checkbox" />
//       <h5 className={styles.h5}>
//         При создании аккаунта Вы соглашаетесь с нашими{" "}<br />
//         <span className={styles.span}>Условиями</span> и{" "}
//         <span className={styles.span}>Политикой конфиденциальности.</span>
//       </h5>
//       </div>
//       <input className={styles.button} type="submit" value="Зарегистрироваться" />
//     </form>
//   );
// };

// export default SignUpClient;
