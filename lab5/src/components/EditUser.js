import {
  Backdrop,
  Box, Button, Fade,
  Grid, Modal,
  Paper, TextField,
} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete, Skeleton} from "@material-ui/lab";
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

const Skelet = () => {
  const classes = useStyles();

  return(
    <Paper className={classes.paper}>
      <Box m={5}/>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Skeleton variant="rect" height={30} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" height={30} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" height={30} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="rect" height={30} />
        </Grid>

        <Box m={1}/>

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <Skeleton variant="rect" width={60} height={20} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export const EditUser = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!!props.student || <Skelet/>}
      {!props.student ||
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              disabled
              id="standard-required"
              label="Imię i nazwisko"
              defaultValue={props.student.imieNazwisko}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              type="email"
              id="standard-required"
              label="Adres email"
              defaultValue={props.student.email}
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
              defaultValue={props.student.chipList}
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
              defaultValue={props.student.opis}
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
            <Button color="secondary" onClick={props.usunStudent}>Usuń</Button>
            <Button color="primary" onClick={props.zapiszButton}>
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </Paper>
      }

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Podaj kod użytkownika</h2>
            <TextField id="standard-basic" label="Kod" onChange={props.codeInput} fullWidth error={props.errorCode}/>
            <div style={{float: "right", marginTop: 10}}>
              <Button color="primary" onClick={props.handleCodeButton}>
                Ok
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}