import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * The Book component will take a single book object and create the UI for that book.
 * This component also makes the call to moveBook which updates the app state.
 * moveBook updates the backend via the BooksAPI.update method.
 * And movebook updates the app states, specifically my_library_state.
 */

class Book extends Component {
  state = {
    // https://overreacted.io/writing-resilient-components/#principle-1-dont-stop-the-data-flow
    // the_shelf: this.props.the_book.shelf, !!! Do not copy props to state !!!
    the_shelf: "",
  };

  handleSelectChange = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      the_shelf: value,
    }));
    this.props.onMoveBook(this.props.the_book, value);
  };

  render() {
    const { the_book } = this.props;
    const the_shelf = the_book.shelf ? the_book.shelf : "none";
    return (
      <div>
        <li>
          <div className="book">
            <div className="book-top">
              {the_book.imageLinks ? (
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${the_book.imageLinks.thumbnail})`,
                  }}
                />
              ) : (
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: "url(/favicon.ico)",
                  }}
                />
              )}

              <div className="book-shelf-changer">
                <select value={the_shelf} onChange={this.handleSelectChange}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="read">Read</option>
                  <option value="wantToRead">Want to Read</option>
                  {/* only display none shelf for books from search results which begin with an undefined shelf property */}
                  {the_shelf === "none" && <option value="none">None</option>}
                </select>
              </div>
            </div>
            <div className="book-title">{the_book.title}</div>
            {the_book.authors && (
              <div className="book-authors">{the_book.authors[0]}</div>
            )}
            {the_book.infoLink && (
              <div className="book-links">
                <a href={the_book.infoLink}>View Info</a>
              </div>
            )}
          </div>
        </li>
      </div>
    );
  }
}

Book.propTypes = {
  the_book: PropTypes.object.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};
export default Book;
