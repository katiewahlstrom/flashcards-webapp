import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./App.css";
import {
  getStacks,
  createStack,
  deleteStack,
  updateStack,
} from "./stacksService";

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

  updateCard = (stack_id, card_id, side_a, side_b) => {
    console.log("updating card", stack_id, card_id);

    const stack = this.state.stacks.find((s) => s._id === stack_id);

    const card = stack.cards.find((c) => c.id === card_id);
    card.side_b = side_b;
    card.side_a = side_a;

    // this.setState({
    //   stacks: this.state.stacks,
    // });
    debugger;
    updateStack(stack_id, stack)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
  };

  addCard = (card, stackId) => {
    // card = { id: 0, side_a: 'Example', side_b: 'Answer' }

    const stack = this.state.stacks.find((s) => s._id === stackId);

    stack.cards.push(card);

    updateStack(stackId, stack)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
  };

  editCard = (newCard, stackId) => {
    const stack = this.state.stacks.find((s) => s._id === stackId);

    const card = stack.cards.find((c) => c.id === newCard.id);
    card.side_a = newCard.side_a;
    card.side_b = newCard.side_b;

    updateStack(stackId, stack)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
  };

  componentDidMount = () => {
    this.fetchStacks();
  };

  deleteCard = (stackId, cardId) => {
    const stack = this.state.stacks.find((s) => s._id === stackId);
    const otherCards = stack.cards.filter((c) => c.id !== cardId);
    stack.cards = otherCards;
    updateStack(stackId, stack)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
  };

  addStack = (title) => {
    const newStack = {
      title: title,
      cards: [],
    };

    createStack(newStack)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
  };

  handleDeleteStack = (stackId) => {
    deleteStack(stackId)
      .then(() => {
        this.fetchStacks();
      })
      .catch((error) => {
        debugger;
      });
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
            editCard={this.editCard}
            updateCard={this.updateCard}
            deleteCard={this.deleteCard}
          />
        </div>
      </div>
    );
  }
}

export default App;
