import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Spinner, Media } from 'reactstrap';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostsList extends Component {

    componentDidMount() {
        this.props.getPosts(this.props.page);
    }

    componentDidUpdate(prevProps) {
        const { page } = this.props;
        if(page !== prevProps.page) {
            this.props.getPosts(page);
        }
    }

    render() {
        if(this.props.post.loading) return <Spinner style={{display: 'block'}} color="primary" />;
        const { posts } = this.props.post;
        const { page } = this.props;
        // const { isAuthenticated } = this.props.auth;

        // if(posts.length < 1) {
        //     if(!isAuthenticated)
        //         return (<p>There are no posts yet. To create a new post you need to <Link to="/register">Register</Link> or <Link to="/login">Login</Link>.</p>);
        //     else
        //         return (<p>There are no posts yet.</p>);
        // }

        return(
            <Fragment>
                <ListGroup className="mb-5">
                    {posts.map(post => (
                        <ListGroupItem key={post.id} style={{ backgroundColor: '#f9f9f9' }}>
                            {/* <Media 
                                tag={Link}
                                to={{ pathname: `/posts/${post.id}`, state: { from: `/posts/page${page}` }}}
                                className="mr-3 float-left">
                                <img
                                    src={'/' + post.image} style={imgStyle} 
                                    className=" img-thumbnail"  
                                    alt="PostImage" />
                            </Media> */}
                            <Link to={{
                                pathname: `/posts/${post.id}`,
                                state: { from: `/posts/page${page}` }
                            }}>{post.title}</Link>
                            <br/><small>written on: {new Date(post.created_at).toLocaleString()} {/*by: {post.author.name}*/} </small>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        )
    }
}

const imgStyle = {
    width: '200px', 
    maxHeight: '150px',
    objectFit: 'cover'
}

PostsList.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
    // auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    // auth: state.auth,
    page: ownParams.page
});

export default connect(mapStateToProps, { getPosts })(PostsList);