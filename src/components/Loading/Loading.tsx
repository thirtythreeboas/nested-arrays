import {FC, useRef} from 'react';
import styles from './Loading.module.scss';

export const Loading: FC = () => {
  const render = useRef<number>(0);

  return <div className={styles.loading}>{`Ждём-с... Renders: ${render.current++}`}</div>;
};
