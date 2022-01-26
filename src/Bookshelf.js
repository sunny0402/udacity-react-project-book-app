import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  // categories: currentlyReading, wantToRead, read,none
  // props for Bookshelf component is an array of book objects

  //   newShelf = (book_to_move, new_shelf) => {
  //     this.props.onMoveBook(book_to_move, new_shelf);
  //   };
  render() {
    const { my_library_books, onMoveBook: newShelf } = this.props;
    const shelf_arr = my_library_books.map((a_book) => {
      return a_book.shelf;
    });
    console.log(`shelf_arr ${shelf_arr}`);
    const shelves = [...new Set(shelf_arr)];
    console.log(`shelves: ${shelves}`);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* for each category return a bookshelf */}
          {shelves.map((a_shelf, shelf_idx) => {
            return (
              <div key={shelf_idx} className="bookshelf">
                <h2 className="bookshelf-title">{`The category is: ${a_shelf}`}</h2>
                {console.log(`the shelf is: ${a_shelf}`)}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {my_library_books.map((a_book, book_idx) => {
                      if (a_book.shelf === a_shelf) {
                        return (
                          <Book
                            key={book_idx}
                            the_book={a_book}
                            onMoveBook={newShelf(a_book, a_book.shelf)}
                            //   onAddBookToLib={this.newShelf}
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
