import {FC, useEffect} from 'react';
import {Main} from '@/components/Main';
import {Navbar} from '@/components/Navbar';
import {SubmitButton} from './components/Modal';

const App: FC = () => {
  useEffect(() => {
    console.log('App');
    return () => {
      localStorage.setItem('testSave', 'saved data on close');
    };
  }, []);
  return (
    <>
      <Navbar />
      <Main />
      <SubmitButton />
    </>
  );
};

export default App;
