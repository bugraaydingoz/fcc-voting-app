import React, { Component } from 'react';
import { Redirect } from 'react-router'

export class NewPoll extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            options: '',
            newPoll: { _id: '' }
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault()


        fetch("/api/polls/new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.title,
                options: this.state.options.split('\n'),
                userId: this.props.user.id
            })
        })
            .then(res => res.json())
            .then(poll => this.setState({ newPoll: poll }))
            .catch(err => err)
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value })
    }

    handleOptionsChange(event) {
        this.setState({ options: event.target.value })
    }

    render() {
        let redirectToNewPoll = ''
        if (this.state.newPoll._id !== '') {
            redirectToNewPoll = <Redirect to={"/polls/" + this.state.newPoll._id} />
        }

        return (
            <div className="">
                <h1 className="text-center">Make a new poll</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="formGroupTitleInput">Title:</label>
                        <input onChange={this.handleTitleChange} value={this.state.title} type="text" className="form-control" id="formGroupTitleInput" placeholder="What is your favorite series?" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="formGroupOptionsInput">Options (Seperated by line):</label>
                        <textarea onChange={this.handleOptionsChange} value={this.state.options} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Stranger Things&#10;Sherlock&#10;Game of Thrones" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                {redirectToNewPoll}

            </div>
        );
    }
}