import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useClientStore } from "../../store/useClientStore";
import { useSellerStore } from "../../store/useSellerStore";

const Header = () => {
  const navigate = useNavigate();

  // const isAuthClient = useClientStore().isClientAuth
  // const isAuthSeller = useSellerStore().isSellerAuth

  // isAuth присваивается раньше, чем обновляется
  let isAuthClient = false;
  let isAuthSeller = false;
  const updateAuth = async () => { //теперь перестало работать
    //пофиксил, добавив await при вызове updateAuth
    await useSellerStore.getState().checkAuth();
    await useClientStore.getState().checkAuth();
    isAuthClient = useClientStore.getState().isClientAuth;
    isAuthSeller = useSellerStore.getState().isSellerAuth;
  }
  const toProfile = async () =>{
    await updateAuth();
    console.log(isAuthClient, isAuthSeller)
    if(isAuthClient){
      navigate("/client/profile");
    }
    else if(isAuthSeller){
      navigate("/seller/profile");
    }
    else{
      navigate("/client/sign-in");
    }
  }

  const toClientOrders = async () =>{
    await updateAuth();
    if(isAuthClient){
      navigate("/cleint/order")
    }
    else{
      navigate("/client/sign-in")
    }
  }

  const toClientCart = async () =>{
    await updateAuth();
    if(isAuthClient){
      navigate("/client/cart")
    }
    else{
      navigate("/client/sign-in")
    }
  }

  const toCatalog = () =>{
    navigate("/catalog");
  }

  const toHome = () =>{
    navigate("/home")
  }

  const toSeller = async () =>{
    await updateAuth();
    if(isAuthSeller){
      navigate("/seller/profile")
    }
    else{
      navigate("/seller/sign-in")
    }
  }


  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.upperHeader}>
          <span className={styles.span}>RUB</span>
          <span className={styles.span} onClick={toSeller}>Для продавцов</span>
          <span className={styles.span}>Пункты выдачи</span>
          <span className={styles.span}>Москва. Уточнить адрес</span>
        </div>
        <div className={styles.headerMain}>
          <img className={styles.img} src="../../../public/icons/logoDark.svg" alt="logo" />
          <h1 className={styles.h1} onClick={toHome}>Bazario</h1>
          <div className={styles.headerInputContainer}>
            <input
              type="text"
              className={styles.headerInput}
              placeholder="Искать на Bazario"
            />
            <img className={styles.img2} src="../../../public/icons/search.svg" alt="" />
            <button className={styles.button} type="button" name="" id={styles.btn1}>Найти</button>
          </div>          
            <button className={styles.headerButton} type="button" name="" id={styles.btn1} onClick={toCatalog}>
              <img className={styles.img3} src="../../../public/icons/catalog.svg" alt="" />
            </button>
          <button className={styles.headerButton} id={styles.btn2}>
            <img src="../../../public/icons/order.svg" alt="" onClick={toClientOrders}/>
          </button>
          <button className={styles.headerButton} id={styles.btn3} onClick={toProfile}>
          <img src="../../../public/icons/profile.svg" alt="" />
          </button>
          <button className={styles.headerButton} id={styles.btn4} onClick={toClientCart}>
          <img src="../../../public/icons/cart.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
