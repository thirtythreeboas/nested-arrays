import {FC} from 'react';
import styles from './Navbar.module.scss';
import {useAppDispatch} from '@/hooks/hooks';
import {addGroup} from '@/store/form/form';
import useTabState from '@/hooks/useTabState';

export const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Форма</div>
        <div className={styles.tabs}>Вкладка 1 из 2</div>
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
