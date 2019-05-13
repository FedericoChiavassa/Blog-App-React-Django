import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Spinner, Alert, FormText  } from 'reactstrap';
import { getPost, updatePost, clearPostState } from '../../actions/postActions';
import { createMessage } from '../../actions/messageActions';
import PropTypes from 'prop-types';

class UpdatePostForm extends Component {
    
    state = {
        title: "",
        body: ""
    }

    componentDidMount() {
        this.props.getPost(this.props.id);
        const { post } = this.props.post;
        this.setState({
            title: post.title,
            body: post.body
        });
    }

    componentWillUnmount() {
        this.props.clearPostState();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})
    
    submitPost = e => {
        e.preventDefault();
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
        const { title, body } = this.state;
        const image =  e.target.image.files[0];

        if(title === "" || body === "") {
            return this.props.createMessage('Please fill in all the fields!', "error");
         }

        const post = new FormData();
        if(image) post.append('image', image);
        post.append('title', title);
        post.append('body', body);

        this.props.updatePost(this.props.id, post);
        this.setState({
            title: '',
            body: ''
          });
        this.props.history.push(from);
    }

    render() {
        if(this.props.post.loading || this.props.auth.isLoading) return <Spinner color="primary" />;
        
        const { title, body, author } = this.props.post.post;
        const { user } = this.props.auth;

        if (author && user) {
            if(author.id !== user.id) return <Alert color="danger">Only the author can update this post. </Alert>;
        }

        return(
            <Form onSubmit={this.submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        defaultValue={title}
                        placeholder="Title..." />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input 
                        type="textarea"
                        name="body"
                        id="body"
                        onChange={this.onChange}
                        defaultValue={body}
                        placeholder="Body..." 
                        rows="10"/>
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="file" 
                        name="image"
                        innerRef={this.fileInput} />
                    <FormText color="muted">
                        You can choose a new image for your post.
                    </FormText>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" >Save Changes</Button>
                </FormGroup>
            </Form>
        )
    }
}

UpdatePostForm.propTypes = {
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    id: PropTypes.string,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    auth: state.auth,
    post: state.post,
    history: ownParams.history,
    id: ownParams.id,
    location: ownParams.location
});

export default connect(mapStateToProps, { getPost, updatePost, clearPostState, createMessage })(UpdatePostForm);