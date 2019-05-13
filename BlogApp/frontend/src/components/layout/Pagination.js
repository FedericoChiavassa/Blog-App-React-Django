import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination as RSPagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const { hasPrevPage, hasNextPage } = this.props.post;
    const { page } = this.props;

    if(!hasPrevPage && !hasNextPage) return null;

    const prev = (
        <Fragment>
            <PaginationItem>
                <PaginationLink tag={Link} previous to={`/posts/page${page-1}`} />
            </PaginationItem>
        </Fragment>
    );

    const next = (    
        <Fragment>   
            <PaginationItem >
                <PaginationLink tag={Link} next to={`/posts/page${page+1}`} />
            </PaginationItem>
        </Fragment>
    );

    return (
      <RSPagination>
        { hasPrevPage ? prev : (
            <PaginationItem disabled >
                <PaginationLink previous />
            </PaginationItem>
        ) }
        <PaginationItem >
          <PaginationLink>
            Page {page}
          </PaginationLink>
        </PaginationItem>
        { hasNextPage ? next : (
            <PaginationItem disabled >
                <PaginationLink next />
            </PaginationItem>
        ) }
      </RSPagination>
    );
  }
}

Pagination.propTypes = {
    post: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownParams) => ({
    post: state.post,
    page: ownParams.page
});

export default connect(mapStateToProps)(Pagination); 