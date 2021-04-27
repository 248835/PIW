import {Backdrop, Box, Button, Fade, Grid, Modal, Paper, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {hashCode} from "../utils/HashCode";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const AddUserForm = (props) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              required
              id="standard-required"
              label="Imię i nazwisko"
              defaultValue=""
              onChange={props.imieNazwiskoInput}
              error={props.imieError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              type="email"
              id="standard-required"
              label="Adres email"
              defaultValue=""
              onChange={props.emailInput}
              error={props.emailError}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              freeSolo
              limitTags={2}
              id="multiple-limit-tags"
              options={props.tagsList}
              getOptionLabel={(option) => option}
              onChange={(event, value) => props.setChipList(value)}
              renderInput={(params) => (
                <TextField {...params} label="Technologie"/>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              id="standard-multiline-flexible"
              label="Opis"
              multiline
              rowsMax={4}
              onChange={props.opisInput}
            />
          </Grid>

          <Box m={1}/>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-start"
          >
            <Button color="primary" onClick={props.zapiszButton}>
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Ten numer pozwala na późniejszą edycję</h2>
            <p id="transition-modal-description">{hashCode(props.imieNazwisko)}</p>
          </div>
        </Fade>
      </Modal>
    </>
  )
}