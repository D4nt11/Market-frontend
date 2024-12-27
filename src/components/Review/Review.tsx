import styles from "./Review.module.css";
import { Rate } from "antd";

const Review = ({ ...review }) => {

  return (
    <div className={styles.container}>
      <h4 className={styles.h4}>{review.name}</h4>
      <div className={styles.date}>{review.createdAt}</div>
      <Rate
        value={review.rating}
        allowHalf
        character="★"
        disabled={true}
        style={{ scale: "1.2" }}
        className={styles.rate}
      />
      <div className={styles.description}>{review.description}</div>
    </div>
  );
};

export default Review;
