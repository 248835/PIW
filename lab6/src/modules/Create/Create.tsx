import Layout from '../../components/Layout';
import { Autocomplete } from '@material-ui/lab';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { addOrder, getIngredients } from '../../firebase';
import React, { useEffect } from 'react';
import firebase from 'firebase/app';

const Create = () => {
  const [ingredients, setIngredients] =
    React.useState<Array<firebase.firestore.DocumentData>>();
  const [value, setValue] = React.useState<any>('');

  useEffect(() => {
    getIngredients().then(it => {
      let tab: Array<firebase.firestore.DocumentData> = [];
      it.docs.forEach(it => tab.push(it.data()));
      setIngredients(tab);
      setValue(
        tab
          .filter(
            it =>
              it.skladnik.includes('sos pomidorowy') ||
              it.skladnik.includes('mozarella'),
          )
          .map(it => it.skladnik),
      );
      // console.log(
      //   tab
      //     .filter(
      //       it =>
      //         it.skladnik.includes('sos pomidorowy') ||
      //         it.skladnik.includes('mozarella'),
      //     )
      //     .map(it => it.skladnik),
      // );
    });
  }, []);

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
        {ingredients && (
          <Autocomplete
            multiple
            id="tags-standard"
            options={ingredients}
            getOptionLabel={ingredients => ingredients.skladnik}
            defaultValue={ingredients.filter(
              it =>
                it.skladnik.includes('sos pomidorowy') ||
                it.skladnik.includes('mozarella'),
            )}
            renderInput={params => (
              <TextField {...params} variant="standard" label="Składniki" />
            )}
            onChange={(event, vals) => {
              setValue(vals.map(it => it.skladnik));
            }}
          />
        )}
        <Typography variant="subtitle1" style={{ marginTop: '1.5rem' }}>
          Aby zapisać pizzę w historii należy być zalogowanym!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '1.5rem' }}
          component={Link}
          to={`/create/order`}
          onClick={() => {
            if (value !== undefined)
              addOrder({
                ingredients: value,
                name: 'Własna kompozycja',
                image:
                  'https://ocs-pl.oktawave.com/v1/AUTH_575e1402-c9da-4827-9d55-006a9cf93c9d/dominium_prod/media/org/public/product/large/140001.jpg',
              });
          }}
        >
          Zamów!
        </Button>
      </div>
    </Layout>
  );
};

export default Create;
