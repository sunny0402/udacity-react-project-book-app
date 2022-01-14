import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";

// const the_data = {
//   currentlyReading: [],
//   read: [],
//   wantToRead: [],
//   noCategory: [],
// };

class App extends React.Component {
  state = {
    showSearchPage: false,
    // app_books_state: [],
    app_books_state: {},
  };

  // componentDidMount() {
  //   BooksAPI.getAll().then((all_books) => {
  //     console.log("API request: all_books");
  //     console.log(all_books);
  //     this.setState(() => ({ app_books_state: all_books }));
  //     // categories: currentlyReading, wantToRead, read
  //     // filter app_books_state by category
  //     this.state.app_books_state.filter((a_book) => {
  //       if (a_book.shelf === "currentlyReading") {
  //         the_data.currentlyReading.push(a_book);
  //       } else if (a_book.shelf === "read") {
  //         the_data.read.push(a_book);
  //       } else if (a_book.shelf === "wantToRead") {
  //         the_data.wantToRead.push(a_book);
  //       } else {
  //         the_data.noCategory.push(a_book);
  //       }
  //     });

  //     console.log("filter books by category and assing to the_data");
  //     console.log(the_data);
  //   });
  // }

  componentDidMount() {
    BooksAPI.getAll().then((all_books) => {
      console.log("API request: all_books");
      console.log(all_books);

      const the_data = {
        currentlyReading: [],
        read: [],
        wantToRead: [],
        noCategory: [],
      };
      // categories: currentlyReading, wantToRead, read, noCategory
      // filter app_books_state by category
      all_books.filter((a_book) => {
        if (a_book.shelf === "currentlyReading") {
          the_data.currentlyReading.push(a_book);
        } else if (a_book.shelf === "read") {
          the_data.read.push(a_book);
        } else if (a_book.shelf === "wantToRead") {
          the_data.wantToRead.push(a_book);
        } else {
          the_data.noCategory.push(a_book);
        }
      });
      console.log("filter books by category and assing to the_data");
      console.log(the_data);
      this.setState(() => ({ app_books_state: the_data }));
      console.log("update state with filtered data from API request");
      console.log(this.state.app_books_state);
    });
  }

  render() {
    const { app_books_state } = this.state;
    console.log(app_books_state);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf all_books={app_books_state} />
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
