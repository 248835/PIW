import React from 'react';
import Header from '../Header/Header';
import { Main, Body } from './Layout.style';
import Footer from '../Footer';

interface ILayout {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayout> = ({ children }: ILayout) => {
  return (
    <Main>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Main>
  );
};

export default Layout;
