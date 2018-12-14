import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/beers/all')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>List of Items</h1>
        {/* Check to see if any items are found*/}

        {list.length ? (
          <div>
            <table>
              <thead>
                <tr>
                  <td>
                      <h3>Bryggeri</h3>
                    </td>
                    <td>
                      <h3>Öl</h3>
                    </td>
                </tr>
              </thead>
              <tbody>
              {/* Render the list of items */}
              {list.map((item) => {
                return(
                  <tr>
                    <td>
                      {item.brewery}
                    </td>
                    <td>
                      {item.name}
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default List;