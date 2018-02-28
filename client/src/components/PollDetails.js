import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Loading } from './Loading';
import { Redirect } from 'react-router';
const axios = require('axios')

const data = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#EC56FF',
            '#30CCA2'
        ]
    }]
};

export class PollDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poll: {
                _id: '',
                data: [],
                options: [],
                isDeleted: false,
                isOptionVisible: false
            },
        };
    }
    componentDidMount() {
        let _id = this.props.match.params.pollId
        fetch("/api/polls/" + _id)
            .then(res => res.json())
            .then(poll => this.setState({ poll: poll }))
            .catch(err => err)
    }

    handleSubmit(e) {
        e.preventDefault()
        let _isNewOption = false
        let _selectedOption = document.querySelector('#vote').value
        if (_selectedOption === 'Vote for another option') {
            _isNewOption = true
            _selectedOption = document.querySelector('#newoption').value
        }
        const _id = this.state.poll._id
        const _dataIndex = this.state.poll.options.indexOf(_selectedOption)

        let _poll = this.state.poll
        _poll.data[_dataIndex]++

        axios.post('/api/polls/vote', {
            id: _id,
            vote: _selectedOption,
            dataIndex: this.state.poll.options.indexOf(_selectedOption),
            isNewOption: _isNewOption
        }).then((res) => {
            this.setState({
                poll: _poll
            })
        })
    }

    handleDeleteButton(e) {
        e.preventDefault()

        const _pollId = this.state.poll._id
        const _userId = this.props.userId

        fetch("/api/polls/delete/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pollId: _pollId,
                userId: _userId
            })
        })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ isDeleted: true })
                }
            })
            .catch(err => err)
    }

    handleSelectOnChange(e) {
        e.preventDefault()
        const _selectedOption = document.querySelector('#vote').value
        if (_selectedOption === 'Vote for another option') {
            this.setState({
                isOptionVisible: true
            })
        } else {
            this.setState({
                isOptionVisible: false
            })
        }
    }

    render() {
        data.labels = this.state.poll.options;
        data.datasets[0].data = this.state.poll.data;

        if (this.state.poll._id === '') {
            return (
                <div>
                    <Loading />
                </div>
            )
        }

        let ownerDeleteButton = ''
        if (this.props.isAuthenticated && this.state.poll.createdBy === this.props.userId) {
            ownerDeleteButton = <button onClick={this.handleDeleteButton.bind(this)} className="fixed-size btn btn-danger top-space"><i className="fa fa-ban"></i> Delete This Poll</button>
        }

        let isDeletedRedirect = ''
        if (this.state.isDeleted) {
            isDeletedRedirect = <Redirect to="/" />
        }

        let newOption = ''
        if (this.props.isAuthenticated && this.state.isOptionVisible) {
            newOption = (
                <div>
                    <input id="newoption" type="text" className="form-control fixed-size bottom-space-15px" placeholder="Write your option here" />
                </div>
            )
        }

        let voteForAnotherOption = ''
        if (this.props.isAuthenticated) {
            voteForAnotherOption = <option>Vote for another option</option>
        }

        let twitterHref = 'https://twitter.com/intent/tweet?url=' + window.location.href + '&text=' + this.state.poll.name

        return (
            <div className="row">
                <div className="col">
                    <h3 className="bottom-space">{this.state.poll.name}</h3>

                    <form method="post" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="vote">I would like to vote for:</label>
                            <select name="vote" className="form-control fixed-size" id="vote" ref="select" onChange={this.handleSelectOnChange.bind(this)}>
                                {this.state.poll.options.map((op, n) =>
                                    <option key={n}>{op}</option>
                                )}
                                {voteForAnotherOption}
                            </select>
                        </div>
                        {newOption}
                        <input type="submit" className="fixed-size btn btn-primary" value="Submit" />
                    </form>
                    <a className="fixed-size btn btn-primary btn-twitter top-space" href={twitterHref}><i className="fa fa-twitter"></i> Share on Twitter</a>

                    {ownerDeleteButton}

                </div>
                <div className="col">
                    <Doughnut data={data} redraw />
                </div>

                {isDeletedRedirect}
            </div>
        );
    }
}