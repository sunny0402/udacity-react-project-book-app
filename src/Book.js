import React from "react";
import PropTypes from "prop-types";

// Take a single book object and create the UI for that book
const Book = (props) => {
  const { the_book } = props;
  console.log("props for Book component");
  console.log(the_book);
  //const book_info_keys = Object.keys(the_book);
  if (the_book.shelf) {
    const the_shelf = the_book.shelf;
  } else {
    const the_shelf = "none";
  }

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

            {/* If user selects a shelf need to run OnAddBookToLib */}
            {/* onChange */}
            {/* A form which updates the shelf state of a book */}
            {/* If shelf state updated need to run OnAddBookToLib */}
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value={the_book.shelf} selected>
                  {the_book.shelf}
                </option>
                {/* display the other shelves */}
                {the_book.shelf !== "currentlyReading" && (
                  <option value="currentlyReading">Currently Reading</option>
                )}
                {the_book.shelf !== "read" && (
                  <option value="read">Read</option>
                )}
                {the_book.shelf !== "wantToRead" && (
                  <option value="wantToRead">Want to Read</option>
                )}
                {the_book.shelf !== "none" && (
                  <option value="none">None</option>
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{the_book.title}</div>
          {the_book.authors && (
            <div className="book-authors">{the_book.authors[0]}</div>
          )}
        </div>
      </li>
    </div>
  );
};

Book.propTypes = {
  the_book: PropTypes.object.isRequired,
};
export default Book;
