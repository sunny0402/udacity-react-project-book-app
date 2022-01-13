import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

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
    const the_data = {
      currentlyReading: [],
      read: [],
      wantToRead: [],
      noCategory: [],
    };
    // categories: currentlyReading, wantToRead, read
    // filter app_books_state by category
    this.state.app_books_state.filter((a_book) => {
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
    console.log("the data is an object where the keys are the categories");
    console.log(the_data);
    console.log("the data will be bassed to the Bookshelf component");
    const the_props_for_bookshelf = { ...the_data }; //0: {currentlyReading: Array(2)}

    return (
      <div className="app">
        testiing...
        {/* {the_data.map(({ an_obj }, an_index) => {
          return <p>{`an_index: ${an_index} a_category: ${an_obj}`}</p>;
        })} */}
      </div>
    );
  }
}

export default BooksApp;
