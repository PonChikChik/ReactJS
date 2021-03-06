import React from 'react';
// import logo from './logo.svg';
// import PropTypes from 'prop-types';
import { Add } from './components/Add';
import { News } from './components/News';
// import newsData from './data/newsData';
import './App.css';

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('http://localhost:3000/data/newsData.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({isLoading: false, news: data});
      })
  }

  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    const {news, isLoading} = this.state;

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews}/>
        <h3>Новости</h3>
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App;
