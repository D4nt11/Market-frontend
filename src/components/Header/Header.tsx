import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.upperHeader}>
          <span className={styles.span}>RUB</span>
          <span className={styles.span}>Для продавцов</span>
          <span className={styles.span}>Пункты выдачи</span>
          <span className={styles.span}>Москва. Уточнить адрес</span>
        </div>
        <div className={styles.headerMain}>
          <img className={styles.img} src="../../../public/icons/logoDark.svg" alt="logo" />
          <h1 className={styles.h1}>Bazario</h1>
          <div className={styles.headerInputContainer}>
            <input
              type="text"
              className={styles.headerInput}
              placeholder="Искать на Bazario"
            />
            <img className={styles.img2} src="../../../public/icons/search.svg" alt="" />
            <button className={styles.button} type="button" name="" id={styles.btn1} >
              <img className={styles.img3} src="../../../public/icons/catalog.svg" alt="" />
            </button>
          </div>
          <button className={styles.headerButton} id={styles.btn2}>
            <img src="../../../public/icons/order.svg" alt="" />
          </button>
          <button className={styles.headerButton} id={styles.btn3}>
          <img src="../../../public/icons/profile.svg" alt="" />
          </button>
          <button className={styles.headerButton} id={styles.btn4}>
          <img src="../../../public/icons/cart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
