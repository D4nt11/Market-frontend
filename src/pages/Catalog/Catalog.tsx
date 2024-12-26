import ProductsCatalog from '../ProductsCatalog/ProductsCatalog'
import SellerCatalog from '../SellerCatalog/SellerCatalog'
import styles from './Catalog.module.css'

const Catalog = () => {
  return (
    <div className={styles.mainContainer}>
        <ProductsCatalog />
        {/* <SellerCatalog /> */}
    </div>
  )
}

export default Catalog