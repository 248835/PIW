import {Grid, Paper, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
  }
}));

export const SearchStudent = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}>
        <Grid item>
          <TextField
            fullWidth
            id="standard-required"
            label="Imię i/lub nazwisko"
            defaultValue=""
            onChange={props.searchNameInput}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            multiple
            limitTags={4}
            id="multiple-limit-tags"
            options={props.tagsList}
            getOptionLabel={(option) => option}
            onChange={(event, value) => props.setTagSearchList(value)}
            renderInput={(params) => (
              <TextField {...params} label="Technologie"/>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}