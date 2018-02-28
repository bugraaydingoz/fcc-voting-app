import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import './App.css';
import { Footer } from './components/Footer';
import { PollList } from './components/PollList';
import { PollDetails } from './components/PollDetails';
import { MyPolls } from './components/MyPolls'
import { NewPoll } from './components/NewPoll'
import TwitterLogin from 'react-twitter-auth'
import { Redirect } from 'react-router';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      isAuthenticated: false,
      user: {},
      token: ''
    };
  }

  componentDidMount() {
    fetch("/api/polls")
      .then(res => res.json())
      .then(polls => this.setState({ polls: polls }))
      .catch(err => err)
  }

  render() {
    // fetch("/api/polls")
    //   .then(res => res.json())
    //   .then(polls => this.setState({ polls: polls }))
    //   .catch(err => err)

    let twitter = !!this.state.isAuthenticated ?
      (
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/mypolls">
                My Polls
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newpoll">
                New Poll
              </Link>
            </li>

            <li className="nav-item">
              <button onClick={this.logout.bind(this)} className="btn btn-secondary" >
                Log out
              </button>
            </li>
          </ul>

        </div>
      ) :
      (
        <ul className="navbar-nav">
          <li className="nav-item">
            <TwitterLogin className="btn btn-primary btn-twitter" loginUrl="http://localhost:4000/api/auth/twitter"
              onFailure={this.onFailed.bind(this)} onSuccess={this.onSuccess.bind(this)}
              requestTokenUrl="http://localhost:4000/api/auth/twitter/reverse" />
          </li>
        </ul>
      )

    let authenticatedRoutes = !!this.state.isAuthenticated ?
      (
        <div>
          <Route exact path="/mypolls" render={() => <MyPolls isAuthenticated={this.state.isAuthenticated} user={this.state.user} />} />
          <Route exact path="/newpoll" render={() => <NewPoll isAuthenticated={this.state.isAuthenticated} user={this.state.user} />} />
        </div>
      ) :
      (
        <div>
          <Route exact path="/mypolls" render={() => <Redirect to="/" />} />
          <Route exact path="/newpoll" render={() => <Redirect to="/" />} />
        </div>
      )

    return (
      <Router>
        <div>
          <div className="header" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <Link className="navbar-brand" to="/">Polling App</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                {twitter}
              </div>
            </nav>
          </div >

          <div className="container">
            <div className="bg-box">
              <Route exact path="/" render={() => <PollList isAuthenticated={this.state.isAuthenticated} polls={this.state.polls} />} />
              <Route exact path="/polls" render={() => <PollList isAuthenticated={this.state.isAuthenticated} polls={this.state.polls} />} />
              <Route path="/polls/:pollId" render={(props) => <PollDetails isAuthenticated={this.state.isAuthenticated} userId={this.state.user.id} {...props} />} />
              {authenticatedRoutes}
              {/* <Redirect from="*" to="/" /> */}
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }

  onSuccess(response) {
    const token = response.headers.get('x-auth-token')
    response.json().then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  }

  onFailed(error) {
    alert(error)
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      user: {},
      token: ''
    })
  }
}

export default App;