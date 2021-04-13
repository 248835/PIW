const {
  colors,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  makeStyles,
  createMuiTheme,
  Box,
  SvgIcon,
  Link,
  ButtonBase,
  Paper,
  Grid,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuList,
  Popper,
  MenuItem,
  Grow,
  ClickAwayListener,
  InputAdornment,
  InputLabel,
  Input,
  FormControl
} = MaterialUI;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
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
  accordion: {
    margin: 'auto',
    width: 500,
  },
  chip: {
    margin: 2
  }
}));

const hashCode = function (s) {
  let h = 0, i = s.length;
  while (i > 0) {
    h = (h << 5) - h + s.charCodeAt(--i) | 0;
  }
  return h;
};

function ExpandMoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M6 9l6 6 6-6"/>
    </SvgIcon>
  )
}

const SearchStudent = (props) => {
  const classes = useStyles();
  const [chipData, setChipData] = props.chipData;

  const handleDelete = (chipToDelete) => () => {
    setChipData(chipData.filter((chip) => chip !== chipToDelete))
  }

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={props.onClick}
      >
        <Typography className={classes.heading}>Znajdź studenta</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MenuListComposition
              tagsList={props.tagsList}
              chipHook={props.chipData}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-required"
              label="Imię i/lub nazwisko"
              defaultValue=""
              onChange={props.searchNameInput}
            />
          </Grid>
          <Grid item xs={12}
                style={{marginTop: 5}}
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={1}>
            {
              chipData.map((data) => {
                return (
                  <Grid item key={hashCode(data)}>
                    <Chip
                      color="primary"
                      label={data}
                      onDelete={handleDelete(data)}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

const AddUserButton = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={props.onClick}
        >
          Dodaj studenta
        </Button>
      </Grid>
    </>
  )
}

const MenuListComposition = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tagInputData, setTagInputData] = React.useState("");
  const anchorRef = React.useRef(null);
  let isTagAdded = false

  const handleAddChip = (event) => {
    if (!!tagInputData.target.value) {
      isTagAdded = true
      const [chipData, setChipData] = props.chipHook
      setChipData(chipData.concat(tagInputData.target.value))
      tagInputData.target.value = ""
    }
  }

  const setTagInput = (event) => {
    setTagInputData(event)
  }

  const handleToggle = (event) => {
    if (isTagAdded) {
      setOpen(false);
      isTagAdded = false
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleChoice = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    isTagAdded = true
    const [chipData, setChipData] = props.chipHook
    setChipData(chipData.concat(event.target.id))

    if (tagInputData !== "")
      tagInputData.target.value = ""

    setOpen(false);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const listToRender = props.tagsList.filter(it =>
    (tagInputData === "" || tagInputData.target.value === "")
    || it.toLowerCase().includes(tagInputData.target.value.toLowerCase()))
    .map(it => (
      <MenuItem
        id={it}
        key={hashCode(it)}
        onClick={handleChoice}>
        {it}
      </MenuItem>
    ))

  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel htmlFor="standard-technologie">Technologie</InputLabel>
        <Input
          fullWidth={true}
          id="standard-technologie"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          onChange={setTagInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="add technologie"
                onClick={handleAddChip}
              >
                <img className={classes.img} alt="user icon" src="plus.svg"/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper style={{maxHeight: 200, width: 200, overflow: 'auto'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow">
                  {listToRender}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const AddUserForm = (props) => {
  const classes = useStyles();
  const [chipData, setChipData] = props.chipData;

  const handleDelete = (chipToDelete) => () => {
    setChipData(chipData.filter((chip) => chip !== chipToDelete))
  }

  return (
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
          <MenuListComposition
            tagsList={props.tagsList}
            chipHook={props.chipData}
          />
          <Grid
            style={{marginTop: 5}}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={1}>
            {
              chipData.map((data) => {
                return (
                  <Grid item key={hashCode(data)}>
                    <Chip
                      color="primary"
                      label={data}
                      onDelete={handleDelete(data)}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
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
          <Button color="secondary" onClick={props.cancelButton}>
            Anuluj
          </Button>
          <Button color="primary" onClick={props.zapiszButton}>
            Zapisz
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

const UserGrid = (props) => {
  const
    classes = useStyles();

  return (

    <Paper className={
      classes.paper
    }

    >
      <Grid container spacing={2}>
        <Grid item className={classes.image}>
          <img className={classes.img} style={{width: 100}} alt="user icon" src="user.svg"/>
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
              <a href={"mailto:" + props.vals.email}><img className={classes.img} alt="user icon" src="mail.svg"/></a>
            </IconButton>
          </Grid>}
        </Grid>
      </Grid>
    </Paper>
  )
}

class App extends React.Component {
  state = {
    imieError: false,
    emailError: false,
    showButton: true,
    isSearching: false,
    imieNazwisko: "",
    email: "",
    opis: "",
    searchNameInput: "",
    searchTagInput: [],
    studentList: [
      {
        imieNazwisko: "Arek Architekt",
        email: "send@this.mail",
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mauris mauris, rhoncus a turpis eget," +
          " placerat tincidunt sapien.",
        chipList: ["AWS", "Docker", "React"]
      },
      {
        imieNazwisko: "Dagmara Dockerka",
        email: "",
        opis: "",
        chipList: ["AWS", "Docker"]
      },
      {
        imieNazwisko: "Renata Reakcyjna",
        email: "example@mail.info",
        opis: "Fusce quam massa, mollis sit amet facilisis vitae, venenatis suscipit tellus.",
        chipList: []
      },
    ],
    tagsList: ["AWS", "Docker", "React"],
    chipList: []
  }

  handleSearchNameInput = (event) => {
    this.setState({
      searchNameInput: event.target.value
    })
  }

  setChipList = (list) => {
    this.setState({chipList: list})
  }

  setTagSearchList = (list) => {
    this.setState({searchTagInput: list})
  }

  changeShowButtonState = (event) => {
    this.setState({
      showButton: !this.state.showButton,
      imieError: false,
      emailError: false,
      chipList: []
    })
  }

  handleImieNazwiskoInput = (event) => {
    this.setState({
      imieNazwisko: event.target.value,
      imieError: false
    })
  }

  handleEmailInput = (event) => {
    this.setState({
      email: event.target.value,
      emailError: false
    })
  }

  handleOpisInput = (event) => {
    this.setState({opis: event.target.value})
  }

  handleIsSearching = (event) => {
    this.setState({
      isSearching: !this.state.isSearching,
      searchNameInput: "",
      searchTagInput: []
    })
  }

  pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  handleZapiszButton = (event) => {
    if (!this.state.studentList
      .map(it => (it.imieNazwisko))
      .includes(this.state.imieNazwisko) && this.state.imieNazwisko !== "") {
      if (this.state.email === "" || this.pattern.test(this.state.email)) {

      } else {
        this.setState({emailError: true})
        return
      }
      this.setState({
        showButton: true,
        studentList: this.state.studentList.concat({
          imieNazwisko: this.state.imieNazwisko,
          email: this.state.email,
          opis: this.state.opis,
          chipList: this.state.chipList
        })
      })
      this.setState({
        tagsList: this.state.tagsList.concat(this.state.chipList.filter(it => !this.state.tagsList.includes(it)))
      })
    } else
      this.setState({imieError: true})
  }

  render() {
    const listToRender = this.state.studentList
      .filter(it =>
        it.imieNazwisko.toLowerCase().includes(this.state.searchNameInput.toLowerCase())
      )
      .filter(it =>
        this.state.searchTagInput.every(element => it.chipList.includes(element)))
      .map(it => (
        <Grid item key={hashCode(it.imieNazwisko)}>
          <UserGrid vals={it}/>
        </Grid>
      ))
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={2}>
        <Grid item>
          <SearchStudent
            tagsList={this.state.tagsList}
            chipData={[this.state.searchTagInput, this.setTagSearchList]}
            onClick={this.handleIsSearching}
            searchNameInput={this.handleSearchNameInput}
          />
        </Grid>
        {!this.state.isSearching && this.state.showButton && <AddUserButton onClick={this.changeShowButtonState}/>}
        {!this.state.isSearching && !this.state.showButton && <AddUserForm
          cancelButton={this.changeShowButtonState}
          zapiszButton={this.handleZapiszButton}
          imieNazwiskoInput={this.handleImieNazwiskoInput}
          emailInput={this.handleEmailInput}
          opisInput={this.handleOpisInput}
          imieError={this.state.imieError}
          emailError={this.state.emailError}
          tagsList={this.state.tagsList}
          chipData={[this.state.chipList, this.setChipList]}
        />}
        <Grid
          item
          container
          direction="column-reverse"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          {listToRender}
        </Grid>
      </Grid>
    )
  }

}

ReactDOM.render(
  <>
    <CssBaseline/>
    <div style={{marginTop: 24,}}>
      <App/>
    </div>
  </>
  ,
  document.querySelector('#root'),
);