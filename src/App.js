import React, { Component } from "react";
import shortid from "shortid";
import ToDoList from "./components/ToDoList"; //reexport
import ToDoEditor from "./components/toDoEditor";
import Filter from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";

//Так как в тудуЛист мы будем менять Стейт и хранить его в Арр() то из функции мы дклаем класс
class App extends Component {
  state = {
    todolist: [
      // { id: "id-1", text: "Todo-1", compledted: false },
      // { id: "id-2", text: "Todo-2", compledted: true },
      // { id: "id-3", text: "Todo-3", compledted: false },
      // { id: "id-4", text: "Todo-4", compledted: true },
    ],
    filter: "",
    shoModal: false,
  };

  deleteToDo = (todoId) => {
    // создаем методкласса для удаления туду по Айди
    this.setState((prevStae) => ({
      // функция от предидущего
      todolist: prevStae.todolist.filter((todo) => {
        //фильтурем массив по айди
        return todo.id !== todoId;
      }),
    }));
  };

  toggleCompleted = (todoId) => {
    console.log(todoId);
    this.setState((prevStae) => ({
      todolist: prevStae.todolist.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            compledted: !todo.compledted,
          };
        }
        return todo;
      }),
    }));
  };

  //Метод Сабмит отправка формы
  hendleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  addFromFormToToDo = (text) => {
    // добовляем из формы текст в ТоДоЛист
    console.log(text);
    const todo = {
      id: shortid.generate(),
      text,
      compledted: false,
    };
    this.setState((prevState) => ({
      todolist: [todo, ...prevState.todolist],
    }));
  };

  //Метод фильтрация
  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  addVisibleToDo = () => {
    const normalize = this.state.filter.toLowerCase();
    return this.state.todolist.filter((todo) => {
      return todo.text.toLowerCase().includes(normalize);
    });
  };

  //-----------------------------------Запись в ЛокалСторедж-----------------------------------//

  componentDidMount() {
    console.log("App didAmount");
    const getToDoFromLocal = localStorage.getItem("todos");
    const parseToObject = JSON.parse(getToDoFromLocal);
    console.log(parseToObject);
    if (parseToObject) {
      this.setState({ todolist: parseToObject });
    }
  }

  componentDidUpdate(prevProps, prevStae) {
    //метод
    console.log("App didUpadate");
    console.log(prevStae); //предидущий стейт
    console.log(this.state); //текущий стейт
    if (this.state.todolist !== prevProps.todolist) {
      // по этому условию можно запихнуть массив в локалсторидж
      console.log("обновилось поле тодо");
      localStorage.setItem("todos", JSON.stringify(this.state.todolist));
    }
  }

  //-------------------------------ModalWindow----------------------------//
  toggleModal = () => {
    this.setState((prevStae) => ({
      shoModal: !prevStae.shoModal,
    }));
  };

  render() {
    const { todolist, shoModal } = this.state; // destructurisation
    const completedToDo = todolist.reduce((total, totdo) => {
      return totdo.compledted ? total + 1 : total;
    }, 0);
    console.log(completedToDo);
    const visibleListToDo = this.addVisibleToDo();
    return (
      <>
        {shoModal && (
          <Modal>
            <h2>Привет это контент модалки Children</h2>
            <p>
              Привет это контент модалки Children Привет это контент модалки
              Children Привет это контент модалки Children Привет это контент
              модалки Children Привет это контент модалки Children Привет это
              контент модалки Children Привет это контент модалки Children
              Привет это контент модалки Children
            </p>
            <button type="button" onClick={this.toggleModal}>
              Закрыть
            </button>
          </Modal>
        )}
        <button type="button" onClick={this.toggleModal}>
          открыть
        </button>

        <ToDoEditor textFromForm={this.addFromFormToToDo} />
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ToDoList
          todolist={visibleListToDo}
          onDeleteToDo={this.deleteToDo}
          onToggleCompleted={this.toggleCompleted}
        />
        <div className="tools__box"></div>
        <p>Количество: {todolist.length}</p>
        <p>Количество выполненых: {completedToDo}</p>

        {/* //передаем методкласса удаления туду в пропс */}
      </>
    );
  }
}

export default App;
