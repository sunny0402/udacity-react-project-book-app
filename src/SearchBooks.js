import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

/**
 * SearchBooks component is responsible for performing BooksAPI.search().
 * It makes use of the Book component to render the results.
 */
class SearchBooks extends Component {
  state = {
    search: "",
    search_results: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.search !== prevState.search) this.searchAllBooks();
  }

  updateSearch = (a_search_request) => {
    this.setState(() => ({
      search: a_search_request,
    }));
  };

  searchAllBooks = () => {
    BooksAPI.search(this.state.search).then((the_response) => {
      const { my_library_books } = this.props;
      const resp_keys = Object.keys(the_response);

      // if a book from the_response is in my_library_books
      // add shelf attribute to the book, otherwise add set the shelf as none
      resp_keys.forEach((resp_book_key, resp_idx) => {
        my_library_books.forEach((lib_book_obj, idx) => {
          if (lib_book_obj.title === the_response[resp_book_key].title) {
            the_response[resp_book_key].shelf = lib_book_obj.shelf;
          }
        });
        // if book not in my_library_books
        if (the_response[resp_book_key].shelf === undefined) {
          the_response[resp_book_key].shelf = "none";
        }
      });

      this.setState((oldSearchState) => ({
        search_results: the_response,
      }));
    });
  };

  render() {
    const { search, search_results } = this.state;
    const the_keys = Object.keys(search_results);
    const { my_library_books, onMoveBook: newShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {the_keys.map((a_key, a_index) => {
              return (
                <Book
                  key={a_index}
                  the_book={search_results[a_key]}
                  onMoveBook={newShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  my_library_books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchBooks;
