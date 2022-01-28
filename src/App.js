import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Routes, Route } from "react-router-dom";
import SearchBooks from "./SearchBooks";

class App extends Component {
  state = {
    my_library_state: [],
  };

  componentDidMount() {
    // This api request gets all books in my library.
    BooksAPI.getAll().then((all_books) => {
      this.setState(() => ({ my_library_state: all_books }));
    });
  }

  moveBook = (a_book, a_shelf) => {
    // Update the shelf of a book in the backend.
    BooksAPI.update(a_book, a_shelf).then((resp) => {
      a_book.shelf = a_shelf; //set new shelf attribute of the book which is to move
      this.setState((old_library_state) => ({
        my_library_state: old_library_state.my_library_state
          .filter((oldbook) => {
            return oldbook.id !== a_book.id;
          })
          .concat([a_book]),
      }));
    });
  };

  render() {
    const { my_library_state } = this.state;

    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Bookshelf
                my_library_books={my_library_state}
                onMoveBook={this.moveBook}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchBooks
                my_library_books={my_library_state}
                onMoveBook={this.moveBook}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
