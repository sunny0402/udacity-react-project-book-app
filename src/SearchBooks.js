import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

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
      search: a_search_request.trim(),
    }));
  };

  setShelfAttribute = (a_book) => {
    return 1;
  };

  searchAllBooks = () => {
    BooksAPI.search(this.state.search).then((the_response) => {
      console.log(`searchAllBooks: typeof the_response ${typeof the_response}`);
      // TODO: if book in my library add the correct shelf attribute to the book
      this.setState((oldSearchState) => ({
        search_results: the_response,
      }));
    });
  };

  render() {
    const { search, search_results } = this.state;
    console.log(`search: ${search}`);
    console.log(`typeof search_results: ${typeof search_results}`);
    const the_keys = Object.keys(search_results);
    console.log(`the_keys: ${the_keys}`);

    const { my_library_books } = this.props;

    // Maybe need to filter search_results as in showingContacts

    return (
      <div className="search-books">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-bar">
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
                <Book the_book={search_results[a_key]} />
                // <li key={a_index}>
                //   Title: {search_results[a_key].title}
                //   Shelf: {search_results[a_key].shelf}
                // </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  my_library_books: PropTypes.object.isRequired,
  //   onSearch: PropTypes.func.isRequired,
  //   onUpdateLibrary: PropTypes.func.isRequired,
};

export default SearchBooks;

// object with keys {title, subtitle, authors,
//     publisher, publishedDate, description, industryIdentifiers,
//     readingModes, pageCount, printType, categories, averageRating,
//     ratingsCount, maturityRating, allowAnonLogging, contentVersion,
//     imageLinks, language, previewLink, infoLink, canonicalVolumeLink, id}
