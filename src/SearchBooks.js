import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

/**
 * SearchBooks component is responsible for performing BooksAPI.search().
 * It makes use of the Book component to render the results.
 */

const available_search_terms = [
  "Android",
  "Art",
  "Artificial Intelligence",
  "Astronomy",
  "Austen",
  "Baseball",
  "Basketball",
  "Bhagat",
  "Biography",
  "Brief",
  "Business",
  "Camus",
  "Cervantes",
  "Christie",
  "Classics",
  "Comics",
  "Cook",
  "Cricket",
  "Cycling",
  "Desai",
  "Design",
  "Development",
  "Digital Marketing",
  "Drama",
  "Drawing",
  "Dumas",
  "Education",
  "Everything",
  "Fantasy",
  "Film",
  "Finance",
  "First",
  "Fitness",
  "Football",
  "Future",
  "Games",
  "Gandhi",
  "Homer",
  "Horror",
  "Hugo",
  "Ibsen",
  "Journey",
  "Kafka",
  "King",
  "Lahiri",
  "Larsson",
  "Learn",
  "Literary Fiction",
  "Make",
  "Manage",
  "Marquez",
  "Money",
  "Mystery",
  "Negotiate",
  "Painting",
  "Philosophy",
  "Photography",
  "Poetry",
  "Production",
  "Programming",
  "React",
  "Redux",
  "River",
  "Robotics",
  "Rowling",
  "Satire",
  "Science Fiction",
  "Shakespeare",
  "Singh",
  "Swimming",
  "Tale",
  "Thrun",
  "Time",
  "Tolstoy",
  "Travel",
  "Ultimate",
  "Virtual Reality",
  "Web Development",
  "iOS",
];

const formatted_available_search_terms = available_search_terms.map(
  (a_term) => {
    return a_term.toLowerCase();
  }
);

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.debounceSearch = this.myDebounce(this.searchAllBooks, 1000);

    this.state = {
      search: "",
      search_results: [],
    };
  }

  /**
   * Debounce lets us make multiple calls to a function and
   * only run that function after a delay from when the last call was made.
   */

  myDebounce = (a_function, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => a_function(...args), delay);
    };
  };

  updateSearch = (a_search_request) => {
    // validate search ... no this function already updates state and runs debounce
    this.setState(() => ({
      search: a_search_request,
    }));
    this.debounceSearch(a_search_request);
  };

  validateSearch = (search_request) => {
    const formatted_request = search_request.toLowerCase();
    return formatted_available_search_terms.includes(formatted_request);
  };

  searchAllBooks = () => {
    if (this.state.search.trim() === "") {
      //make search results empty so that nothing renders
      this.setState(() => ({
        search_results: "",
      }));
    } else {
      console.log(
        "Search not empty so make API search request: ",
        this.state.search
      );

      //validate search request prior to making API call
      console.log(`pass validation? ${this.validateSearch(this.state.search)}`);
      if (this.validateSearch(this.state.search)) {
        BooksAPI.search(this.state.search).then((the_response) => {
          const { my_library_books } = this.props;

          //TODO: if the_response undefined invalid search
          const resp_keys = Object.keys(the_response);

          // if a book from the_response is in my_library_books
          // add shelf attribute to the book, otherwise set the shelf as none
          resp_keys.forEach((resp_book_key, resp_idx) => {
            my_library_books.forEach((lib_book_obj, idx) => {
              if (lib_book_obj.title === the_response[resp_book_key].title) {
                the_response[resp_book_key].shelf = lib_book_obj.shelf;
              }
            });
            // if book not in my_library_books
            if (the_response[resp_book_key].shelf === undefined) {
              the_response[resp_book_key].shelf = "none";
            }
          });

          this.setState(() => ({
            search_results: the_response,
          }));
        });
      }
    }
  };

  render() {
    const { search, search_results } = this.state;
    const the_keys = Object.keys(search_results);
    const { my_library_books, onMoveBook: newShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
        {/* if search results NOT empty and 
        NOT undefined (invalid query) then display results */}
        {search_results && (
          <div className="search-books-results">
            <ol className="books-grid">
              {the_keys.map((a_key, a_index) => {
                return (
                  <Book
                    key={a_index}
                    the_book={search_results[a_key]}
                    onMoveBook={newShelf}
                  />
                );
              })}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

SearchBooks.propTypes = {
  my_library_books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default SearchBooks;

/**
 * Since run setState with every new search request
 * do not need the componentDidUpdate lifecycle method.
 * From docs: setState() schedules an update to a component’s state object.
 * When state changes, the component responds by re-rendering.
 */
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.state.search !== prevState.search) {
//       this.searchAllBooks();
//     }
//   }
