import React, { Component } from "react";

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageurl,newsurl} = this.props
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={imageurl?imageurl:"https://shorturl.at/cmqBD"} height="250px" width="100px" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
             {description}
            </p>
            <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;