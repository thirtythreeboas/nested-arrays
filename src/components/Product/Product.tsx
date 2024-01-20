import {FC, memo, useRef} from 'react';
import {IProduct} from '@/models/interfaces';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteProduct, setCount} from '@/store/form/form';
import styles from './Product.module.scss';

export const Product: FC<IProduct> = memo((product) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldType = e.target.name === 'count' ? 'count' : 'price'
    const isNotEmpty = e.target.value.length !== 0;
      const value = isNotEmpty ? parseInt(e.target.value, 10) : 0;
      console.log(value);
      dispatch(setCount({type: fieldType, value, id: product.id}))
  };

  render.current++;
  return (
    <div className={styles.product}>
      <div className={styles.detail}>{`Название: ${product.name}`}</div>
      <div className={styles.detail}>
        Цена:
        <input
          className={styles.input}
          type='text'
          name='price'
          value={product.price || ''}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={styles.detail}>
        Количество:
        <input
          className={styles.input}
          type='text'
          name='count'
          value={product.count || ''}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div
        className={styles.detail}
      >{`Сумма: ${product.sum}`}</div>
      <div className={styles.btnWrapper}>
        <button
          className={styles.removeBtn}
          onClick={() => dispatch(deleteProduct(product.id))}
        >
          Удалить продукт
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
  );
});
