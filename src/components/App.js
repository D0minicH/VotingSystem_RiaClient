    import React from 'react';
import Header from './Header';

export default class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header title="Hello from JavaScript Client"
                        status="This is a status"
                        isError={true}
                        />
            </div>
        )
    }
}