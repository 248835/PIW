import styled from 'styled-components';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

export const Box = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Description = styled.div`
  display: block;
  position: relative;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s linear, opacity 0.3s linear;
  width: 15rem;
`;

export const Menu = styled.div`
  text-align: center;
  &:hover {
    ${Description} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const Create = styled.div`
  text-align: center;
  &:hover {
    ${Description} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const MenuButton = styled(MenuBookIcon)`
  min-width: 7rem;
  min-height: 7rem;
  max-width: 7rem;
  max-height: 7rem;
`;

export const CreateButton = styled(WbIncandescentIcon)`
  min-width: 7rem;
  min-height: 7rem;
  max-width: 7rem;
  max-height: 7rem;
  transform: rotate(180deg);
`;
