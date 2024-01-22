import {FC, memo, useRef} from 'react';
import {useAppSelector} from '@/hooks/hooks';
import {Group} from '@/components/Group';
import {FormProvider, useForm} from 'react-hook-form';
import {IGroup} from '@/models/interfaces';
import styles from './Main.module.scss';

export const Main: FC = memo(() => {
  const {groups} = useAppSelector(({FORM}) => FORM);
  const render = useRef<number>(0);

  const methods = useForm<any>();
  const onSubmit = (data: any) => console.log(data);

  render.current++;
  return (
    <FormProvider {...methods}>
      <form className={styles.main} onSubmit={methods.handleSubmit(onSubmit)}>
        <span
          className={styles.render}
        >{`Main Renders: ${render.current}`}</span>
        {groups.map((group, index) => (
          <Group group={group} groupNum={index + 1} key={group.id} />
        ))}
      </form>
    </FormProvider>
  );
});
