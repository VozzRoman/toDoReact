
import React, { Component } from "react";
import './ToDoEditor.css';
class ToDoEditor extends Component {
    state = { // 
        message: '',
    }
    hendelChangeEditor = e => {
    this.setState({message: e.currentTarget.value})
    }
    hendleSubmit = e => {
        e.preventDefault()
        this.props.textFromForm(this.state.message);
        this.setState({message: ''})// сброс формы текстариа

    }
    render() {
        return (
            <form className="todoeditor__form" onSubmit={this.hendleSubmit}>
                <textarea
                className="todoeditor__textarea"    
                value={this.state.message} 
                onChange={this.hendelChangeEditor}>

                </textarea>
                <button type="submit" 
                    className="todoeditor__bth">Сохранить</button>
                
            </form>
        )
    }
}

export default ToDoEditor;
