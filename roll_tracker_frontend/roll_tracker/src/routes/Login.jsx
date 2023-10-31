import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, signup } from '../api/api_calls';
import LoginSnack from '../muiComponents/LoginSnack';
import { Navigate } from 'react-router-dom';



const defaultTheme = createTheme();

// const useStyles = makeStyles({
//   customTextField: {
//     '& label.Mui-focused': {
//       color: '#25272c', // Color when focused
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'yellow', // Color when focused
//     },
//   },
// });



export default function Login({handleInputChange, formData, handleToken, handleOnClick, checked, signUp, handleSignUp, userToken}) {

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checked) {
        const data = new FormData(event.currentTarget);
        const context = {
            username: data.get('username'),
            password: data.get('password'),
          }
          signup(context)

    } else {
        const data = new FormData(event.currentTarget);
        const context = {
            username: data.get('username'),
            password: data.get('password'),
          }
          const tokenData = await login(context)
        handleToken(tokenData)

    }


  };

  if (userToken) {
    return <Navigate to="/profile" /> 
  }
 
  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#d59f48' }}>
            <LockOutlinedIcon sx={{ bgcolor: '#d59f48'}} />
          </Avatar>
          <Typography component="h1" variant="h5" color="#25272c">
            Sign in
          </Typography>
          <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleInputChange}
              color="secondary"
              InputLabelProps={{
                style: { color: '#25272c'},
                shrink: true, 
              }}
              InputProps={{
                style: { color: '#25272c', backgroundColor: '#67bace' }}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              color="secondary"
            
              InputLabelProps={{
                style: { color: '#25272c'},
                shrink: true, 
              }}
              InputProps={{
                style: { color: '#25272c', backgroundColor: '#67bace' }}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary"  />}
              label={<span style={{ color: '#25272c' }}>Sign up</span>}
              onClick={handleOnClick}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, 
                    bgcolor: '#2a4f60',
                    '&:hover': {
                      bgcolor: '#5C8093'
                    }
                  }}
              onClick={()=>handleSignUp()}
              color="primary"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>

  );
}