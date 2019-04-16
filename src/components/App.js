    import React from 'react';
import Header from './Header';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/votes/question")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionText: result.questionText
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, questionText } = this.state;

        if (error) {
            return (
                <div className="container-fluid">
                    <Header title="No question"
                            status="This is a status"
                            isError={true}
                    />
                </div>
            );
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="container-fluid">
                    <Header title={questionText}
                            status="This is a status"
                            isError={true}
                    />
                </div>
            )
        }
    }
}