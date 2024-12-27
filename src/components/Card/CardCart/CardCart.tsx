import { useEffect, useState } from "react";
import styles from "./CardCart.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../http/axios";
import { useClientStore } from "../../../store/useClientStore";


const CardCart = ({...product}) => {
  useEffect(() => {
    const priceElements = document.querySelectorAll(`.${styles.price}`);

    priceElements.forEach((element) => {
      element.textContent =
        element.textContent?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") ||
        "";
    });
  }, []);

  const navigate = useNavigate()
  const toProduct = () => {
    navigate(`/products/${product.id}`)
  }

  const addToCart = async () =>{
    if(useClientStore.getState().isClientAuth){
      const data = {
        clientId: useClientStore.getState().clientId,
        productId: product.id,
      }
      await api.post('/cart/add', data)
      alert('succes')
    }
    else{
      alert('need auth')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer} onClick={toProduct}>
        <img src={product.img} alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>{product.price}</div>
        <div className={styles.productName}>
          {product.name}
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={addToCart}>В корзину</button>
        <button className={styles.button}>Заказать</button>
      </div>
    </div>
  );
};

export default CardCart;
