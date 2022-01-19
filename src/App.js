import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";

class App extends Component {
  state = {
    showSearchPage: false,
    my_library_state: {},
    all_books_query: [],
  };

  componentDidMount() {
    // get all books in my library
    BooksAPI.getAll().then((all_books) => {
      console.log("API request: all_books");
      console.log(all_books);

      const the_data = {
        currentlyReading: [],
        read: [],
        wantToRead: [],
        // noCategory: [],
      };
      // categories: currentlyReading, wantToRead, read, remove (noCategory)
      // filter my_library_state by category
      all_books.filter((a_book) => {
        if (a_book.shelf === "currentlyReading") {
          the_data.currentlyReading.push(a_book);
        } else if (a_book.shelf === "read") {
          the_data.read.push(a_book);
        } else if (a_book.shelf === "wantToRead") {
          the_data.wantToRead.push(a_book);
        }
        // } else {
        //   the_data.noCategory.push(a_book);
        // }
      });
      console.log("filter books by category and assing to the_data");
      console.log(the_data);
      this.setState(() => ({ my_library_state: the_data }));
      console.log(
        "update this.state.my_library_state with filtered data from API request"
      );
      console.log(this.state.my_library_state);
    });
  }

  // searchAllBooks(a_query) {
  //   BooksAPI.search(a_query).then((the_response) => {
  //     console.log(`searchAllBooks: a_query: ${a_query}`);
  //     console.log(the_response);
  //     // TODO: if book in my library add the shelf to the book
  //     // return this result to SearchBooks component
  //     this.setState((oldAppState) => ({
  //       all_books_query: oldAppState.the_response,
  //     }));
  //   });
  // }

  // addBookToLib(a_book, a_shelf) {
  //   BooksAPI.update(a_book, a_shelf).then((the_response) => {
  //     console.log(`addBookToLib: a_book: ${a_book} a_shelf: ${a_shelf} `);
  //     console.log(the_response);
  //     // TODO: add selected book to library and update state of app
  //     // this.setState((oldAppState) => ({
  //     //   my_library_state: oldAppState.the_response,
  //     // }));
  //   });
  // }

  render() {
    const { my_library_state } = this.state;
    console.log(my_library_state);
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Bookshelf my_library_books={my_library_state} />}
          />
          <Route
            path="/search"
            element={<SearchBooks my_library_books={my_library_state} />}
          />
          {/* <Route path="/" element={<Bookshelf all_books={my_library_state} />} /> */}
        </Routes>
        <div className="open-search">
          <Link to="/search">Add a book to your library</Link>
        </div>
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
