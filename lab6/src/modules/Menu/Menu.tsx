import Layout from '../../components/Layout';
import { getAllPizzas } from '../../firebase';
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import firebase from 'firebase';
import PizzaItem from '../../components/PizzaItem';

const Home = () => {
  const [pizzas, setPizzas] = React.useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    getAllPizzas().then(it => {
      let tab: firebase.firestore.DocumentData = [];
      it.docs.forEach(pizza => {
        tab.push(pizza.data());
      });
      setPizzas(tab);
    });
  }, []);

  return (
    <Layout>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {pizzas !== undefined &&
          pizzas.map((it: firebase.firestore.DocumentData, index: number) => (
            <PizzaItem data={it} key={index} />
          ))}
      </Grid>
    </Layout>
  );
};

export default Home;
