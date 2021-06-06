import Layout from '../../components/Layout';
import { addOrder, getPizza } from '../../firebase';
import React, { useEffect } from 'react';
import firebase from 'firebase';
import { Box } from './PizzaPage.style';
import { Button, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const PizzaPage = () => {
  const [pizza, setPizza] = React.useState<firebase.firestore.DocumentData>();
  const path = window.location.pathname.split('/');
  const history = useHistory();

  useEffect(() => {
    getPizza(path[path.length - 1]).then(it => {
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
          <Typography variant="subtitle1">
            Aby zapisać pizzę w historii należy być zalogowanym!
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={`/menu/${path[path.length - 1]}/order`}
            onClick={() => {
              if (pizza !== undefined)
                addOrder({
                  ingredients: pizza.ingredients,
                  name: pizza.name,
                  image: pizza.image,
                });
            }}
          >
            Zamów!
          </Button>
        </div>
      </Box>
    </Layout>
  );
};

export default PizzaPage;
