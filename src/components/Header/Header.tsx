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
  const updateAuth = async () => {
    //теперь перестало работать
    //пофиксил, добавив await при вызове updateAuth
    await useSellerStore.getState().checkAuth();
    await useClientStore.getState().checkAuth();
    isAuthClient = useClientStore.getState().isClientAuth;
    isAuthSeller = useSellerStore.getState().isSellerAuth;
  };
  const toProfile = async () => {
    await updateAuth();
    if (isAuthClient) {
      navigate("/client/profile");
    } else if (isAuthSeller) {
      navigate("/seller/profile");
    } else {
      navigate("/client/sign-in");
    }
  };

  const toClientOrders = async () => {
    await updateAuth();
    if (isAuthClient) {
      navigate("/cleint/order");
    } else {
      navigate("/client/sign-in");
    }
  };

  const toClientCart = async () => {
    await updateAuth();
    if (isAuthClient) {
      navigate("/client/cart");
    } else {
      navigate("/client/sign-in");
    }
  };

  const toCatalog = () => {
    navigate("/catalog");
  };

  const toHome = () => {
    navigate("/home");
  };

  const toSeller = async () => {
    await updateAuth();
    if (isAuthSeller) {
      navigate("/seller/profile");
    } else {
      navigate("/seller/sign-in");
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.upperHeader}>
          <span className={styles.span}>RUB</span>
          <span className={styles.span} onClick={toSeller}>
            Для продавцов
          </span>
          <span className={styles.span}>Пункты выдачи</span>
          <span className={styles.span}>Москва. Уточнить адрес</span>
        </div>
        <div className={styles.headerMain}>
          <div className={styles.logoNameContainer}>
            <div className={styles.imgLogo}>
              <svg
                width="21"
                height="28"
                viewBox="0 0 21 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="13" width="10" height="15" fill="#005675" />
                <rect x="11" width="10" height="15" fill="#005675" />
                <rect
                  y="17"
                  width="7"
                  height="21"
                  transform="rotate(-90 0 17)"
                  fill="#005675"
                />
              </svg>
            </div>
            <h1 className={styles.h1} onClick={toHome}>
              Bazario
            </h1>
          </div>
          <div className={styles.headerInputContainer}>
            <input
              type="text"
              className={styles.headerInput}
              placeholder="Искать на Bazario"
            />
            <div className={styles.imgSearch}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_47_72)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.5306 20.4694L16.8366 15.7762C19.6629 12.383 19.3204 7.36693 16.0591 4.38935C12.7978 1.41176 7.77134 1.526 4.64867 4.64867C1.526 7.77134 1.41176 12.7978 4.38935 16.0591C7.36693 19.3204 12.383 19.6629 15.7762 16.8366L20.4694 21.5306C20.7624 21.8237 21.2376 21.8237 21.5306 21.5306C21.8237 21.2376 21.8237 20.7624 21.5306 20.4694ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25C6.77379 17.2459 3.75413 14.2262 3.75 10.5Z"
                    fill="#758595"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_47_72">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <button
              className={styles.button}
              type="button"
              name=""
              id={styles.btn1}
            >
              Найти
            </button>
          </div>
          <div className={styles.headerButtonsContainer}>
            <button
              className={styles.headerButton}
              type="button"
              name=""
              id={styles.btn1}
              onClick={toCatalog}
            >
              <div className={styles.img}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="12" width="9" height="9" rx="3" fill="#005675" />
                  <rect width="9" height="9" rx="3" fill="#005675" />
                  <rect y="11" width="9" height="9" rx="3" fill="#005675" />
                  <rect
                    x="12"
                    y="11"
                    width="9"
                    height="9"
                    rx="3"
                    fill="#005675"
                  />
                </svg>
              </div>
            </button>
            <button
              className={styles.headerButton}
              id={styles.btn2}
              onClick={toClientOrders}
            >
              <div className={styles.img}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.0887 8.18593L21.8811 5.39142C21.9247 5.34894 21.9579 5.29687 21.978 5.23933C21.9981 5.18179 22.0045 5.12035 21.9968 5.05988C21.9888 4.999 21.9669 4.94077 21.9331 4.88957C21.8992 4.83838 21.8541 4.79559 21.8013 4.7644L14.2707 0.409675C14.1948 0.366189 14.1067 0.349153 14.02 0.361177C13.9334 0.3732 13.8532 0.413646 13.792 0.476165L10.9996 3.26925L8.20728 0.476856C8.14585 0.414213 8.06547 0.373668 7.97863 0.361522C7.8918 0.349375 7.80339 0.366286 7.72718 0.409675L0.198017 4.7644C0.144437 4.79455 0.0988486 4.83713 0.0650684 4.88854C0.0312883 4.93995 0.0102991 4.99868 0.00385776 5.05988C-0.00445368 5.12001 0.00115661 5.18124 0.0202549 5.23885C0.0393532 5.29647 0.0714278 5.34894 0.113999 5.39216L2.90778 8.18593L0.113999 10.9833C0.0712935 11.0264 0.0391295 11.0788 0.0200224 11.1365C0.000915282 11.1941 -0.00461714 11.2554 0.00385776 11.3155C0.0111108 11.376 0.0324612 11.434 0.0661872 11.4847C0.0999131 11.5354 0.145071 11.5775 0.198017 11.6075L3.07017 13.2702V16.8904C3.07017 17.0339 3.14783 17.164 3.26856 17.2354L10.8005 21.5901C10.8605 21.6257 10.9292 21.6438 10.9989 21.6424C11.0686 21.6435 11.1372 21.6254 11.1973 21.5901L18.7265 17.2354C18.7867 17.2002 18.8367 17.1498 18.8715 17.0893C18.9063 17.0288 18.9247 16.9602 18.9249 16.8904V13.2709L21.7999 11.6075C21.8522 11.5764 21.897 11.534 21.9308 11.4834C21.9647 11.4327 21.9867 11.3751 21.9954 11.3148C22.0033 11.2544 21.9969 11.1929 21.9768 11.1353C21.9567 11.0777 21.9234 11.0257 21.8796 10.9833L19.0887 8.18593ZM17.7317 8.18593L10.9996 12.0797L4.26478 8.18593L9.31434 5.26703L10.9996 4.295L17.0892 7.81339L17.7317 8.18593ZM14.138 1.25235L20.954 5.19704L18.4624 7.68895L18.0543 7.45285L11.645 3.74853L14.138 1.25308V1.25235ZM7.86132 1.25235L10.3536 3.74853L3.53474 7.68895L1.04244 5.19704L7.86132 1.25235ZM3.53474 8.68291L10.3508 12.6262L7.8592 15.1181L3.66606 12.6948H3.66465L1.04173 11.1777L3.53474 8.68291ZM3.86446 13.7304L7.72647 15.9608C7.78628 15.9963 7.85461 16.0149 7.92416 16.0145C7.93263 16.0145 7.93828 16.0046 7.94746 16.0046C8.04345 16.0035 8.13548 15.9661 8.20516 15.9L10.6021 13.5V20.558L3.86446 16.6599V13.7304ZM18.1299 16.6614L11.3964 20.5551V13.5007L13.7906 15.9007C13.8612 15.9714 13.953 15.9997 14.0469 16.0053C14.0554 16.0053 14.0631 16.0152 14.0702 16.0152C14.14 16.016 14.2087 15.9974 14.2686 15.9615L18.1306 13.7304V16.6614H18.1299ZM14.1366 15.1188L11.645 12.6269L18.4624 8.68364L20.9547 11.1791L14.1366 15.1188Z"
                    fill="black"
                  />
                </svg>
              </div>
            </button>
            <button
              className={styles.headerButton}
              id={styles.btn3}
              onClick={toProfile}
            >
              <div className={styles.img}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_47_60)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.0406 16.5625C16.8508 14.5055 15.0172 13.0305 12.8773 12.3313C15.053 11.0361 16.0951 8.44698 15.4235 6.00575C14.7518 3.56451 12.5319 1.87287 10 1.87287C7.46806 1.87287 5.24816 3.56451 4.57652 6.00575C3.90487 8.44698 4.94704 11.0361 7.12266 12.3313C4.98281 13.0297 3.14922 14.5047 1.95938 16.5625C1.84059 16.7562 1.83627 16.9991 1.94811 17.1969C2.05995 17.3947 2.27031 17.5162 2.49752 17.5142C2.72473 17.5123 2.93298 17.3872 3.04141 17.1875C4.51328 14.6438 7.11484 13.125 10 13.125C12.8852 13.125 15.4867 14.6438 16.9586 17.1875C17.067 17.3872 17.2753 17.5123 17.5025 17.5142C17.7297 17.5162 17.9401 17.3947 18.0519 17.1969C18.1637 16.9991 18.1594 16.7562 18.0406 16.5625ZM5.625 7.5C5.625 5.08375 7.58375 3.125 10 3.125C12.4162 3.125 14.375 5.08375 14.375 7.5C14.375 9.91625 12.4162 11.875 10 11.875C7.58483 11.8724 5.62758 9.91517 5.625 7.5Z"
                      fill="#121417"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_47_60">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
            <button
              className={styles.headerButton}
              id={styles.btn4}
              onClick={toClientCart}
            >
              <div className={styles.img}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_47_65)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.3547 4.59922C17.2359 4.45709 17.0602 4.37497 16.875 4.375H4.27187L3.88984 2.27656C3.78186 1.68219 3.26426 1.25009 2.66016 1.25H1.25C0.904822 1.25 0.625 1.52982 0.625 1.875C0.625 2.22018 0.904822 2.5 1.25 2.5H2.65625L4.65312 13.4602C4.71195 13.7852 4.8556 14.0889 5.06953 14.3406C4.24996 15.1061 4.14205 16.3674 4.81967 17.261C5.49729 18.1546 6.74093 18.391 7.69916 17.8084C8.6574 17.2257 9.01981 16.0128 8.53828 15H12.0867C11.9469 15.2927 11.8745 15.6131 11.875 15.9375C11.875 17.1456 12.8544 18.125 14.0625 18.125C15.2706 18.125 16.25 17.1456 16.25 15.9375C16.25 14.7294 15.2706 13.75 14.0625 13.75H6.49766C6.1956 13.75 5.9368 13.5339 5.88281 13.2367L5.63516 11.875H14.6977C15.6038 11.8749 16.3802 11.2267 16.5422 10.3352L17.4922 5.11172C17.5247 4.92894 17.4744 4.74115 17.3547 4.59922ZM7.5 15.9375C7.5 16.4553 7.08027 16.875 6.5625 16.875C6.04473 16.875 5.625 16.4553 5.625 15.9375C5.625 15.4197 6.04473 15 6.5625 15C7.08027 15 7.5 15.4197 7.5 15.9375ZM15 15.9375C15 16.4553 14.5803 16.875 14.0625 16.875C13.5447 16.875 13.125 16.4553 13.125 15.9375C13.125 15.4197 13.5447 15 14.0625 15C14.5803 15 15 15.4197 15 15.9375ZM15.3125 10.1117C15.2584 10.4098 14.9982 10.6261 14.6953 10.625H5.40781L4.49922 5.625H16.1258L15.3125 10.1117Z"
                      fill="#121417"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_47_65">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
