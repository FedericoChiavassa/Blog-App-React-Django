import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
  render() {
    return (
      <Fragment >
        <div onClick={this.props.logout} href="#">
            Logout
        </div>
      </Fragment>
    )
  }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);
