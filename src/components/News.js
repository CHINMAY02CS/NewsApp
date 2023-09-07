import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general'
  }
  static propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=(write your api key here without parentheses&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    });
  }

  handlepreclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=(write your api key here without parentheses&page=${
      this.state.page- 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      page: this.state.page- 1,
      articles: parsedData.articles,
      loading:false
    });
  };
  handlenextclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=(write your api key here without parentheses&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
   
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsApp - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  imageurl={element.urlToImage ? element.urlToImage : ""}
                  newsurl={element.url} author = {element.author?element.author:"unknown"} publishedAt = {element.publishedAt}
                />{" "}
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-success"
            onClick={this.handlepreclick}
          >
            &larr;Prev
          </button>
          <button
            type="button"
            className="btn btn-success"
            disabled={this.state.page+1 >(Math.ceil(this.state.totalResults/this.props.pageSize))}
            onClick={this.handlenextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
