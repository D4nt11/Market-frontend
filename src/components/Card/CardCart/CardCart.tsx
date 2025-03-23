import { useEffect, useState } from "react";
import styles from "./CardCart.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { useClientStore } from "../../../store/useClientStore";

const CardCart = ({ ...product }) => {
  useEffect(() => {
    const priceElements = document.querySelectorAll(`.${styles.price}`);

    priceElements.forEach((element) => {
      element.textContent =
        element.textContent?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") ||
        "";
    });
  }, []);

  const navigate = useNavigate();
  const toProduct = () => {
    navigate(`/products/${product.id}`);
  };

  const addToCart = async () => {
    if (useClientStore.getState().isClientAuth) {
      const data = {
        clientId: useClientStore.getState().clientId,
        productId: product.id,
      };
      await api.post("/cart/add", data);
      alert("succes");
    } else {
      alert("need auth");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer} onClick={toProduct}>
        <img src={product.img} alt="" />
      </div>
      <div className={styles.nameContainer}>
        <div className={styles.productName}>
          111111111111
          {product.name}
        </div>
      </div>
      <div className={styles.dynamicContainer}>
        <div className={styles.price}>{product.price}1111111111</div>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div className={styles.counter}>
            <button className={styles.minusBtn}>-</button>
            <p className={styles.count}>10</p>
            <button className={styles.plusBtn}>+</button>
          </div>

          {/* <button className={styles.button} onClick={addToCart}>В</button>
        <button className={styles.button} onClick={addToCart}>В корзину</button>
        <button className={styles.button}>Заказать</button> */}
        </div>
      </div>
    </div>
  );
};

export default CardCart;
