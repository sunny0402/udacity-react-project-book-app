import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends Component {
  // categories: currentlyReading, wantToRead, read, noCategory
  //props for Bookshelf component is an array of objects
  //each objects represents a category
  render() {
    const [currentlyReading, read, wantToRead, noCategory] = this.props;
    const books_by_category = [currentlyReading, read, wantToRead, noCategory];
    // console.log("books_by_category");
    // console.log(books_by_category);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{`dynamically add category title for shelf ..`}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books_by_category.map((a_category_obj, index) => {
              //unpack the category object ... to pass a category array to Book component
              const the_category_arr = Object.values(a_category_obj);
              console.log(the_category_arr);
              return <Book key={index} the_books={the_category_arr} />;
            })}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  all_books: PropTypes.array.isRequired,
};

export default Bookshelf;
