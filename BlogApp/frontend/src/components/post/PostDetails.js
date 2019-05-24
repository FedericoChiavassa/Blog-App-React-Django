import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, Button } from 'reactstrap';
import { getPost, deletePost, clearPostState } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostDetails extends Component {
    
    componentDidMount() {
        this.props.getPost(this.props.id);
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
        this.goBack();
    }

    goBack = () => {
        const { from } = this.props.location.state || { from: { pathname: '/posts' } };
        this.props.history.push(from);
    }

    render() {
        if(this.props.post.post.author && !this.props.post.loading){
            const { isAuthenticated, user } = this.props.auth;
            const { post } = this.props.post;
            const { author } = this.props.post.post;

            const buttons = (
                <Fragment>
                    <Button
                        className="float-right mb-4"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, post.id)}
                    >Delete Post</Button>
                    <Button
                        tag={Link}
                        to={{
                            pathname: `/posts/${post.id}/edit`,
                            state: { from: `/posts/${post.id}` }
                        }}
                        className="float-right mb-4 mr-3"
                        size="sm"
                        color="primary"
                    >Edit Post</Button>
                </Fragment>
            )
            
            return(
                <Fragment>
                    <Button
                        className="mb-4"
                        size="sm"
                        onClick={this.goBack}
                    >← Go Back</Button>
                    { (isAuthenticated && author.id === user.id)  ? buttons : null }
                    <h1>{post.title}</h1>
                    { post.image !== 'http://localhost:8000/media/noimage.jpg' ? (<img style={imgStyle} src={post.image} alt="PostImage" className="mt-4"/>) : null }
                    <p className="mt-4 mb-4">{post.body}</p>
                    <footer className="mb-5">
                    <small>Author: {author.username}</small><br/>
                    <small>Created on: {new Date(post.created_at).toLocaleString()}</small><br/>
                    <small>Last update: {new Date(post.updated_at).toLocaleString()}</small>
                    </footer>
                </Fragment>
            )
        } else {
            return <Spinner color="primary" />;
        }
    }
}

const imgStyle= {
    width: '100%',
    height: '350px',
    objectFit: 'cover'
}

PostDetails.propTypes = {
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    auth: state.auth,
    id: ownParams.id,
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { getPost, deletePost, clearPostState })(PostDetails);