import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";

/**
 * Bookshelf component is responsible for rendering the various shelves of the library.
 * The library shelves include: currentlyReading, wantToRead, read.
 * It makes use of the Book component to render the individual books.
 */
class Bookshelf extends Component {
  render() {
    const { my_library_books, onMoveBook: newShelf } = this.props;
    const shelf_arr = my_library_books.map((a_book) => {
      return a_book.shelf;
    });
    const shelves = [...new Set(shelf_arr)];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button />
          </Link>
        </div>
        <div className="list-books-content">
          {/* For each category/shelf return a bookshelf with books that belong to it. */}
          {shelves.map((a_shelf, shelf_idx) => {
            return (
              <div key={a_shelf} className="bookshelf">
                {a_shelf === "wantToRead" && (
                  <h2 className="bookshelf-title">Want to Read</h2>
                )}
                {a_shelf === "read" && (
                  <h2 className="bookshelf-title">Read</h2>
                )}
                {a_shelf === "currentlyReading" && (
                  <h2 className="bookshelf-title">Currently Reading</h2>
                )}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {my_library_books.map((a_book, book_idx) => {
                      if (a_book.shelf === a_shelf) {
                        return (
                          <Book
                            key={book_idx}
                            the_book={a_book}
                            // this would call the function here, instead pass as props
                            // onMoveBook={newShelf(a_book, a_book.shelf)
                            onMoveBook={newShelf}
                          />
                        );
                      }
                    })}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  my_library_books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Bookshelf;
