import Layout from '../../components/Layout';
import React from 'react';
import { Typography } from '@material-ui/core';

const CreatedPizza = () => {
  return (
    <Layout>
      <div
        style={{
          textAlign: 'center',
          width: '50%',
          margin: 'auto',
        }}
      >
        <img
          src="https://ocs-pl.oktawave.com/v1/AUTH_575e1402-c9da-4827-9d55-006a9cf93c9d/dominium_prod/media/org/public/product/large/140001.jpg"
          alt="pizza"
          style={{ height: '30vh' }}
        />
        <Typography variant="subtitle1" style={{ marginTop: '1.5rem' }}>
          Złożono zamówienie!
        </Typography>
      </div>
    </Layout>
  );
};

export default CreatedPizza;
