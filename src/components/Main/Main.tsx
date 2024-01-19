import {FC, useEffect, memo, useRef} from 'react';
import styles from './Main.module.scss';
import {useAppSelector} from '@/hooks/hooks';
import {Group} from '@/components/Group';

export const Main: FC = memo(() => {
  const {groups} = useAppSelector(({FORM}) => FORM);
  const render = useRef<number>(0);
  useEffect(() => {
    console.log('Main');
  }, []);
  render.current++
  return (
    <div className={styles.main}>
      <span
        style={{
          color: 'red',
          fontSize: '16px',
          margin: '0 10px',
          fontWeight: 600,
        }}
      >{`Main Renders: ${render.current}`}</span>
      {groups.map((group, index) => (
        <Group {...group} groupNum={index + 1} key={group.id} />
      ))}
    </div>
  );
});
