import React, { Component } from 'react';
import {BaseRequests} from "./fetchRequests";
//2 import {newsEmitter} from './EE'

const requests = new BaseRequests();
//2 let ee = require('event-emitter');
//2 let emitter = newsEmitter, listener;

// let ee = new EventEmitter;

export class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleName: '',
            articlePrev: '',
            articleText: '',
        };
    };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    clearForm = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({articleName: ''});
        this.setState({articlePrev: ''});
        this.setState({articleText: ''});
    };

    // onBtnClickHandler = (e) => {
    //     let item = {
    //         articleName: this.state.articleName,
    //         articlePrev: this.state.articlePrev,
    //         articleText: this.state.articleText
    //     };
    //
    //     e.preventDefault();
    //
    //     // requests.addArticle(item).then(r => {
    //     //     emitter.emit('Article.add', item);
    //     // })
    //
    //     // requests.addArticle(item).then(r => {
    //     //         ee.emit('Article.add', item);
    //     //         console.log(ee.emit('Article.add', item));
    //     //     })
    // };

    render () {
        let item = {
            articleName: this.state.articleName,
            articlePrev: this.state.articlePrev,
            articleText: this.state.articleText
        };
        return (
            <form className='addForm'>
                <input
                    name='articleName'
                    type='text'
                    className='add__author'
                    value={this.state.articleName}
                    onChange={this.handleUserInput}
                    placeholder='Заголовок'
                />
                <textarea
                    name='articlePrev'
                    className='add__text'
                    value={this.state.articlePrev}
                    onChange={this.handleUserInput}
                    placeholder='Превью текст'
                ></textarea>
                <textarea
                    name='articleText'
                    className='add__bigText'
                    value={this.state.articleText}
                    onChange={this.handleUserInput}
                    placeholder='Текст новости'
                ></textarea>

                <button
                    type='submit'
                    className='add__btn'
                    // onClick={this.onBtnClickHandler}
                    onClick={(e) => this.props.addItem(e, item, this.clearForm)}
                    >
                    Add
                </button>
            </form>

        )
    }
}

export class OpenAddForm extends Component {
    // constructor(props) {
    //     super(props);
    //     // this.toggleForm = this.toggleForm.bind(this);
    //     this.state = { formIsOpened: this.props.formState };
    // };

    state = {
        formIsOpened : this.props.formState
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.formIsOpened !== nextProps.formState) {
            return {
                formIsOpened: nextProps.formState
            };
        }
        return null;
    }

    // toggleForm = (e) => {
    //     e.preventDefault();
    //     if (this.state.formIsOpened) {
    //         this.setState({formIsOpened: false});
    //     } else
    //         this.setState({formIsOpened: true});
    // };

    render() {
        let formIsOpened = this.state.formIsOpened,
            buttonText,
            form,
            formOpened,
            button;

        if (formIsOpened) {
            form = <AddForm addItem={this.props.addItem}/>;
            buttonText = "Close Form";
            formOpened ='open__form red'
        } else {
            form = null;
            buttonText = "Open Form";
            formOpened='open__form '
        }

        return (
            <div>
                <button
                    // onClick={this.toggleForm}
                        onClick={(e) => this.props.toggleState(e, this.state.formIsOpened)}
                        className={formOpened}
                >{buttonText}</button>
                {form}
            </div>
        )
    }
}

