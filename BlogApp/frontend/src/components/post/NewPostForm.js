import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import { addPost, clearPostState } from '../../actions/postActions';
import { createMessage } from '../../actions/messageActions';
import PropTypes from 'prop-types';


class NewPostForm extends Component { 
    state = {
        title: "",
        body: ""
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
        post.append('image', image);
        post.append('title', title);
        post.append('body', body);

        this.props.addPost(post);
        this.setState({
            title: '',
            body: ''
          });
        this.props.history.push(from);
    }

    render() {
        return(
            <Form onSubmit={this.submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input 
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        value={this.state.title}
                        placeholder="Title..." />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input 
                        type="textarea"
                        name="body"
                        onChange={this.onChange}
                        value={this.state.body}
                        placeholder="Body..." 
                        rows="10"/>
                </FormGroup>
                <FormGroup>
                    <Input 
                        type="file" 
                        name="image"
                        innerRef={this.fileInput} />
                    <FormText color="muted">
                        You can choose an image for your post.
                    </FormText>
                </FormGroup>
                <FormGroup className="mt-5">
                    <Button type="submit" >Create Post</Button>
                </FormGroup>
            </Form>
        )
    }
}

NewPostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    clearPostState: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    history: ownParams.history,
    location: ownParams.location
});

export default connect(mapStateToProps, { addPost, clearPostState, createMessage })(NewPostForm);