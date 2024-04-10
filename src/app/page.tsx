'use client';
import { HomeWrapper } from './style';
import PopUp from './components/popUp/index';
import Form from './components/form';

export default function Home() {
  return (
    <HomeWrapper>
      {/* <PopUp /> //todo*/}
      <Form />
    </HomeWrapper>
  );
  //todo api (env/ mock)
  //todo store
  //todo custom hook
  //todo rwd
}
