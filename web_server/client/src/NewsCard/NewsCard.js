import React from 'react';
import Auth from '../Auth/Auth';

import './NewsCard.css';

class NewsCard extends React.Component {
    redirectURL(url) {
        this.sendClickLog();
        window.open(url, '_blank');
    }

    sendClickLog() {
        let url = 'http://localhost:3000/news/userId/' + Auth.getEmail()
                  + '/newsId/' + this.props.news.digest;
    
        let request = new Request(encodeURI(url), {
          method: 'POST',
          headers: {
            'Authorization': 'bearer ' + Auth.getToken(),
          },
          cache: false});
    
        fetch(request);
    }

    render() {
        return(
            <div className='news-container' onClick={()=>this.redirectURL(this.props.news.url)}>
                <div className='row'>
                    <div className='col s12 m4 l4' fill>
                        <img className="responsive-img" src={this.props.news.urlToImage} alt='news icon' />
                    </div>
                    <div className='col s12 m8 l8'>
                        <div className='news-intro-col'>
                            <div className='news-intro-panel'>
                                <h4>{this.props.news.title}</h4>
                                <div className='news-description'>
                                    <p>{this.props.news.description} </p>
                                    <div>
                                        {this.props.news.source!=null && <div className='chip light-pink news-chip'>{this.props.news.source} </div>}
                                        {this.props.news.reason!=null && <div className='chip light-pink news-chip'>{this.props.news.reason} </div>}
                                        {this.props.news.time!=null && <div className='chip light-pink news-chip'>{this.props.news.publishedAt} </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
        );

    }
}

export default NewsCard;