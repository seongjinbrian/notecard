import React, {useState} from 'react';
import {Avatar, CssBaseline, Button, TextField, Typography, Container} from '@material-ui/core';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Google from "../../images/google.svg";
import { makeStyles } from '@material-ui/core/styles';
import { authentication } from '../../fb';
import {IconContainer, BtnContainer, AuthContainer, AuthTitle, OuterBox} from './AuthStyle'

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface AuthFormProp {
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

function SignIn( {onClick}: AuthFormProp) {

  const classes = useStyles();
  const [user, setUser] = useState({ email: '', password: '' });
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState('');
  const { email, password } = user;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleToggle = (): void => setNewUser((prev: boolean) => !prev);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      newUser ? await authentication.createUserWithEmailAndPassword(email, password) : await authentication.signInWithEmailAndPassword(email, password)
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <OuterBox>
        <Avatar className={classes.avatar}>
          <img src={Google} alt="hi" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value={newUser ? 'Create Account': 'Sign in'}
          >
            {newUser ? 'Create Account': 'Sign in'}
          </Button>
          <span onClick={handleToggle}>
            {newUser ? 'Sign In' : 'Create Account'}
          </span>
          <AuthContainer>
            <AuthTitle>OR</AuthTitle>
            <BtnContainer>
            <IconContainer onClick={onClick} >
              <img src={Google} alt={"google"} />
            </IconContainer>
          </BtnContainer>
         </AuthContainer>
        </form>
      </OuterBox>
    </Container>
  );
}

export default React.memo(SignIn);