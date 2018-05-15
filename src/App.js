import React, { Component } from 'react';
import {BaseRequests} from "./fetchRequests";
import {OpenAddForm} from './Form';
import Article from './Article';
import './App.css';
// import {newsEmitter} from './EE'
// import EventEmitter from '../node_modules/emitter-js/dist/emitter';



let ArticlesList = [];

const requests = new BaseRequests();

//Emitter
// let ee = require('event-emitter');
// let emitter = newsEmitter, listener;
// ee(EventEmitter.prototype);



class Articles extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.state = {showText: false, list: []};
    };

    componentWillReceiveProps (props) {
        this.setState({list: props.data})
    }

    deleteItem(e, articleToDeleteId) {
        e.preventDefault();
        requests.deleteArticle(articleToDeleteId).then(r => {
            let List = this.state.list;
            this.setState({list: List.filter(i => i.id !== articleToDeleteId)});
        })
    };

    updateItem(e, articleId, item, backToArticle) {
        e.preventDefault();
        requests.updateArticle(articleId, item).then(r => {
            item.id = articleId;
            let List = this.state.list;
            for(let i in List) {
                if(articleId === List[i].id) {
                    List[i] = item;
                    break;
                }
            }
            this.setState({list: List});
            backToArticle();

            // if(articleId == )
            // this.setState({list: this.state.list.filter(i => i.id !== articleId)});
            // console.log(this.state.list);
            // item.id = articleId;
            // console.log(item);
            // this.setState({list: this.state.list.push(item)});

        })
    };

    render () {
        return  <div className="Articles">
                    {this.state.list.map((item, index) => <Article key={index} data={item}  mode={false} onDelete={this.deleteItem} onUpdate={this.updateItem}/>)}
                </div>
    };
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {ArticlesList: [], formIsOpened: false};
    };

    componentWillMount() {
        requests.getData().then((data) => {
            for(let item in data) {
                data[item].id = item;
                ArticlesList.push(data[item]);
            }
            // ArticlesList.forEach((item,i, arr) => {
            //     item.id = i;
            // });
            this.setState({ArticlesList: data});
        });

        // emitter.on('Article.add', listener = (item) => {
        //     this.setState({ArticlesList: ArticlesList.push(item)});
        //     console.log(item);r
        // });
    };

    toggleForm = (e) => {
        e.preventDefault();
        if (this.state.formIsOpened) {
            this.setState({formIsOpened: false});
        } else
            this.setState({formIsOpened: true});
    };

    addItem = (e, item, clearForm) => {
        e.preventDefault();
        requests.addArticle(item).then(r => {
            this.setState({ArticlesList: ArticlesList.push(item)});
            clearForm();
         })
    };

    componentWillUnmount() {
        // emitter.off('Article.add', listener);
    };

  render() {

      return (
      <div className="App">
          <OpenAddForm addItem={this.addItem} formState={this.state.formIsOpened} toggleState={this.toggleForm}/>
          <Articles data={ArticlesList}/>
      </div>
    );
  }
}

export default App;
