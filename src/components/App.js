import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './Header';
import RegisterBox from './RegisterBox';

let SERVER_URL = 'localhost:8080';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            isRegistered: false,
            errorMessage: ''
        }
        // Binding is needed to be able access 'this' within the handler method!
        this.register = this.register.bind(this);
    }

    componentDidMount() {
        console.log("Server set to '%s'", SERVER_URL);
    }

    pollForQuestion() {
        fetch("http://" + SERVER_URL + "/votes/question")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error from the server')
                }
                return res.json()
            })
            .then(json => {
                let actQuestion = 'Waiting for new question...';
                if (json.questionText.length > 0) {
                    actQuestion = json.questionText
                }
                this.setState({
                    question: actQuestion
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    question: "No question"
                })
            })
    }

    register(email) {
        if (email.length === 0) {
            console.error('No email set!')
            return
        }
        const tokenDto = {
            'email': email
        }
        const request = new Request('http://' + SERVER_URL + '/votes', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(tokenDto)
        });
        fetch(request).then(res => {
            if (!res.ok) {
                throw Error('Already registered from this computer!')
            }
            return res.json()
        }).then(json => {
            setInterval(() => {
                this.pollForQuestion();
            }, 1000)
            this.setState({
                isRegistered: true,
                token: json.token
            })
        }).catch(err => {
            console.error(err);
            this.setState({
                errorMessage: err.message
            })
        })
    }

    /*
    async pollForQuestion() {
      try {
        const res = await fetch("http://" + SERVER_URL + "/votes/question")
        if (!res.ok) {
          throw new Error('Error from the server')
        } else {
          let actQuestion = 'Waiting for new question...'
          if (res.status === 200) {
            const json = await res.json();
            if (json.questionText.length > 0) {
              actQuestion = json.questionText
            }
          }
          this.setState({
            question: actQuestion
          })
      }
      } catch (e) {
        console.log(e);
        this.setState({
          question: "No question"
        })
      }
    }
    */

    /*
    async register(email) {
      if (email.length === 0) {
        console.error('No email set!')
        return
      }
      const tokenDto = {
        'email': email
      }
      const request = new Request('http://' + SERVER_URL + '/votes', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(tokenDto)
      });
      try {
        const res = await fetch(request);
        if (!res.ok) {
          throw Error('Already registered from this computer!')
        }
        const json = await res.json();
        setInterval(() => {
          this.pollForQuestion();
        }, 1000)
        this.setState({
          isRegistered: true,
          token: json.token
        })
      } catch(err) {
        console.error(err);
        this.setState({
          errorMessage: err.message
        })
      }
    }
    */

    render() {
        return (
            <Container fluid>
                <Header
                    title='Interactive Voting System'
                    lead='Version 0.0.1' />
                {(!this.state.isRegistered) ? (
                    <RegisterBox handler={this.register}
                                 error={this.state.errorMessage}
                    />
                ) : (
                    <h2>{this.state.question}</h2>
                )}
            </Container>
        );
    }
}

App.defaultProps = {
    question: 'Waiting for new question...'
}
export default App;
