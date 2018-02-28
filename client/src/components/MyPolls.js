import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
const dateFormat = require('dateformat');

export class MyPolls extends Component {

    constructor(props) {
        super(props)
        this.state = {
            polls: []
        }
    }

    componentDidMount() {
        fetch("/api/polls/user/" + this.props.user.id)
            .then(res => res.json())
            .then(polls => this.setState({ polls: polls }))
            .catch(err => err)
    }

    render() {
        if (this.state.polls.length < 1) {
            return (
                <div>
                    <h1 className="text-center">Polling App</h1>
                    <p className="text-center lead">
                        Below are polls you own. <br />
                        Select a poll to see the results and vote, or <Link to="/newpoll">make a new poll!</Link>
                    </p>
                    <Loading />
                </div >)
        }
        return (
            <div className="">
                <h1 className="text-center">Polling App</h1>
                <p className="text-center lead">
                    Below are polls you own. <br />
                    Select a poll to see the results and vote, or make a new poll!
                 </p>

                <div className="list-group" id="myList">

                    {this.state.polls.map(poll =>
                        <Link key={poll._id} className="list-group-item list-group-item-action" to={"/polls/" + poll._id}>
                            <div className="float-left">{poll.name}</div>
                            <div className="float-right">{dateFormat(poll.createdAt, "fullDate")}</div>
                        </Link>
                    )}

                </div>
            </div>
        );
    }
}