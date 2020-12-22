import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editNote } from '../actions/projectasksAction';

class NoteEdit extends Component {
    constructor(props) {
        super(props);


        // state
        this.state = {
            title: this.props.note.title,
            body: this.props.note.body,
            date: this.props.note.date
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handle change
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        let newDate = new Date()
        let separator = '-';
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        const note = {
            title: this.state.title,
            body: this.state.body,
            date: this.state.date,
            uid: this.props.uid
        };
        this.props.editNote(this.props.match.params.id, note);
        this.setState({
            title: '',
            body: '',
            date:  `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                    type="text"
                                    name="title"
                                    className="form-control no-border"
                                    placeholder="Title"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    onChange={this.handleChange}
                                    value={this.state.body}
                                    type="text"
                                    name="body"
                                    className="form-control no-border"
                                    placeholder="Task"
                                    required
                                />
                            </div>
                            <br />
                            <div>
                            <input id="time"
                            type="date"
                            name="date"
                            onChange={this.handleChange}
                            value={this.state.date}/>
                            </div>
                                  <br />
                            <div className="form-group">
                                <button className="btn btn-primary col-sm-12">Save</button>
                            </div>

                            <br />

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        note: state.projectasks[ownProps.match.params.id],
        uid: state.user.uid
    };
}

export default connect(mapStateToProps, { editNote })(NoteEdit);
