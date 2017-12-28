import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PollList } from './components/PollList';
import { PollDetails } from './components/PollDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    };
  }

  componentDidMount() {
    fetch("/polls")
      .then(res => res.json())
      .then(polls => this.setState({ polls: polls }))
      .catch(err => err)
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container">
            <div className="bg-box">
              <Route exact path="/" render={() => <PollList polls={this.state.polls} />} />
              <Route exact path="/polls" render={() => <PollList polls={this.state.polls} />} />
              <Route path="/polls/:pollId" component={PollDetails} />
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;