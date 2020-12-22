import React, { Component } from 'react';
import { connect } from 'react-redux';
// with withRouter You can get access to the history object’s properties
import { withRouter } from 'react-router-dom';
import { getUser } from '../actions/userAction';
import { getProjectasks } from '../actions/projectasksAction';
import Loading from '../components/Loading';

class LoadingComponent extends Component {
    componentWillMount() {
        const { userLoading, projectasksLoading } = this.props;
        // if we havent tried to load the user, load user
        if (userLoading === undefined) {
            this.props.getUser();
        }

        // if we havent tried to get projectasks, load projectasks
        if (projectasksLoading === undefined) {
            this.props.getProjectasks();
        }
    }

    componentWillReceiveProps(nextProps) {
        // wait for user to get authenticated and try to load projectasks
        if (nextProps.projectasksLoading === -1 && nextProps.user !== null) {
            this.props.getProjectasks();
        }
    }

    render() {
        const { userLoading, projectasksLoading, children } = this.props;
        /**
         * throughout the lifetime of app user and projectasks loading status will
         * keep toggling between true and false
         * when anything other than that toggling state such as true or false is in the state
         * that means the loading operation is setteled and not active
         * that time, show the enclosing components
         * for everything else and inbetween show Loading
         */
        if ((!userLoading && !projectasksLoading) || this.props.user === null) {
            return <div>{children}</div>;
        } else {
            return <Loading />;
        }
    }
}

function mapStateToProps(state) {
    return {
        userLoading: state.loading.user,
        projectasksLoading: state.loading.projectasks,
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps, { getUser, getProjectasks })(LoadingComponent));
