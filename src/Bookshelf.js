import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  // categories: currentlyReading, wantToRead, read,none
  // props for Bookshelf component is an object where the keys are the categories
  // and values are arrays of books for that category

  newShelf = (book_to_move, new_shelf) => {
    this.props.onAddBookToLib(book_to_move, new_shelf);
  };
  render() {
    const { my_library_books: books_by_category } = this.props;
    console.log("books_by_category");
    console.log(books_by_category);
    const categories = Object.keys(books_by_category);
    console.log("categories");
    console.log(categories);
    console.log(books_by_category[categories[0]]);
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {/* for each category return a bookshelf */}
          {categories.map((a_category, cat_idx) => {
            return (
              <div key={cat_idx} className="bookshelf">
                <h2 className="bookshelf-title">{`The category is: ${a_category}`}</h2>
                {console.log(`the category is: ${a_category}`)}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books_by_category[a_category].map((a_book, book_idx) => {
                      console.log(
                        "Bookshelf: prop passed to book component: a_book"
                      );
                      console.log(a_book);
                      return (
                        <Book
                          key={book_idx}
                          the_book={a_book}
                          onAddBookToLib={this.newShelf(a_book, a_book.shelf)}
                          //   onAddBookToLib={this.newShelf}
                        />
                      );
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
  my_library_books: PropTypes.object.isRequired,
  onAddBookToLib: PropTypes.func.isRequired,
};

export default Bookshelf;
