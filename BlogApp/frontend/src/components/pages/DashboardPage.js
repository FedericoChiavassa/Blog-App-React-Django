import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UserPosts from '../post/UserPosts';

function DashboardPage() {
  return (         
    <Container>
        <h1>Dashboard</h1>
        <Button
            tag={Link}
            to={{
                pathname: '/posts/create-post',
                state: { from: '/dashboard' }
            }}
            className="mt-4 mb-4"
            color="primary"
            block
            >New Post</Button>
            <h3 className="mb-3">Manage your posts:</h3>
        <UserPosts />
    </Container>
  );
}

export default DashboardPage;