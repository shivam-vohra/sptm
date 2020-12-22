import React, { Component } from "react";
import { connect } from "react-redux";
import { googleLogin } from "../actions/userAction";

class Login extends Component {
    componentWillMount() {
        if (this.props.user !== null) {
            // console.log(this.props.history);
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== null) {
            nextProps.history.push("/");
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                        <h1>Student Project Task Manager</h1>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <button
                            className="btn btn-danger col-sm-6 col-sm-offset-3"
                            onClick={this.props.googleLogin}
                        >
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, onwProps) {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps,
    { googleLogin}
)(Login);
