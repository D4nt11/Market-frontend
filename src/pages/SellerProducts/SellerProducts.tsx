import { useForm } from "react-hook-form";
import CardProduct from "../../components/Card/CardProduct/CardProduct";
import BasicInput from "../../components/FormInput/BasicInput/BasicInput";
import styles from "./SellerProducts.module.css";
import { Descriptions, Rate } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

const SellerProducts = () => {
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      img: yup.string().required(),
      productCategoryId: yup.array().required(),
    })
    .required();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({ resolver: yupResolver(schema) });

  const createProduct = () =>{}

  const addProduct = () => {};
  return (
    <div className={styles.SellerProductsContainer}>
      <section className={styles.leftSection}>
        <div className={styles.profileImage}>
          <img
            className={styles.img}
            src="../../../public/icons/profile.svg"
            alt=""
          />
        </div>
        <h1>SellerName</h1>
        <Rate
          value={2.5}
          disabled={true}
          allowHalf
          character="★"
          style={{ scale: "1.5" }}
        />
        <div className={styles.contacts}>
          <h3>Контактные данные</h3>
          <p className={styles.email}>{"emai"}</p>
          <p className={styles.phone}>{"+7 (921) 562-66-73"}</p>
        </div>
      </section>
      <section className={styles.rightSection}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.sellerInput}
            placeholder="Искать у продавца"
          />
          <img
            className={styles.searchImg}
            src="../../../public/icons/search.svg"
            alt=""
          />
        </div>
        <div className={styles.sellerCatalog}>
          <div className={styles.addContainer} onClick={addProduct}>
            <div className={styles.vector}>
              <img src="../../../public/icons/vector.svg" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.addMenu}>
        {/* <form onSubmit={handleSubmit(createProduct)} className={styles.main}>
          <BasicInput
            name="Название товара"
            type="text"
            register={register}
            registerName="name"
            rules={{ required: true }}
          />
          <p className={styles.p}>{errors.name?.message}</p>
          <BasicInput
            name="Описание"
            type="text"
            register={register}
            registerName="description"
            rules={{ required: true }}
          />
          <p className={styles.p}>{errors.description?.message}</p>
          <BasicInput
            name="Цена"
            type="number"
            register={register}
            registerName="price"
            rules={{ required: true }}
          />
          <p className={styles.p}>{errors.name?.message}</p>
          <BasicInput
            name="Изображение"
            type="text"
            register={register}
            registerName="img"
            rules={{ required: true }}
          />
          <p className={styles.p}>{errors.name?.message}</p>
          <input
            className={styles.button}
            type="submit"
            value="Войти"
            style={{ opacity: isValid ? 1 : 0.5 }}
          />
        </form> */}

        <MultiSelectDropdown />
      </section>
    </div>
  );
};

export default SellerProducts;
