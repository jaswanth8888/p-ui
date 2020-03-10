import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      submitted: false
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password } = this.state;
  if (username && password) {
      this.props.login(username, password);
  }
}
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
