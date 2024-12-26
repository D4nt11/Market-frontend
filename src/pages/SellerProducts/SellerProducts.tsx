import CardProduct from "../../components/Card/CardProduct/CardProduct";
import styles from "./SellerProducts.module.css";
import { Rate } from "antd";

const SellerProducts = () => {
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
        <input type="text" className={styles.sellerInput} placeholder="Искать у продавца"/>
        <img className={styles.searchImg} src="../../../public/icons/search.svg" alt="" />
        </div>
        <div className={styles.sellerCatalog}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </section>
    </div>
  );
};

export default SellerProducts;
