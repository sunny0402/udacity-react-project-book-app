import React, { Component } from "react";
import PropTypes from "prop-types";

// Take a single book object and create the UI for that book
class Book extends Component {
  //const book_info_keys = Object.keys(the_book);
  // if (the_book.shelf) {
  //   const the_shelf = the_book.shelf;
  // } else {
  //   const the_shelf = "none";
  // }

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
    // this.props.onMoveBook(this.props.the_book, value);
  };

  // onHandleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.onMoveBook(this.props.the_book, this.state.the_shelf);
  // };

  render() {
    const { the_book } = this.props;
    const { the_shelf } = this.state;
    console.log("Book: the_book.shelf");
    console.log(the_book.shelf);
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
                  {console.log(`Book component: the_shelf: ${the_shelf}`)}
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
                  {the_shelf !== "none" && <option value="none">None</option>}
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
