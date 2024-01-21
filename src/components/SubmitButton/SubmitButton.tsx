import {FC, useState} from 'react';
import styles from './SubmitButton.module.scss';
import {useAppSelector, useAppDispatch} from '@/hooks/hooks';
import {hasEmptyValues} from '@/utils/hasEmptyValues';
import { handleSubmissionState } from '@/store/form/form';

export const SubmitButton: FC = () => {
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  const {groups} = useAppSelector(({FORM}) => FORM);

  const handleSubmit = () => {
    const hasNoZeros = hasEmptyValues(groups);
    if (hasNoZeros) {
      if (error) setError(!error);
      dispatch(handleSubmissionState());
      console.log(JSON.stringify(groups));
    } else {
      setError(true);
    }
  };

  return (
    <button type='button' className={styles.submit} style={{backgroundColor: error ? '#ff7979' : '#313338'}} onClick={handleSubmit}>
      {error ? (
        <span className={styles.error}>
          Не должно быть пустых значений или значений равных нулю!
        </span>
      ) : (
        'Лог в консоль'
      )}
    </button>
  );
};
