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
    the_shelf: this.props.the_book.shelf,
  };

  handleSelectChange = (event) => {
    // event.preventDefault();
    const { value } = event.target;
    this.props.onMoveBook(this.props.the_book, value);
    this.setState(() => ({
      the_shelf: value,
    }));
  };

  render() {
    const { the_book } = this.props;
    const { the_shelf } = this.state;
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
                {/* <form onSubmit={this.onHandleSubmit}> */}
                <select onChange={this.handleSelectChange}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value={the_shelf} selected>
                    {the_book.shelf}
                  </option>
                  {/* display the other shelves */}
                  {the_shelf !== "currentlyReading" && (
                    <option value="currentlyReading">Currently Reading</option>
                  )}
                  {the_shelf !== "read" && <option value="read">Read</option>}
                  {the_shelf !== "wantToRead" && (
                    <option value="wantToRead">Want to Read</option>
                  )}
                </select>
                {/* </form> */}
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
