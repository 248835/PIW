import {Chip, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import {hashCode} from "../utils/HashCode";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
  }
}));

export const UserGrid = (props) => {
  const classes = useStyles();

  return (

    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <PersonIcon style={{fontSize: 128}}/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" justify="space-evenly"
                alignItems="flex-start">
            <Typography gutterBottom variant="h6">
              {props.vals.imieNazwisko}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {props.vals.opis}
            </Typography>
            <Grid item container spacing={1}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                {
                  props.vals.chipList.map((data) => {
                    return (
                      <Grid item key={hashCode(data)}>
                        <Chip
                          color="primary"
                          label={data}
                        />
                      </Grid>
                    );
                  })
                }
              </Grid>
            </Grid>
          </Grid>
          {!!props.vals.email && <Grid item>
            <IconButton>
              <a href={"mailto:" + props.vals.email}><EmailIcon style={{color: "black"}}/></a>
            </IconButton>
          </Grid>}
        </Grid>
      </Grid>
    </Paper>
  )
}