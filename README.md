## Deployed with Netlify

https://clever-einstein-07bb11.netlify.app/

# MyReads Project

This project is the final assessment project for Udacity's React Fundamentals course.

The home screen of the application displays mutiple books organized by bookshelf. The user has the option to move a books from shelf to shelf. The user also has the opportunity to add books to their library via the search page. Directly from the search page the user can add a book to particular shelf of their library.

This application is made of the App, Bookshelf,SearchBooks, and Book components.

Bookshelf:

- Bookshelf component is responsible for rendering the various shelves of the library.
- The library shelves include: currentlyReading, wantToRead, read.
- It makes use of the Book component to render the individual books.

SearchBooks:

- SearchBooks component is responsible for performing BooksAPI.search().
- It makes use of the Book component to render the results.

Book:

- The Book component will take a single book object and create the UI for that book.
- This component also makes the call to moveBook which updates the app state.
- moveBook updates the backend via the BooksAPI.update method.
- And movebook updates the app states, specifically my_library_state.

## Starter template

Starter template can be found here: https://github.com/udacity/reactnd-project-myreads-starter

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Backend Server

Starter template includes backend server. Developing the functionality of the backend was not the focus of this project.

Note from Udacity: To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

The response object attributes {title, subtitle, authors,publisher, publishedDate, description, industryIdentifiers,readingModes, pageCount, printType, categories, averageRating,ratingsCount, maturityRating, allowAnonLogging, contentVersion, imageLinks, language, previewLink, infoLink, canonicalVolumeLink, id}

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Check for updates

npx npm-check-updates -u
npm i && npm start

## Debug Notes

https://stackoverflow.com/questions/70715794/typeerror-minicssextractplugin-is-not-a-constructor
npm i -D --save-exact mini-css-extract-plugin@2.4.5

## Deployment Notes

https://dev.to/kapi1/solved-treating-warnings-as-errors-because-of-process-env-ci-true-bk5
CI=false npm run build
