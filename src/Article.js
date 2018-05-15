import React, { Component } from 'react';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.toogleText = this.toogleText.bind(this);
        this.openUpdateForm = this.openUpdateForm.bind(this);
        this.backToArticle = this.backToArticle.bind(this);
        this.state = {
            showText: false,
            updateMode: false,
            articleName: '',
            articlePrev: '',
            articleText: ''
        };
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if  (prevState.articleName !==  nextProps.articleName ||
    //         prevState.articlePrev !==  nextProps.articlePrev ||
    //         prevState.articleText !==  nextProps.articleText) {
    //         return {
    //             articleName: nextProps.articleName,
    //             articlePrev: nextProps.articlePrev,
    //             articleText: nextProps.articleText,
    //             // articleName: this.props.data.articleName
    //             // articlePrev: this.props.data.articlePrev,
    //             // articleText: this.props.data.articleText
    //         }
    //     }
    //
    //     return null;
    //
    // }

    toogleText(e) {
        e.preventDefault();
        this.setState({showText: !this.state.showText});
    }
    openUpdateForm(e) {
        e.preventDefault();
        this.setState({updateMode: true});
        this.setState({articleName: this.props.data.articleName});
        this.setState({articlePrev: this.props.data.articlePrev});
        this.setState({articleText: this.props.data.articleText});
    }
    backToArticle(e) {
        if(e) {
            e.preventDefault();
        }
        this.setState({updateMode: false});
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    render() {
        let item = {
            articleName: this.state.articleName,
            articlePrev: this.state.articlePrev,
            articleText: this.state.articleText
        };
        let article =
                <article>
                    <h1 className="article_name">{this.props.data.articleName}</h1>
                    <p className={'article_prev ' + (this.state.showText ? 'none' : '')}>{this.props.data.articlePrev}</p>
                    <div className={'article_text ' + (this.state.showText ? '' : 'none')}>{this.props.data.articleText}</div>
                    <div className="Buttons">
                        <button className="open_more" onClick={this.toogleText}>{this.state.showText? "Hide Text":"Show Text"}</button>
                        <button className="delete" onClick={(e) => this.props.onDelete(e, this.props.data.id)}>Delete</button>
                        <button className="update" onClick={this.openUpdateForm}>Edit</button>
                    </div>
                </article>,

            form = <form className='addForm'>
                <input
                    name='articleName'
                    type='text'
                    className='add__author'
                    value={this.state.articleName}
                    onChange={this.handleUserInput}
                    placeholder={this.state.articleName}
                />
                <textarea
                    name='articlePrev'
                    className='add__text'
                    value={this.state.articlePrev}
                    onChange={this.handleUserInput}
                    placeholder={this.state.articlePrev}
                ></textarea>
                <textarea
                    name='articleText'
                    className='add__bigText'
                    value={this.state.articleText}
                    onChange={this.handleUserInput}
                    placeholder={this.state.articleText}
                ></textarea>

                <button
                    type='submit'
                    className='updateArticle'
                    onClick={(e) => this.props.onUpdate(e, this.props.data.id, item, this.backToArticle, this.state.updateMode)}>
                    Update
                </button>
                <button
                    className='backToArticle'
                    onClick={this.backToArticle}
                >
                    Back to article
                </button>
            </form>;

        return  <div className="Article">
                    {this.state.updateMode ? form : article}
                </div>
    }
}