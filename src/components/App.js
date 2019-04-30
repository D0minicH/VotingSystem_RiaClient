    import React from 'react';
import Header from './Header';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Hello from JavaScript Client"
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/votes/question")
            .then(res => {
                if ((!res.ok) || (res.status !== 200)) {
                    throw new Error('Error from the server')
                } else {
                    return res.json()
                }
            })
            .then(response => {
                console.log(response);
                this.setState({
                    title: response.questionText
                })
            })
            .catch(() => {
                this.setState({
                    title: "No question"
                })
            })
    }
    render() {
        const props = this.state;

            return (
                <div className="container-fluid">
                    <Header title={props.title}
                            status="Running"
                            isError={false}
                    />
                </div>
            )
        }
}