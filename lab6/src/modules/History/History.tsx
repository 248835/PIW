import Layout from '../../components/Layout';
import React, { useEffect } from 'react';
import { auth, getOrders } from '../../firebase';
import firebase from 'firebase/app';
import {
  ButtonBase,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      marginTop: 10,
      marginBottom: 10,
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);

const History = () => {
  const classes = useStyles();
  const [history, setHistory] =
    React.useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    if (auth.currentUser)
      getOrders(auth.currentUser.uid).then(response => {
        let tab: firebase.firestore.DocumentData = [];
        response.forEach(it => {
          tab.push(it.data());
        });
        setHistory(tab);
      });
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {history !== undefined &&
          history.map((it: firebase.firestore.DocumentData, index: number) => (
            <div className={classes.root} key={index}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image} disabled>
                      <img
                        className={classes.img}
                        alt="pizza"
                        src={
                          it.image
                            ? it.image
                            : 'https://ocs-pl.oktawave.com/v1/AUTH_575e1402-c9da-4827-9d55-006a9cf93c9d/dominium_prod/media/org/public/product/large/140001.jpg'
                        }
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {it.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {it.ingredients.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {it.time}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default History;
