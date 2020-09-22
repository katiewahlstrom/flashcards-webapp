import React, { Component } from "react";

class Content extends Component {
  state = {
    side_a: "",
    side_b: "",
    edit_card: null,
  };

  cardsList = () => {
    return this.props.stack ? (
      this.props.stack.cards.map((card, i) => {
        return (
          <div key={card.id} className="row card-container">
            <div className="col-5">
              <div className="card bg-light mb-3">
                <div className="card-header">Side A</div>
                <div className="card-body">
                  <p>{this.props.stack.cards[i].side_a}</p>
                </div>
              </div>
            </div>

            <div className="col-5">
              <div className="card bg-light mb-3">
                <div className="card-header">Side B</div>
                <div className="card-body">
                  <p>{this.props.stack.cards[i].side_b}</p>
                </div>
              </div>
            </div>

            <div className="col-2">
              <div className="mx-auto">
                <button
                  onClick={() =>
                    this.setState({
                      edit_card: card.id,
                      side_a: card.side_a,
                      side_b: card.side_b,
                    })
                  }
                  type="button"
                  className="btn btn-info btn-block"
                >
                  Edit
                </button>

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
    // debugger;
    this.setState({
      side_a: e.target.value,
    });
  };

  sideBUpdate = (e) => {
    // debugger;
    this.setState({
      side_b: e.target.value,
    });
  };

  handleCardChange = () => {
    if (this.state.edit_card) {
      const card = {
        id: this.state.edit_card,
        side_a: this.state.side_a,
        side_b: this.state.side_b,
      };
      this.props.editCard(card, this.props.stack._id);
    } else {
      const card = {
        id: Math.random(),
        side_a: this.state.side_a,
        side_b: this.state.side_b,
      };

      this.props.addCard(card, this.props.stack._id);
    }

    this.setState({
      side_a: "",
      side_b: "",
      edit_card: null,
    });
  };

  render() {
    if (this.props.stack) {
      return (
        <div className="col-9 content pt-4 text-center">
          <div className="container">
            <h1>{this.props.stack.title}</h1>
            <hr />
            <h3>{this.state.edit_card ? "Edit" : "Add"} a flashcard</h3>
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
                      onClick={() => this.handleCardChange()}
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
