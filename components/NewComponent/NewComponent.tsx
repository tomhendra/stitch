import * as CONSTANTS from './NewComponent.constants';
import { useCount } from './useCount';
import { someHelperFn } from './NewComponent.helpers';
import { NewComponentChild } from './NewComponentChild';
import styles from './NewComponent.module.css';

function NewComponent() {
  const title = someHelperFn(CONSTANTS.TITLE);
  const [count, setCount] = useCount();

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button className={styles.button} onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <NewComponentChild count={count} />
    </div>
  );
}

export { NewComponent };
