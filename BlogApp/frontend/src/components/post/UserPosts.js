import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getUserPosts, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';

class UserPosts extends Component {

    componentDidMount() {
        this.props.getUserPosts(this.props.auth.user.id);
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
    }

    render() {
        if(this.props.post.loading) return <Spinner style={{display: 'block'}} color="primary" />;
        const { posts } = this.props.post;

        if(posts.length < 1) return (<p>You don't have any post yet.</p>);

        return(   
            <ListGroup className="mb-5">
                {posts.map(({id, title}) => ( 
                    <ListGroupItem key={id} style={{ backgroundColor: '#f9f9f9' }}>
                        <Link to={{
                            pathname: `/posts/${id}`,
                            state: { from: '/dashboard' }
                        }}>{title}</Link>
                        <Button
                            className="float-right"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, id)}
                        >Delete</Button>                   
                        <Button
                            tag={Link}
                            to={{
                                pathname: `/posts/${id}/edit`,
                                state: { from: '/dashboard' }
                            }}
                            className="float-right mr-3"
                            size="sm"
                            color="primary"
                        >Edit Post</Button>
                    </ListGroupItem>
                ))}
            </ListGroup>  
        )
    }
}

UserPosts.propTypes = {
    getUserPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getUserPosts, deletePost })(UserPosts);