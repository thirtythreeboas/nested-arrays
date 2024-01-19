import {FC, useEffect, memo, useRef} from 'react';
import {ISubGroup} from '@/models/interfaces';
import {Product} from '@/components/Product';
import styles from './SubGroup.module.scss';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteSubGroup} from '@/store/form/form';
import {addProduct} from '@/store/form/form';

interface SubGroupProps extends ISubGroup {
  subGroupNum: number;
}

export const SubGroup: FC<SubGroupProps> = memo(({subGroupNum, ...subGroup}) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);
  useEffect(() => {
    console.log('SubGroup');
  }, []);
  render.current++
  return (
    <div className={styles.subGroup}>
      <div className={styles.header}>
        <div>{`Подгруппа ${subGroupNum}`}</div>
        <div className={styles.sum}>{`Сумма ${subGroup.sum}`}</div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.addBtn}
            onClick={() => dispatch(addProduct(subGroup.id))}
          >
            Добавить продукт
          </button>
        </div>
        <div className={styles.btnWrapper}>
          <button
            className={styles.removeBtn}
            onClick={() => dispatch(deleteSubGroup(subGroup.id))}
          >
            Удалить подгруппу
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
      {subGroup.products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  );
});
