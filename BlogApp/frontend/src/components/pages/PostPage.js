import React from 'react';
import { Container } from 'reactstrap';
import PostDetails from '../post/PostDetails';

 export default function PostPage({ match, history, location }) {
  return (     
        <Container>
            <PostDetails id={match.params.id} history={history} location={location} />
        </Container>
  );
}
