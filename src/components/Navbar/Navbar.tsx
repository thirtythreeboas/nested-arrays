import {FC, useEffect} from 'react';
import styles from './Navbar.module.scss';
import {useAppDispatch} from '@/hooks/hooks';
import {
  addGroup,
  setLocalStorage,
  restoreUnsubmittedValue,
} from '@/store/form/form';
import useTabState from '@/hooks/useTabState';

export const Navbar: FC = () => {
  const [tabIndex, totalNumberOfTabs] = useTabState();

  useEffect(() => {
    const item = localStorage.getItem('form');
    if (item) {
      dispatch(restoreUnsubmittedValue());
    }

    const storeState = () => {
      dispatch(setLocalStorage());
    };

    window.addEventListener('unload', storeState);
    return () => {
      window.removeEventListener('unload', storeState);
    };
  }, []);

  const dispatch = useAppDispatch();
  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Форма</div>
        <div
          className={styles.tabs}
        >{`Вкладка ${tabIndex} из ${totalNumberOfTabs}`}</div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.addBtn}
            onClick={() => dispatch(addGroup())}
          >
            Добавить группу
          </button>
        </div>
      </div>
    </nav>
  );
};
