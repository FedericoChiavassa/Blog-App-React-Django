import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password } = this.state;

        // Create user object
        const newUser = {
            username,
            email,
            password
        }
        
        // Attempt to register
        this.props.register(newUser);
        this.props.clearErrors();
    }

    render() {
        if(this.props.auth.isLoading) return <Spinner color="primary" />;
        if(this.props.isAuthenticated) return <Redirect to="/dashboard" />

        return(
            <div>
                <Form onSubmit={this.onSubmit} className="mt-3">
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input 
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            className="mb-3"
                            onChange={this.onChange}
                        />

                        <Label for="email">Email <small className="font-italic">( optional )</small></Label>
                        <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="mb-3"
                            onChange={this.onChange}
                        />

                        <Label for="password">Password</Label>
                        <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="mb-3"
                            onChange={this.onChange}
                        />
                        <Button
                            color="dark"
                            className="mt-3"
                        >Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownParams) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    auth:state.auth,
    history: ownParams.history,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);