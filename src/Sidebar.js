import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  stacks,
  clickStack,
  selected,
  addStack,
  handleDeleteStack,
}) => {
  let newStackTitle = "";

  const formSubmit = (e) => {
    e.preventDefault();
    addStack(newStackTitle);

    console.log(newStackTitle);

    newStackTitle = "";
  };

  const updateText = (e) => {
    console.log(e.target.value);
    newStackTitle = e.target.value;
  };

  const stackList = stacks.length ? (
    stacks.map((stack) => {
      return (
        <li
          key={stack._id}
          onClick={() => {
            clickStack(stack._id);
          }}
          className={`list-group-item ${
            selected === stack._id ? "active" : ""
          }`}
        >
          <p>{stack.title}</p>
          <div
            className="delete-stack"
            onClick={() => {
              handleDeleteStack(stack._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#F44336"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </li>
      );
    })
  ) : (
    <p className="center">You do not have any todo's left</p>
  );
  return (
    <div className="col-3 sidebar pt-4">
      <form className="form-inline" onSubmit={formSubmit}>
        <input
          type="text"
          onChange={updateText}
          className="form-control"
          placeholder="Stack name"
        />
        <button
          onClick={() => formSubmit}
          type="submit"
          value="Submit"
          className="btn btn-secondary"
          id="button-addon2"
        >
          Create
        </button>
      </form>
      <ul className="list-group mt-4">{stackList}</ul>
    </div>
  );
};

export default Sidebar;
