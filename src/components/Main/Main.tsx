import {FC, memo, useRef} from 'react';
import {useAppSelector} from '@/hooks/hooks';
import {Group} from '@/components/Group';
import styles from './Main.module.scss';

export const Main: FC = memo(() => {
  const {groups} = useAppSelector(({FORM}) => FORM);
  const render = useRef<number>(0);

  render.current++;
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
        <Group group={group} groupNum={index + 1} key={group.id} />
      ))}
    </div>
  );
});
