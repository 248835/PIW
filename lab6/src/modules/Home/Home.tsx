import Layout from '../../components/Layout';
import {
  Box,
  CreateButton,
  MenuButton,
  Description,
  Menu,
  Create,
} from './Home.style';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <Box>
        <Menu>
          <IconButton color="secondary" component={Link} to="/menu">
            <MenuButton />
          </IconButton>
          <Description>
            Wybierz swoją ulubioną pizzę z naszego menu!
          </Description>
        </Menu>
        <Create>
          <IconButton color="secondary" component={Link} to="/create">
            <CreateButton />
          </IconButton>
          <Description>Stwórz swoją własną wyśmienitą kompozycję!</Description>
        </Create>
      </Box>
    </Layout>
  );
};

export default Home;
