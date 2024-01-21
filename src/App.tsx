import {FC} from 'react';
import {Main} from '@/components/Main';
import {Navbar} from '@/components/Navbar';
import {SubmitButton} from '@/components/SubmitButton';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <Main />
      <SubmitButton />
    </>
  );
};

export default App;
