'use client';
import { HomeWrapper } from './style';
import PopUp from './_components/popUp/index';
import Form from './_components/form';

export default function Home() {
  return (
    <HomeWrapper>
      <Form />
      <PopUp />
    </HomeWrapper>
  );
}
