'use client';
import { HomeWrapper } from './style';
import PopUp from './components/popUp/index';
import Form from './components/form';

export default function Home() {
  return (
    <HomeWrapper>
      <Form />
      <PopUp />
    </HomeWrapper>
  );
  //todo input extract style
  //todo rwd
}
