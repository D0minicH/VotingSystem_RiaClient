import React from 'react';
import { Form, Button, Input, Row, Col } from 'reactstrap';

const error = {
    color: 'red'
};

/*Über diese Komponente kann die Email für die Registrierung eingegeben werden. Der Button
"Register" ruft die "register()" Methode in der Komponente App auf.*/
export default class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleChange = (e) => {
        if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        }
    }

    submit = () => {
        this.props.handler(this.state.email);
        this.setState({ email: '' });
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 2 }}>
                        <Input type="email"
                            name="email"
                            id="email"
                            placeholder="your email"
                            value={this.state.email}
                            onChange={this.handleChange} />
                    </Col>
                    <Col xs="1">
                        <Button color="secondary"
                            onClick={this.submit}>Register</Button>
                    </Col>
                </Row>
                <Row>
                    <Col style={error} sm="12" md={{ size: 6, offset: 2 }}>
                        {this.props.error}
                    </Col>
                </Row>
            </Form>
        )
    }
}