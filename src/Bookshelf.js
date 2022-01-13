import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  // categories: currentlyReading, wantToRead, read, noCategory
  // props for Bookshelf component is an object where the keys are the categories
  // and values are arrays of books for that category
  render() {
    // const { currentlyReading, read, wantToRead, noCategory } = this.props;
    // const books_by_category = [currentlyReading, read, wantToRead, noCategory];
    const { all_books: books_by_category } = this.props;
    console.log("books_by_category");
    console.log(books_by_category);
    const categories = Object.keys(books_by_category);
    console.log("categories");
    console.log(categories);
    console.log(books_by_category[categories[0]]);
    return (
      <div className="list-books-content">
        {/* for each category return a bookshelf */}
        {categories.map((a_category, cat_idx) => {
          return (
            <div key={cat_idx} className="bookshelf">
              <h2 className="bookshelf-title">{`The category is: ${a_category}`}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books_by_category[a_category].map((a_book, book_idx) => {
                    return <Book key={book_idx} the_book={a_book} />;
                  })}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Bookshelf.propTypes = {
  all_books: PropTypes.object.isRequired,
};

export default Bookshelf;
