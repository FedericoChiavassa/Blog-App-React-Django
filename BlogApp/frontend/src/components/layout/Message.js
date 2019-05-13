import React, { Component, Fragment } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { clearMessage } from '../../actions/messageActions';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class Message extends Component {

    componentDidUpdate(prevProps) {
        const { message } = this.props;
        if(message === prevProps.message && message.msg !== "")  {
            this.props.clearMessage();
        }
    }
    
    componentWillUnmount() {
        this.props.clearMessage();
    }

    render() {
        const { msg, type } = this.props.message;

        if(type === "error") {
            return(
                <Fragment>
                    { msg !== "" ? (<Alert className="mt-3 mb-4" color="danger">{msg}</Alert>) : null}
                </Fragment>
            )
        }

        return(
            <Fragment>
                { msg !== "" ? (<Alert className="mt-3 mb-4" color="success">{msg}</Alert>) : null}
            </Fragment>
        )
    }
}

Message.propTypes = {
    clearMessage: PropTypes.func.isRequired,
    message: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    message: state.message
});

export default withRouter(connect(mapStateToProps, { clearMessage })(Message));