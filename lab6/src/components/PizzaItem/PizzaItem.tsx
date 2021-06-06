import firebase from 'firebase';
import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

interface PizzaProps {
  data: firebase.firestore.DocumentData;
  disabled?: boolean;
}

const useStyles = makeStyles({
  root: {
    // maxWidth: 245,
    height: 370,
    // minWidth: 340,
  },
  media: {
    // height: 0,
    paddingTop: '70%', // 16:9,
    // marginTop: '30',
  },
});

const PizzaItem = ({ data, disabled = false }: PizzaProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={3} key={data.name}>
      <Card className={classes.root}>
        <CardActionArea
          className={classes.root}
          component={Link}
          to={`/menu/${data.name}`}
          disabled={disabled}
        >
          <CardMedia
            className={classes.media}
            image={data.image}
            title="image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.ingredients.join(', ')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default PizzaItem;
