import { Rate } from "antd";
import styles from "./SingleProduct.module.css";

const SingleProduct = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src="" alt="" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.h1}>Tovar</h1>
          <div className={styles.price}>10 000</div>
          <div className={styles.ratingContainer}>
            <p className={styles.ratingCount}>4.5</p>
            <Rate className={styles.ratingStarts} value={4.5} allowHalf disabled={true} />
          </div>
          <div className={styles.descriptionContainer}>
            <h3 className={styles.h3}>Описание</h3>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab
              molestiae nostrum beatae illo fugiat rem, itaque amet placeat
              sapiente expedita quaerat ea libero reprehenderit soluta
              praesentium necessitatibus, eum sit.
            </p>
          </div>
          <div className={styles.buttons}>
            <button className={styles.button}>В корзину</button>
            <button className={styles.button}>Заказать</button>
          </div>
        </div>
      </div>

      <div className={styles.reviewContainer}>
        <div className={styles.makeReview}>
          <h5 className={styles.h5}></h5>
          <Rate allowHalf />
          <textarea className={styles.textarea}></textarea>
          <button className={styles.reviewButton}></button>
        </div>
        <div className={styles.reviews}>
          <h5 className={styles.h5}></h5>
          {/* компонент отзыва */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
