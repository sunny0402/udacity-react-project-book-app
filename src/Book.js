import React from "react";
import PropTypes from "prop-types";

// Take a single book object and create the UI for that book
const Book = (props) => {
  const { the_book } = props;
  console.log("props for Book component");
  console.log(the_book);
  //const book_info_keys = Object.keys(the_book);

  return (
    <div>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${the_book.imageLinks.thumbnail})`,
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
          <div className="book-title">{the_book.title}</div>
          <div className="book-authors">{the_book.authors[0]}</div>
        </div>
      </li>
    </div>
  );
};

Book.propTypes = {
  the_book: PropTypes.object.isRequired,
};
export default Book;
