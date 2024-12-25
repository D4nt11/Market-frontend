import styles from './CardProduct.module.css'

const CardProduct = () => {


  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src="" alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.price}>11,500</div>
        <div className={styles.productName}>Ndwlknedwmed</div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>В корзину</button>
        <button className={styles.button}>Купить сейчас</button>
      </div>
    </div>
  )
}

export default CardProduct