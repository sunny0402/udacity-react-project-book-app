import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";

class App extends Component {
  state = {
    my_library_state: [],
  };

  componentDidMount() {
    // get all books in my library
    BooksAPI.getAll().then((all_books) => {
      console.log("BooksAPI.getAll(): all_books");
      console.log(all_books);

      this.setState(() => ({ my_library_state: all_books }));

      console.log(
        `BooksAPI.getAll():this.state.my_library_state ${
          this.state.my_library_state
        }`
      );
    });
  }

  moveBook = (a_book, a_shelf) => {
    BooksAPI.update(a_book, a_shelf).then((resp) => {
      console.log(`addBookToLib: a_book: ${a_book} a_shelf: ${a_shelf} `);
      console.log(`addBookToLib: a_book: ${resp}`);
      a_book.shelf = a_shelf; //set new shelf attribute of book
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
    console.log("App: my_library_state");
    console.log(my_library_state);
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
          {/* <Route path="/" element={<Bookshelf all_books={my_library_state} />} /> */}
        </Routes>
        {/* <div className="open-search">
          <Link to="/search">
            <button>Add a book to your library</button>
          </Link>
        </div> */}
      </div>
    );
  }
}

export default App;

// Bookshelf component needs to have a link to search
// or Link to search in app component...
/* <div className="open-search">
<Link to="/search">Add a book</Link>
</div> */
