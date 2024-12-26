import { useEffect, useState } from "react";
import styles from "./CardProduct.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../http/axios";
import { useClientStore } from "../../../store/useClientStore";

// export interface product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   img: string;
//   isAvailable: boolean;
//   isPopular: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   sellerId: string;
//   productCategory: any;
// }
//Example//////////////
// [
//   {
//     id: "23b48b12-26a4-4e7a-afc6-f78477408085",
//     name: "Sneakers",
//     description: "Stylish and comfortable sneakers.",
//     price: 49.99,
//     img: "https://example.com/images/sneakers.jpg",
//     isAvailable: true,
//     isPopular: false,
//     isDeleted: false,
//     createdAt: "2024-12-19T10:51:09.693Z",
//     sellerId: "d0d28ef7-2ee7-4bf6-b6d4-0ef2196d8f28",
//     productCategory: [
//       {
//         id: "053d1933-48be-42d3-a395-86e2b24b5a46",
//         name: "Fashion",
//         img: "https://example.com/images/fashion.jpg",
//       },
//     ],
//   },
// ];

const CardProduct = ({...product}) => {
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
    navigate(`products/${product.id}`)
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

export default CardProduct;
