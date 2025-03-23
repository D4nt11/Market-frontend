import { Descriptions, Rate } from "antd";
import styles from "./SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClientStore } from "../../store/useClientStore";
import api from "../../api/api";
import Review from "../../components/Review/Review";

const SingleProduct = () => {
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    img: string;
    isAvailable: boolean;
    isPopular: boolean;
    isDeleted: boolean;
    createdAt: string;
    sellerId: string;
    productCategory: any;
    rating: number;
  }
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const API_URL = import.meta.env.VITE_API_URL;

  const getProduct = async () => {
    await fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    const priceElements = document.querySelectorAll(`.${styles.price}`);

    priceElements.forEach((element) => {
      element.textContent =
        element.textContent?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") ||
        "";
    });
  }, [product]);

  const addToCart = async () => {
    if (useClientStore.getState().isClientAuth) {
      const data = {
        clientId: useClientStore.getState().clientId,
        productId: product?.id,
      };
      await api.post("/cart/add", data);
      alert("succes");
    } else {
      alert("need auth");
    }
  };

  interface value{
    value: number,
  }

  const [value, setValue] = useState(0)
  const [description, setDescription] = useState<string>("");

  const data = {
    productId: id,
    clientId: useClientStore.getState().clientId,
    rating: value,
    description: description,
  }
  const addReview = async() => {
    if(useClientStore.getState().isClientAuth){
      await api.post('/reviews', data)
      console.log(data)
    }
    else{
      alert('need auth')
    }
    

  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={product?.img} alt="" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.h1}>{product?.name}</h1>
          <div className={styles.price}>{product?.price}</div>
          <div className={styles.ratingContainer}>
            <p className={styles.ratingCount}>{product?.rating}</p>
            <Rate
              className={styles.ratingStars}
              value={product?.rating}
              allowHalf
              disabled={true}
              character="★"
              style={{ scale: "1.5", marginLeft: "20px" }}
            />
          </div>
          <div className={styles.descriptionContainer}>
            <h3 className={styles.h3}>Описание</h3>
            <p className={styles.description}>{product?.description}</p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={addToCart}>
              В корзину
            </button>
            <button className={styles.button}>Заказать</button>
          </div>
        </div>
      </div>

      <div className={styles.reviewContainer}>
        <div className={styles.makeReview}>
          <h5 className={styles.h5}>Написать отзыв</h5>
          <div className={styles.ratingContainer2}>
            <Rate
              className={styles.ratingStars2}
              allowHalf
              character="★"
              style={{ scale: "1.5" }}
              onChange={(value) => { 
                setValue(value) 
              }}
            />
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Оставить отзыв"
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <button className={styles.reviewButton} onClick={addReview}>Отправить отзыв</button>
        </div>
        <div className={styles.reviews}>
          <h5 className={styles.h52}>Отзывы о товаре</h5>
          {/* <Review {...review} /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
