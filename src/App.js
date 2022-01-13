import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Bookshelf from "./Bookshelf";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    app_books_state: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((all_books) => {
      console.log("API request: all_books");
      console.log(all_books);
      this.setState(() => ({ app_books_state: all_books }));
    });
  }

  render() {
    const the_data = [
      { currentlyReading: [] },
      { read: [] },
      { wantToRead: [] },
      { noCategory: [] },
    ];
    //categories: currentlyReading, wantToRead, read
    // filter app_books_state by category
    this.state.app_books_state.filter((a_book) => {
      if (a_book.shelf === "currentlyReading") {
        the_data[0].currentlyReading.push(a_book);
      } else if (a_book.shelf === "read") {
        the_data[1].read.push(a_book);
      } else if (a_book.shelf === "wantToRead") {
        the_data[2].wantToRead.push(a_book);
      } else {
        the_data[3].noCategory.push(a_book);
      }
    });

    console.log("filter books by category and assing to the_data");
    console.log(the_data);
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
              <div>
                <Bookshelf all_books={the_data} />
              </div>
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

export default BooksApp;
