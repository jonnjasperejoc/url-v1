import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Input
} from "reactstrap";

import axios from "axios";

class App extends Component {
    state = {
        showShortLink: false,
        shortLink: ""
    };

    onSubmit = e => {
        this.setState({
            showShortLink: false,
            shortLink: ""
        });

        e.preventDefault();
        const url = e.target.elements.url.value.trim();

        axios
            .post("/api/url", { url })
            .then(res => {
                this.setState({
                    showShortLink: true,
                    shortLink: res.data.randomId
                });
            })
            .catch(err => {
                console.log(err.response.data.msg);
            });
    };

    render() {
        if (this.props.match.params.id) {
            const randomId = this.props.match.params.id;
            axios
                .get("/api/url/" + randomId)
                .then(res => {
                    window.location.href = res.data.url;
                })
                .catch(err => {
                    console.log(err.response.data.msg);
                });
            return <div className="App"></div>;
        }

        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col lg="3"></Col>
                        <Col lg="6" id="content">
                            <h4>URL Shortener</h4>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Input
                                        type="text"
                                        name="url"
                                        placeholder="Url"
                                        required
                                    />
                                </FormGroup>
                                <Button color="primary">Submit</Button>
                                {this.state.showShortLink && (
                                    <div className="shortLink">
                                        Short URL:
                                        <a
                                            href={`/` + this.state.shortLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {`https://url-v1.herokuapp.com/` +
                                                this.state.shortLink}
                                        </a>
                                    </div>
                                )}
                            </Form>
                        </Col>
                        <Col lg="3"></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
