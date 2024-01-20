import {FC} from 'react';
import {Main} from '@/components/Main';
import {Navbar} from '@/components/Navbar';
import {SubmitButton} from '@/components/Modal';
import useTabState from '@/hooks/useTabState';

const App: FC = () => {
  const [counter, setCounter] = useTabState<number>(0, 'counter');

  return (
    <>
      <div>
        <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      </div>
      <Navbar />
      <Main />
      <SubmitButton />
    </>
  );
};

export default App;
