import React, { Component } from "react";
import { Consumer } from "../../context";
//import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

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

    const updateContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
