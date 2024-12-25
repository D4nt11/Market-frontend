import styles from "./SellerProducts.module.css";

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
      </section>
      <section className={styles.rightSection}></section>
    </div>
  );
};

export default SellerProducts;
