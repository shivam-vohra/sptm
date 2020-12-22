import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getProjectasks, saveNote, deleteNote } from '../actions/projectasksAction';
import NoteCard from './NoteCard';
import { getUser } from '../actions/userAction';
import { Link } from 'react-router-dom';
import CSS from './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        // state
        let newDate = new Date()
        let separator = '-';
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        this.state = {
            title: '',
            body: '',
            date:  `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderProjectasks = this.renderProjectasks.bind(this);
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
        // var dateControl = document.getElementById('time');
        //   console.log(dateControl.value);
        let newDate = new Date()
        let separator = '-';
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        const note = {
            title: this.state.title,
            body: this.state.body,
            date: this.state.date,
            uid: this.props.user.uid

        };
        this.props.saveNote(note);
        this.setState({
            title: '',
            body: '',
            date:  `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        });
    }


    // render projectasks
    renderProjectasks() {
        return _.map(this.props.projectasks, (note, key) => {
            return (

                <NoteCard key={key}>

                        <h2>{note.title}</h2>

                    <p>{note.body}</p>
                      <p>Due Date: {note.date}</p>
                    {note.uid === this.props.user.uid && (
                        <div>
                          <Link to={`/${key}`}>
                        <button className="btn btn-success btn-xs pull-left">Open</button>
                          </Link>
                            <button className="btn btn-danger btn-xs" onClick={() => this.props.deleteNote(key)}>
                                Delete
                            </button>
                              <Link to={`/${key}/edit`}>
                            <button className="btn btn-info btn-xs pull-right">
                              Update
                            </button>
                            </Link>
                        </div>
                    )}
                </NoteCard>

            );
        });
    }

    render() {
        return (


            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 text-center">
                        <img
                            src={this.props.user.photoURL}
                            height="100px"
                            className="img img-responsive cirlce"
                            style={{ padding: '20px' }}
                        />
                        <h4 className="username">Welcome back {this.props.user.displayName}</h4>
                    </div>

                    <div className="col-sm-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                    type="text"
                                    name="title"
                                    className="field"
                                    placeholder="Title..."
                                    required
                                />
                            </div>
                            <br />

                            <div className="field">
                                <textarea
                                    onChange={this.handleChange}
                                    value={this.state.body}
                                    type="text"
                                    name="body"
                                     className="field"
                                    placeholder="Task"
                                    required
                                />

                            </div>

                            <br />
                            <div>Due Date:
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
                        <br />
                        <br />
                        <br />
                        {this.renderProjectasks()}
                    </div>
                </div>
            </div>


        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        projectasks: state.projectasks,
        user: state.user
    };
}

export default connect(mapStateToProps, { getProjectasks, saveNote, deleteNote, getUser })(App);
