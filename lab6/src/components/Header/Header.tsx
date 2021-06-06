import { Main, Logo, UserButton } from './Header.style';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  TextField,
  withStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';
import { auth } from '../../firebase';
import firebase from 'firebase/app';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEmail('');
    setPassword('');
    setEmailError(false);
    setPasswordError(false);
    setLoading(false);
  };

  const handleLoginClickOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    handleClose();
  };

  const handleRegisterClickOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
    handleClose();
  };

  const createUserWithEmailAndPassword = (email: string, password: string) => {
    setEmailError(false);
    setPasswordError(false);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(handleRegisterClose)
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setEmailError(true);
        if (error.code === 'auth/weak-password') setPasswordError(true);

        setLoading(false);
      });
  };

  const signInUserWithEmailAndPassword = (email: string, password: string) => {
    setEmailError(false);
    setPasswordError(false);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(handleLoginClose)
      .catch(error => {
        console.log(error);
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/user-not-found'
        )
          setEmailError(true);

        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        )
          setPasswordError(true);

        setLoading(false);
      });
  };

  return (
    <Main>
      <Logo>
        <IconButton color="secondary" component={Link} to="/">
          <LocalPizzaIcon fontSize="large" />
        </IconButton>
      </Logo>
      <UserButton>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Moje konto
          <ExpandMoreIcon />
        </Button>

        {user ? (
          <StyledMenu
            id="logged-in-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
              onClick={() =>
                auth.signOut().then(() => {
                  handleClose();
                  history.replace('/');
                })
              }
            >
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </StyledMenuItem>
            <MenuItem component={Link} to="/history">
              <ListItemIcon>
                <HistoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Historia" />
            </MenuItem>
          </StyledMenu>
        ) : (
          <StyledMenu
            id="log-in-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleLoginClickOpen}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Zaloguj" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleRegisterClickOpen}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Zarejestruj" />
            </StyledMenuItem>
          </StyledMenu>
        )}
      </UserButton>

      <Dialog
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="form-dialog-title"
      >
        {loading && <LinearProgress />}
        <DialogTitle id="form-dialog-title">Zaloguj się</DialogTitle>
        <DialogContent style={{ width: '15rem' }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adres email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Hasło"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} color="primary" disabled={loading}>
            Anuluj
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              signInUserWithEmailAndPassword(email, password);
            }}
            color="primary"
            disabled={loading}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={registerOpen}
        onClose={handleRegisterClose}
        aria-labelledby="form-dialog-title"
      >
        {loading && <LinearProgress />}
        <DialogTitle id="form-dialog-title">Zarejestruj się</DialogTitle>
        <DialogContent style={{ width: '15rem' }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adres email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Hasło"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRegisterClose}
            color="primary"
            disabled={loading}
          >
            Anuluj
          </Button>
          <Button
            onClick={() => {
              setLoading(true);
              createUserWithEmailAndPassword(email, password);
            }}
            color="primary"
            disabled={loading}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Main>
  );
};

export default Header;
