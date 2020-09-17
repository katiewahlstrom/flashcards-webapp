import React, { Component } from "react";

class Content extends Component {
  state = {
    side_a: "",
    side_b: "",
    edit_card: null,
  };

  cardsList = () => {
    return this.props.stack !== Object ? (
      this.props.stack.cards.map((card, i) => {
        const sideAInputChanged = (e) => {
          this.props.updateCard(
            this.props.stack._id,
            card.id,
            "side_a",
            e.target.value
          );
        };

        const sideBInputChanged = (e) => {
          this.props.updateCard(
            this.props.stack._id,
            card.id,
            "side_b",
            e.target.value
          );
        };

        return (
          <div key={card.id} className="row card-container">
            <div className="col-5">
              <div className="card bg-light mb-3">
                <div className="card-header">Side A</div>
                <div className="card-body">
                  {this.state.edit_card === card.id ? (
                    <input
                      className={`form-control`}
                      onChange={sideAInputChanged}
                      value={this.props.stack.cards[i].side_a}
                    />
                  ) : (
                    <p>{this.props.stack.cards[i].side_a}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-5">
              <div className="card bg-light mb-3">
                <div className="card-header">Side B</div>
                <div className="card-body">
                  {this.state.edit_card === card.id ? (
                    <input
                      className={`form-control`}
                      onChange={sideBInputChanged}
                      value={this.props.stack.cards[i].side_b}
                    />
                  ) : (
                    <p>{this.props.stack.cards[i].side_b}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="mx-auto">
                {this.state.edit_card !== card.id ? (
                  <button
                    onClick={() => this.setState({ edit_card: card.id })}
                    type="button"
                    className="btn btn-info btn-block"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => this.setState({ edit_card: null })}
                    type="button"
                    className="btn btn-warning btn-block"
                  >
                    Save
                  </button>
                )}
                <p></p>
                <button
                  onClick={() => {
                    this.props.deleteCard(this.props.stack._id, card.id);
                  }}
                  type="button"
                  className="btn btn-danger btn-block"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p>No Cards</p>
    );
  };

  sideAUpdate = (e) => {
    this.setState({
      side_a: e.target.value,
    });
  };

  sideBUpdate = (e) => {
    this.setState({
      side_b: e.target.value,
    });
  };

  submitNewCard = () => {
    console.log("submitting new card");
    this.props.stack.cards.push({
      id: Math.random(),
      side_a: this.state.side_a,
      side_b: this.state.side_b,
    });

    this.setState({
      side_a: "",
      side_b: "",
    });
    this.props.addCard(this.props.stack);
  };

  render() {
    if (this.props.stack !== Object) {
      return (
        <div className="col-9 content pt-4 text-center">
          <div className="container">
            <h1>{this.props.stack.title}</h1>
            <hr />
            <h3>Add a flashcard</h3>
            <div className="App">
              <div className="row card-container">
                <div className="col-5">
                  <div className="card bg-light mb-3">
                    <div className="card-header">Side A</div>
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.sideAUpdate}
                        value={this.state.side_a}
                        placeholder="Enter Question here"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-5">
                  <div className="card bg-light mb-3">
                    <div className="card-header">Side B</div>
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.sideBUpdate}
                        value={this.state.side_b}
                        placeholder="Enter Answer here"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-2">
                  <div className="mx-auto">
                    <p></p>
                    <button
                      type="button"
                      onClick={() => this.submitNewCard()}
                      className="btn btn-primary btn-block"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <h3>Saved Cards</h3>
              <br />
              {this.cardsList()}
            </div>
          </div>
        </div>
      );
    } else {
      return <p>No cards</p>;
    }
  }
}

export default Content;
