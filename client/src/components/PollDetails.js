import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Loading } from './Loading';
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
                id: -1,
                data: [],
                options: []
            },
        };
    }
    componentWillMount() {
        let _id = this.props.match.params.pollId;
        fetch("/polls/" + _id)
            .then(res => res.json())
            .then(poll => this.setState({ poll: poll }))
            .catch(err => err)
    }

    handleSubmit(e) {
        e.preventDefault()
        const _selectedOption = document.querySelector('#vote').value
        const _id = this.state.poll.id
        const _dataIndex = this.state.poll.options.indexOf(_selectedOption)

        let _poll = this.state.poll
        _poll.data[_dataIndex]++

        axios.post('/polls/vote', {
            id: _id,
            vote: _selectedOption,
            dataIndex: this.state.poll.options.indexOf(_selectedOption)
        }).then((res) => {
            this.setState({
                poll: _poll
            })
        })
    }

    render() {
        data.labels = this.state.poll.options;
        data.datasets[0].data = this.state.poll.data;

        if (this.state.poll.id === -1) {
            return (
                <div>
                    <Loading />
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col">
                    <h3 className="bottom-space">{this.state.poll.name}</h3>

                    <form method="post" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="vote">I would like to vote for:</label>
                            <select name="vote" className="form-control fixed-size" id="vote">
                                {this.state.poll.options.map((op, n) =>
                                    <option key={n}>{op}</option>
                                )}
                            </select>
                        </div>
                        <input type="submit" className="fixed-size btn btn-primary" value="Submit" />
                    </form>
                    <button className="fixed-size btn btn-primary btn-twitter top-space"><i className="fa fa-twitter"></i> Share on Twitter</button>
                </div>
                <div className="col">
                    <Doughnut data={data} redraw />
                </div>
            </div>
        );
    }
}