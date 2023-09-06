import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
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
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=b3ae91950a744ab6926f4a5474f8dd84&page=1&pageSize="20"`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults
    });
  }

  handlepreclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b3ae91950a744ab6926f4a5474f8dd84&page=${
      this.state.page- 1
    }&pageSize="20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      page: this.state.page- 1,
      articles: parsedData.articles,
    });
  };
  handlenextclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b3ae91950a744ab6926f4a5474f8dd84&page=${this.state.page+1}&pageSize="20`;
    if(this.state.page+1 >(Math.ceil(this.state.totalResults/20))){}
    else
   { let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });}
  };

  render() {
    return (
      <div className="container my-3">
        <h2>NewsApp - Top Headlines</h2>

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
                  newsurl={element.url}
                />{" "}
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-info"
            onClick={this.handlepreclick}
          >
            &larr;Prev
          </button>
          <button
            type="button"
            className="btn btn-info"
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
