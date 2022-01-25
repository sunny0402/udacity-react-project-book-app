import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBooks from "./SearchBooks";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.addBookToLib = this.addBookToLib.bind(this);
  // }
  state = {
    showSearchPage: false,
    my_library_state: {},
    // all_books_query: [],
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
        none: [],
      };
      // categories: currentlyReading, wantToRead, read, none
      // filter my_library_state by category
      all_books.filter((a_book) => {
        if (a_book.shelf === "currentlyReading") {
          the_data.currentlyReading.push(a_book);
        } else if (a_book.shelf === "read") {
          the_data.read.push(a_book);
        } else if (a_book.shelf === "wantToRead") {
          the_data.wantToRead.push(a_book);
        } else {
          the_data.none.push(a_book);
        }
      });
      console.log("filter books by category and assign to the_data");
      console.log(the_data);
      this.setState(() => ({ my_library_state: the_data }));
      console.log(
        "update this.state.my_library_state with filtered data from API request"
      );
      console.log(this.state.my_library_state);
    });
  }

  addBookToLib(a_book, a_shelf) {
    BooksAPI.update(a_book, a_shelf).then((resp) => {
      console.log(`addBookToLib: a_book: ${a_book} a_shelf: ${a_shelf} `);
      console.log(`addBookToLib: a_book: ${resp}`);

      const resp_values = Object.values(resp);
      console.log(`addBookToLib: resp_values ${resp_values}`);
      const resp_keys = Object.keys(resp);
      console.log(`addBookToLib: resp_keys ${resp_keys}`); //currentlyReading,wantToRead,read

      const { currentlyReading, wantToRead, read } = resp;
      console.log(`addBookToLib: currentlyReading ${currentlyReading}`);

      //fetch all the books again and update state
      //   BooksAPI.getAll().then((all_new_books) => {
      //     const the_new_data = {
      //       currentlyReading: [],
      //       read: [],
      //       wantToRead: [],
      //       none: [],
      //     };
      //     //TODO: put this filter in seperate method
      //     all_new_books.filter((a_book) => {
      //       if (a_book.shelf === "currentlyReading") {
      //         the_new_data.currentlyReading.push(a_book);
      //       } else if (a_book.shelf === "read") {
      //         the_new_data.read.push(a_book);
      //       } else if (a_book.shelf === "wantToRead") {
      //         the_new_data.wantToRead.push(a_book);
      //       } else {
      //         the_new_data.none.push(a_book);
      //       }
      //     });
      //     console.log("addBookToLib: the_new_data");
      //     console.log(the_new_data);
      //     this.setState(() => ({ my_library_state: the_new_data }));
      //   });
      // });
    });
  }

  // const resp_values = Object.values(resp);
  // console.log(`addBookToLib: resp_values ${resp_values}`);
  // const resp_keys = Object.keys(resp);
  // console.log(`addBookToLib: resp_keys ${resp_keys}`); //currentlyReading,wantToRead,read
  // console.log(
  //   `addBookToLib: resp.currentlyReading ${resp.currentlyReading}`
  // );

  // resp will return updated book object
  //TODO: update correct book
  // TODO: add selected book to library and update state of app
  // this.setState((oldAppState) => ({
  //   my_library_state: oldAppState.resp,
  // }));

  render() {
    const { my_library_state } = this.state;
    console.log(my_library_state);
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <Bookshelf
                my_library_books={my_library_state}
                onAddBookToLib={this.addBookToLib}
              />
            }
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
