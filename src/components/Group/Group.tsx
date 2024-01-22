import {FC, memo, useRef} from 'react';
import {SubGroup} from '@/components/SubGroup';
import {IGroup} from '@/models/interfaces';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteGroup, addSubGroup} from '@/store/form/form';
import {handleTwoDecimalPlaces} from '@/utils/handleTwoDecimalPlaces';
import styles from './Group.module.scss';

interface GroupProps {
  group: IGroup;
  groupNum: number;
}

export const Group: FC<GroupProps> = memo(({group, groupNum}) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);

  render.current++;
  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <div>{`Группа ${groupNum}`}</div>
        <div className={styles.sum}>{`Сумма ${handleTwoDecimalPlaces(group.sum)}`}</div>
        <div className={styles.btnWrapper}>
          <button type='button' className={styles.addBtn} onClick={() => dispatch(addSubGroup(group.id))}>
            Добавить подгруппу
          </button>
        </div>
        <div className={styles.btnWrapper}>
          <button type='button' className={styles.removeBtn} onClick={() => dispatch(deleteGroup(group.id))}>
            Удалить группу
          </button>
        </div>
        <span className={styles.render}>{`Renders: ${render.current}`}</span>
      </div>
      {group.subGroups.map((subGroup, index) => (
        <SubGroup subGroup={subGroup} subGroupNum={index + 1} key={subGroup.id} />
      ))}
    </div>
  );
});
