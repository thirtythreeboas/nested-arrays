import {FC, memo, useRef} from 'react';
import {IProduct} from '@/models/interfaces';
import {useAppDispatch} from '@/hooks/hooks';
import {deleteProduct, setCount} from '@/store/form/form';
import {handleTwoDecimalPlaces} from '@/utils/handleTwoDecimalPlaces';
import styles from './Product.module.scss';

interface ProductProps {
  product: IProduct;
}

export const Product: FC<ProductProps> = memo(({product}) => {
  const dispatch = useAppDispatch();
  const render = useRef<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldType = e.target.name === 'count' ? 'count' : 'price';
    const isNotEmpty = e.target.value.length !== 0;
    const value = isNotEmpty ? parseFloat(e.target.value) : 0;
    dispatch(setCount({type: fieldType, value, id: product.id}));
  };

  render.current++;
  return (
    <div className={styles.product}>
      <div className={styles.detail}>{`Название: ${product.name}`}</div>
      <div className={styles.detail}>
        Цена:
        <input
          className={styles.input}
          type='number'
          name='price'
          step='.01'
          value={handleTwoDecimalPlaces(product.price) || ''}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={styles.detail}>
        Количество:
        <input
          className={styles.input}
          type='number'
          name='count'
          value={product.count || ''}
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className={styles.detail}>{`Сумма: ${handleTwoDecimalPlaces(product.sum)}`}</div>
      <div className={styles.btnWrapper}>
        <button type='button' className={styles.removeBtn} onClick={() => dispatch(deleteProduct(product.id))}>
          Удалить продукт
        </button>
      </div>
      <span className={styles.render}>{`Renders: ${render.current}`}</span>
    </div>
  );
});
