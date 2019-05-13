import React from 'react';
import { Container } from 'reactstrap';
import Login from '../auth/Login';
import { Link } from 'react-router-dom';

function LoginPage({history, location}) {
  return (     
        <Container>
            <h1>Login</h1>
            <Login history={history} location={location} />
            <p>If you don't have an account <Link to="/register">Register Here</Link>.</p>
        </Container>
  );
}

export default LoginPage;