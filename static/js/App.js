// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            descriptionInput: "",
            list: [],
            searchQuery: "",
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Set a description input value
    updateDescriptionInput(value) {
        this.setState({
            descriptionInput: value,
        });
    }

    // Set the search query
    updateSearchQuery(value) {
        this.setState({
            searchQuery: value,
        });
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const currentTime = new Date().toLocaleString();
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,

                // Add a description to the task
                description: this.state.descriptionInput,

                // Set completed status
                completed: false,

                // Set expanded status
                expanded: false,

                // Set timestamp
                timestamp: currentTime,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
                descriptionInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    editItem = (index) => {
        const todos = [...this.state.list];
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodos = [...todos]
            updatedTodos[index].value = editedTodo
            updatedTodos[index].timestamp = new Date().toLocaleString(); // Update timestamp
            this.setState({
                list: updatedTodos,
            });
        }
    }

    // Function to toggle completion status
    toggleComplete = (index) => {
        const todos = [...this.state.list];
        todos[index].completed = !todos[index].completed;
        todos[index].timestamp = new Date().toLocaleString(); // Update timestamp
        this.setState({
            list: todos,
        });
    }

    // Function to toggle expanded status
    toggleExpand = (index) => {
        const todos = [...this.state.list];
        todos[index].expanded = !todos[index].expanded;
        this.setState({
            list: todos,
        });
    }

    render() {
        // Filter the list based on the search query
        const filteredList = this.state.list.filter(item =>
            item.value.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        return (
            <Container>
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                    }}
                >
                    TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter your task.... "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Enter a description.... "
                                size="lg"
                                value={this.state.descriptionInput}
                                onChange={(item) =>
                                    this.updateDescriptionInput(item.target.value)
                                }
                                aria-label="add description"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search tasks..."
                                size="lg"
                                value={this.state.searchQuery}
                                onChange={(item) =>
                                    this.updateSearchQuery(item.target.value)
                                }
                                aria-label="search something"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup>
                            {/* map over and print items */}
                            {filteredList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListGroup.Item
                                            variant="dark"
                                            action
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: 'space-between',
                                                textDecoration: item.completed ? 'line-through' : 'none',
                                                backgroundColor: item.completed ? '#d4edda' : '#fff'
                                            }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <span onClick={() => this.toggleExpand(index)} style={{ cursor: "pointer" }}>
                                                    {item.value}
                                                </span>
                                                <span>
                                                    <Button style={{ marginRight: "10px" }}
                                                        variant="light"
                                                        onClick={() => this.deleteItem(item.id)}>
                                                        Delete
                                                    </Button>
                                                    <Button style={{ marginRight: "10px" }}
                                                        variant="light"
                                                        onClick={() => this.editItem(index)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="light"
                                                        onClick={() => this.toggleComplete(index)}>
                                                        {item.completed ? 'Undo' : 'Complete'}
                                                    </Button>
                                                </span>
                                            </div>
                                            {item.expanded && (
                                                <div style={{ marginTop: "10px" }}>
                                                    <p>Description: {item.description}</p>
                                                    <p>Last updated: {item.timestamp}</p>
                                                </div>
                                            )}
                                        </ListGroup.Item>
                                    </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;