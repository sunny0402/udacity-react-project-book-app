import React from "react";
import PropTypes from "prop-types";

// Take an array of books and create UI for book to be displayed on a particular bookshelf
// so the props for this component should be all the books for a particular category
const Book = (props) => {
  // console.log("props for Book component");
  // console.log(props);
  const [the_books] = props;
  console.log(the_books);

  return (
    <div>
      {the_books.map((a_book, index) => {
        return (
          <li key={index}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${a_book.imageLinks.thumbnail})`,
                  }}
                />
                <div className="book-shelf-changer">
                  <select>
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{a_book.title}</div>
              <div className="book-authors">{a_book.authors[0]}</div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

Book.propTypes = {
  the_books: PropTypes.array.isRequired,
};
export default Book;
