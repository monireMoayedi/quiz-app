import styles from "./Pyramid.module.css";
import prizes from "../data/prizes";
function Pyramid({ currentTrivia }) {
  return (
    <div className={styles.pyramid}>
      <ul className={styles.moneyList}>
        {prizes.map((p) => (
          <li
            className={
              p.id === currentTrivia.id
                ? `${styles.moneyListItem} ${styles.active}`
                : styles.moneyListItem
            }
          >
            <span className={styles.moneyListItemNumber}>{p.id}</span>
            <span className={styles.moneyListItemAmount}>$ {p.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pyramid;
