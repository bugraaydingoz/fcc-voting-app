import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
const dateFormat = require('dateformat');

export class PollList extends Component {

    render() {
        if (this.props.polls.length < 1) {
            return (
                <div>
                    <h1 className="text-center">Polling App</h1>
                    <p className="text-center lead">
                        Select a poll to see the results and vote, or sign-in to make a new poll.
                 </p>
                    <Loading />
                </div>)
        }
        return (
            <div className="">
                <h1 className="text-center">Polling App</h1>
                <p className="text-center lead">
                    Select a poll to see the results and vote, or sign-in to make a new poll.
                 </p>

                <div className="list-group" id="myList">

                    {this.props.polls.map(poll =>
                        <Link key={poll.id} className="list-group-item list-group-item-action" to={"/polls/" + poll.id}>
                            <div className="float-left">{poll.name}</div>
                            <div className="float-right">{dateFormat(poll.createdAt, "fullDate")}</div>
                        </Link>
                    )}

                </div>
            </div>
        );
    }
}