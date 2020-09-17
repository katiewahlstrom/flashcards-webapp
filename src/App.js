import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";
import { getStacks } from "./stacksService";

// App component is being rendered in the id=root html element
class App extends Component {
  state = {
    selectedStack: Object,
    stacks: [],
  };

  fetchStacks = () => {
    getStacks()
      .then((response) => {
        this.setState({
          stacks: response.data,
          selectedStack: response.data[0],
        });
      })
      .catch((error) => {
        debugger;
      });
  };

  clickStack = (id) => {
    console.log(this.state.stacks);
    this.setState({
      selectedStack: this.state.stacks.find((s) => s._id === id),
    });
  };

  updateCard = (stack_id, card_id, side, content) => {
    console.log("updating card", stack_id, card_id);

    let stack = this.state.stacks.find((s) => s._id === stack_id);

    stack.cards.find((c) => c.id === card_id)[side] = content;

    this.setState({
      stacks: this.state.stacks,
    });
  };

  addCard = (stack) => {
    // card = { id: 0, side_a: 'Example', side_b: 'Answer' }

    const otherStacks = this.state.stacks.filter((s) => s._id !== stack._id);

    this.setState({
      stacks: [stack, ...otherStacks],
    });
  };

  componentDidMount = () => {
    this.fetchStacks();
  };

  deleteCard = (stack_id, card_id) => {
    // find the stack to update
    const stack = this.state.stacks.find((s) => s._id === stack_id);

    // filter the stack cards that do not match the card id
    stack.cards = stack.cards.filter((c) => c.id !== card_id);

    // remove the stack from the rest to later add it again with a new list of cards
    const otherStacks = this.state.stacks.filter((s) => s._id !== stack_id);

    // add the new list of stacks plus the modified stack
    this.setState({
      stacks: [...otherStacks, stack],
    });
  };

  addStack = (title) => {
    const newStack = {
      id: Math.random(),
      title: title,
      cards: [],
    };

    // push new stack to array
    this.setState({
      stacks: [...this.state.stacks, newStack],
    });
  };

  handleDeleteStack = (stackId) => {
    debugger;
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* sidebar */}
          <Sidebar
            stacks={this.state.stacks}
            selected={this.state.selectedStack._id}
            clickStack={this.clickStack}
            addStack={this.addStack}
            handleDeleteStack={this.handleDeleteStack}
          />
          {/* CONTENT */}
          <Content
            stack={this.state.selectedStack}
            addCard={this.addCard}
            updateCard={this.updateCard}
            deleteCard={this.deleteCard}
          />
        </div>
      </div>
    );
  }
}

export default App;
