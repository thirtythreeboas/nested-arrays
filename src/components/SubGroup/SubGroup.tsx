import {FC, memo, useRef} from 'react';
import {ISubGroup} from '@/models/interfaces';
import {Product} from '@/components/Product';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteSubGroup, addProduct} from '@/store/form/form';
import {handleTwoDecimalPlaces} from '@/utils/handleTwoDecimalPlaces';
import styles from './SubGroup.module.scss';

interface SubGroupProps {
  subGroup: ISubGroup;
  subGroupNum: number;
}

export const SubGroup: FC<SubGroupProps> = memo(({subGroup, subGroupNum}) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);

  render.current++;
  return (
    <div className={styles.subGroup}>
      <div className={styles.header}>
        <div>{`Подгруппа ${subGroupNum}`}</div>
        <div className={styles.sum}>{`Сумма ${handleTwoDecimalPlaces(subGroup.sum)}`}</div>
        <div className={styles.btnWrapper}>
          <button type='button' className={styles.addBtn} onClick={() => dispatch(addProduct(subGroup.id))}>
            Добавить продукт
          </button>
        </div>
        <div className={styles.btnWrapper}>
          <button type='button' className={styles.removeBtn} onClick={() => dispatch(deleteSubGroup(subGroup.id))}>
            Удалить подгруппу
          </button>
        </div>
        <span className={styles.render}>{`Renders: ${render.current}`}</span>
      </div>
      {subGroup.products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
});
