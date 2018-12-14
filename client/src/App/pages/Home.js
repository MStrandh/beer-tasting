import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Julölsprovning 2018</h1>

      <Link to={'./beerlist'}>
        <button variant="raised">
            Öl-lista
        </button>
      </Link>
      <Link to={'./vote'}>
        <button variant="raised">
            Rösta
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;