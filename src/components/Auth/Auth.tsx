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

export default function SignIn( {onClick}: AuthFormProp) {

  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [newAccount, setNewAccout] = useState(false);
  const [error, setError] = useState('');
  const { email, password } = userInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (newAccount) {
        await authentication.createUserWithEmailAndPassword(email, password);
      } else {
        await authentication.signInWithEmailAndPassword(email, password);
      }
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleToggle}
          >
            {newAccount ? 'Sign In' : 'Create Account'}
          </Button>
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