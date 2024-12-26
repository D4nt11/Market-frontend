import { useNavigate } from 'react-router-dom';
import styles from './CardCategory.module.css'


// export interface category{
//     id: string;
//     name: string;
//     img: string;
// }


const CardCategory = ({...category}) => {
    const navigate = useNavigate()
    const toCategory = () => {
      navigate(`category/${category.id}`)
    }

  return (
    <div className={styles.container} onClick={toCategory}>
        {/* <div className={styles.imgContainer}>
            <img className={styles.img} src={category.img} alt="img" />
        </div> */}
        <p className={styles.name}>{category.name}</p>
    </div>
  )
}

export default CardCategory