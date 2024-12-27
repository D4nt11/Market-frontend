import CardCart from '../../components/Card/CardCart/CardCart'
import styles from './Cart.module.css'

const Cart = () => {
  return (
    <div className={styles.container}>
        <section className={styles.left}>
            <h1 className={styles.h1}>Корзина</h1>
            <CardCart />
        </section>
        <section className={styles.right}></section>
    </div>
  )
}

export default Cart