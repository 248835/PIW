import React, { useEffect } from 'react';
import firebase from 'firebase';
import { getPizza } from '../../firebase';
import Layout from '../../components/Layout';
import { Typography } from '@material-ui/core';
import { Box } from './OrderedPage.style';
import { useHistory } from 'react-router-dom';

const OrderedPage = () => {
  const [pizza, setPizza] = React.useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const history = useHistory();
    const path = window.location.pathname.split('/');
    const id = path[path.length - 2];
    getPizza(id).then(it => {
      setPizza(it.data());
      if (it.data() === undefined) {
        history.replace('/404');
      }
    });
  }, []);

  return (
    <Layout>
      <Box style={{ textAlign: 'center' }}>
        <div>
          <Typography variant="h2">
            {pizza !== undefined && pizza.name}
          </Typography>
          <Typography variant="subtitle1">
            {pizza !== undefined && pizza.ingredients.join(', ')}
          </Typography>
        </div>
        <div>
          {pizza !== undefined && (
            <img src={pizza.image} alt="obrazek" style={{ height: '40vh' }} />
          )}
        </div>
        <div>
          <Typography variant="subtitle1">Pizza została zamówiona!</Typography>
        </div>
      </Box>
    </Layout>
  );
};

export default OrderedPage;
