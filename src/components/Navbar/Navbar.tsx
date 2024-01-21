import {FC, useRef} from 'react';
import styles from './Navbar.module.scss';
import {useAppDispatch} from '@/hooks/hooks';
import {addGroup} from '@/store/form/form';
import useTabState from '@/hooks/useTabState';

export const Navbar: FC = () => {
  const pageId = useRef<number>(0);
  pageId.current = new Date().getTime()
  const [tabIndex, totalNumberOfTabs] = useTabState(pageId.current);

  const dispatch = useAppDispatch();
  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>Форма</div>
        <div className={styles.tabs}>{`Вкладка ${tabIndex} из ${totalNumberOfTabs}`}</div>
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
