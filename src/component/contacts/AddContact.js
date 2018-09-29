import React, { Component } from "react";
import { Consumer } from "../../context";
//import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  onValueChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check input error
    if (name === "") {
      this.setState({ error: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ error: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ error: { phone: "Phone Number is required" } });
      return;
    }

    const newContact = {
      //id: uuid(),
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

    // Clear Error State
    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {}
    });

    // Redirect back to the home page
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder="Enter your name..."
                    onValueChange={this.onValueChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="E-mail"
                    name="email"
                    value={email}
                    placeholder="Enter your email..."
                    type="email"
                    onValueChange={this.onValueChange}
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    value={phone}
                    placeholder="Enter your phone..."
                    onValueChange={this.onValueChange}
                    error={error.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
