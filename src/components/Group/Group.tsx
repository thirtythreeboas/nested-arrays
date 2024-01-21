import {FC, memo, useRef} from 'react';
import {SubGroup} from '@/components/SubGroup';
import {IGroup} from '@/models/interfaces';
import styles from './Group.module.scss';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteGroup, addSubGroup} from '@/store/form/form';
import {handleTwoDecimalPlaces} from '@/utils/handleTwoDecimalPlaces';

interface GroupProps extends IGroup {
  groupNum: number;
}

export const Group: FC<GroupProps> = memo(({ groupNum, ...group }) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);

  render.current++;
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <div>{`Группа ${groupNum}`}</div>
        <div className={styles.sum}>{`Сумма ${handleTwoDecimalPlaces(group.sum)}`}</div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.addBtn}
            onClick={() => dispatch(addSubGroup(group.id))}
          >
            Добавить подгруппу
          </button>
        </div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.removeBtn}
            onClick={() => dispatch(deleteGroup(group.id))}
          >
            Удалить группу
          </button>
        </div>
        <span
          style={{
            color: 'red',
            fontSize: '16px',
            margin: '0 10px',
            fontWeight: 600,
          }}
        >{`Renders: ${render.current}`}</span>
      </div>
      {group.subGroups.map((subGroup, index) => (
        <SubGroup {...subGroup} subGroupNum={index + 1} key={subGroup.id} />
      ))}
    </div>
  );
});
