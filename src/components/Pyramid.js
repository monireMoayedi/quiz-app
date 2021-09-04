import { useEffect } from "react";
import styles from "./Pyramid.module.css";
import prizes from "../data/prizes";
function Pyramid({ currentTrivia, userPrize }) {
  useEffect(() => {
    userPrize(prizes[prizes.length - currentTrivia.id + 1]?.amount || 0);
  }, [currentTrivia.id, userPrize]);

  return (
    <div className={styles.pyramid}>
      <ul className={styles.moneyList}>
        {prizes.map((p) => (
          <li
            key={p.id}
            className={
              p.id === currentTrivia.id - 1
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
