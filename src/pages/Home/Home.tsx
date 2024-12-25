import CardProduct from '../../components/Card/CardProduct/CardProduct'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <CardProduct />
      <CardProduct />
      <CardProduct />
    </div>
  )
}

export default Home