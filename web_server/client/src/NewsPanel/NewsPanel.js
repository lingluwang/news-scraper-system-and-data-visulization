import React from 'react';
import Auth from '../Auth/Auth';

import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard.js';
import _ from 'lodash'; // debouncing package


//all news data are stored in NewsPanel
// then transfer to news Card to display on GUI
/*-----------
@this.state.news: array of JSON object
-------------*/
class NewsPanel extends React.Component {
    constructor() {
        super();

        // state record pageNum and if loaded All news
        this.state = {
            news: null,
            pageNum: 1,
            loadedAll:false 
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    
    componentDidMount() {
       this.loadNews();
       this.loadNews = _.debounce(this.loadNews,1000); // debouncing bind
       window.addEventListener('scroll', this.handleScroll); //bind mouse scroll event
    }

    // mouse scroll event handler
    handleScroll() {
        let scrollY = window.scrollY ||
                      window.pageYOffset ||
                      document.documentElement.scrollTop;
        if ((window.innerHeight + scrollY) > (document.body.offsetHeight -50)){
            console.log("loading more news");
            this.loadNews();
        }
    }

    //fetch data from server side
    // 1. create a http object which would be used to get resources through http request
    // 2. use fetch API to receive async response
    loadNews() {
        if (this.state.loadedAll === true) {
            return;
        }

        let url = 'http://localhost:3000/news/userId/' + Auth.getEmail()
        + '/pageNum/' + this.state.pageNum;

        console.log(encodeURI(url));
        
         //construct a http request object for getting resources through internet
         let request = new Request (encodeURI(url), {
            method: 'GET',
            cache:false,
            headers: {
                'Authorization': 'bearer ' + Auth.getToken()
            }
        });

        fetch(request)
            .then((res)=>res.json())
            .then((news)=>{
                if (!news || news.length === 0) {
                    this.setState({loadedAll: true});
                }
                this.setState({
                    news: this.state.news ? this.state.news.concat(news) : news,
                    pageNum: this.state.pageNum + 1
                });
            });
    }

    renderNews() {
        const news_list = this.state.news.map((news) => {
            return (
                <a className='collection-item' href='#'>
                    <NewsCard news={news}/> 
                </a>
            );
        });

        return(
            <div >
                <div className='collection'>
                    {news_list}
                </div>
            </div>
        );

    }

    render(){
        if (this.state.news) {
            return (
                <div>
                    {this.renderNews()}
                </div>
            );

        } else {
            return(
                <div id='msg-app-loading'>
                    <h1> LOADING...</h1>
                </div>
            );
        }
    }
}

export default NewsPanel;
