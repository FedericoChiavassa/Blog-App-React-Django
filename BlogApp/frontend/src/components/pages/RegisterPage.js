import React from 'react';
import { Container } from 'reactstrap';
import Register from '../auth/Register';
import { Link } from 'react-router-dom';

function RegisterPage({history}) {
  return (     
        <Container>
            <h1>Register</h1>
            <Register history={history} />
            <p>If you already have an account <Link to="/login">Login Here</Link>.</p>
            
        </Container>
  );
}

export default RegisterPage;