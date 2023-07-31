import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    name: '',
    list: [],
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.get(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        //console.log(res);
        console.log(res.data);
        this.setState({list: res.data})
      })
  }

  render() {
    return (
      <div>
        {this.state.list.map((val, ind) => (
            <li key={val.id} style={{ textAlign: 'left' }}> 
                {val.id + ':' + val.name + ', ' + val.email} <br />
            </li>
        ))}
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
