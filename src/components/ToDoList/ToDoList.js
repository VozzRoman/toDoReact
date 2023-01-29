import React from "react";
import classNames from "classnames";
import './ToDoList.css';
const ToDoList = ({todolist, onDeleteToDo, onToggleCompleted}) => {
    return (
		 <ul className="Todolist">
			 {todolist.map(todo => (
				 <li
					 key={todo.id}
					 className={classNames("Todolist__item", {
						 "TodoList__item--completed": todo.compledted,
					 })}>
					 <p className="TodoList__text">{todo.text}</p>
					 <input
						 type="checkbox"
						 className="TodoList__checkbox"
						 checked={todo.compledted}
						 onChange={() => onToggleCompleted(todo.id)}
					 />
					 
					 <button
						 onClick={() => onDeleteToDo(todo.id)}
						 type="button"
						 className="TodoList__bth"
					 	>
						 Удалить
					 </button>
				 </li>
			 ))}
		  </ul>
    )
}
export default ToDoList;
