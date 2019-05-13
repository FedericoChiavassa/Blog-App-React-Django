import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function HomePage({auth}) {
    return (
    <Container>
        <h1 className="mb-4">Introduction</h1>
        <p>This is a simple blog application where all <Link to="/posts">Posts</Link> are visible to anyone.</p>
        <p>If you <Link to="/register">Register</Link> your account and <Link to="/login">Login</Link> you can create a new post or update/delete a post you created.</p> 
        <p>If you want to know about some of the technologies I used to create this application go to the <Link to="/about">About Page</Link> </p>
    </Container>
  );
}


export default HomePage;