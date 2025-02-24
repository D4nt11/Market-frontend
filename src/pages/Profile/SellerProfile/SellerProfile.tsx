import { Controller, useForm } from "react-hook-form";
import styles from "./SellerProfile.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasicInput from "../../../components/FormInput/BasicInput/BasicInput";
import PhoneInput from "../../../components/FormInput/PhoneInput/PhoneInput";
import PswdInput from "../../../components/FormInput/PswdInput/PswdInput";
import api from "../../../http/axios";
import { useNavigate } from "react-router-dom";
import { authModel } from "../../../services/authModel";
import { useEffect, useState } from "react";
import { useSellerStore } from "../../../store/useSellerStore";

const SellerProfile = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
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
    INN: yup
      .string()
      .required("Введите ИНН")
      .trim()
      .max(10)
      .matches(/^\d{10}/, "Введите ИНН в правильном формате(10 цифр)"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const fetchData = async () => {
    try {
      const sellerResponse = await api.get("/sellers/profile");
      delete sellerResponse.data.password;
      reset(sellerResponse.data);
      return sellerResponse.data;
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };

  const useFetchData = async () => {
    await useSellerStore.getState().checkAuth();
    const isSellerAuth = useSellerStore.getState().isSellerAuth;
    if (isSellerAuth) {
      fetchData();
    }
  };

  useEffect(() => {
    useFetchData();
  }, [reset]);

  const updateData = async (data: any) => {
    if (isValid && useSellerStore.getState().isSellerAuth) {
      api.post("/auth/seller/refresh", data);
    }
  };

  const logout = () => {
    authModel.logout();
    alert("logout");
    navigate("/home");
  };

  const back = () => {
    navigate("/home");
  };

  const toSellerProducts = async () => {
    if (useSellerStore.getState().isSellerAuth) {
      const sellerId = await useSellerStore.getState().sellerId;
      console.log(sellerId);
      navigate(`/seller/products/${sellerId}`);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.buttons}>
        <button className={styles.buttonsButton} onClick={back}>
          <img
            className={styles.buttonsButtonImage}
            src="../../../../public/icons/back.svg"
            alt=""
          />
        </button>
        <div className={styles.rightButtons}>
          <button className={styles.buttonsButton} onClick={toSellerProducts}>
            <img
              className={styles.buttonsButtonImage}
              src="../../../../public/icons/shop.svg"
              alt=""
            />
          </button>
          <button className={styles.buttonsButton}>
            <img
              className={styles.buttonsButtonImage}
              src="../../../../public/icons/theme.svg"
              alt=""
            />
          </button>
          <button className={styles.buttonsButton} onClick={logout}>
            <img
              className={styles.buttonsButtonImage}
              src="../../../../public/icons/exit.svg"
              alt=""
            />
          </button>
        </div>
      </div>
      <div className={styles.profileImage}>
        <img
          className={styles.img}
          src="../../../public/icons/profile.svg"
          alt=""
        />
      </div>
      <form onSubmit={handleSubmit(updateData)} className={styles.main}>
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
          rules={{}}
        />
        <p className={styles.p}>{errors.patronymic?.message}</p>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <div className={styles.PhoneInput}>
              <PhoneInput field={field} name="Телефон" />
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
        <input
          className={styles.button}
          type="submit"
          value="Обновить данные"
          style={{ opacity: isValid ? 1 : 0.5, marginTop: "30px" }}
        />
      </form>
    </div>
  );
};

export default SellerProfile;
