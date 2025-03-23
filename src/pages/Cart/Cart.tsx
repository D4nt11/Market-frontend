import { useEffect } from "react";
import CardCart from "../../components/Card/CardCart/CardCart";
import styles from "./Cart.module.css";

const Cart = () => {
  useEffect(() => {
    const priceElements = document.querySelectorAll(`.${styles.price}`);

    priceElements.forEach((element) => {
      element.textContent =
        element.textContent?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") ||
        "";
    });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <h1 className={styles.h1}>Корзина</h1>
        <div className={styles.cardContainer}>
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
          <CardCart />
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.infoContainer}>
          <div className={styles.totalPriceContainer}>
            <h2 className={styles.h2}>Общая стоимость:</h2>
            <div className={styles.price}>1111111111</div>
          </div>
          <input
            className={styles.button}
            type="submit"
            value="Заказать"
            // style={{ opacity: isValid ? 1 : 0.5, marginTop: "30px" }}
          />
        </div>
      </section>
    </div>
  );
};

export default Cart;
