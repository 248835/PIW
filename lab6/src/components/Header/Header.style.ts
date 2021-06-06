import styled from 'styled-components';

export const Main = styled.div`
  display: grid;
  grid-template-areas: '. logo button';
  grid-template-columns: 200px auto 200px;
  grid-auto-rows: auto;
  border-bottom: 1px solid orangered;
  background-color: bisque;
`;

export const Logo = styled.div`
  grid-area: logo;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const UserButton = styled.div`
  grid-area: button;
  display: block;
  margin: auto;
  text-align: center;
`;
