import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Books from './components/books/Books';
import { Book } from './models/models';
import './App.css';
import TopBar from './components/topBar/TopBar';
import BookForm from './components/topBar/BookForm';
import { Offcanvas } from 'react-bootstrap';
import { initBook } from './models/models';

function App() {

  const [data, setData] = useState<Book[]>([]);
  const [showBook, setShowBook] = useState(false);
  const [book, setBook] = useState(initBook());

  const closeBook = () => {
    setShowBook(false);
  }

  const onChangeBook = (e: any) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  const onSubmit = () => {
    axios.post('http://localhost:4000/addBook', book).then(response => {
      const newData = [...data, book];
      setData(newData);
      setShowBook(false);
      setBook(initBook());
    })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  const onDelete = (book: Book) => {
    axios.post('http://localhost:4000/deleteBook', book).then(response => {
      console.warn("response.id", response.data.id);
      console.warn("data", data?.filter((book) => book.id !== response.data.id));
      setData(data?.filter((book) => book.id !== response.data.id));
    }).catch(error => {
      console.error(error);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:4000/books').then(response => {
      console.log(response.data);
      setData(response.data);
    }).catch(err => console.warn("error", err));
  }, []);


  return (
    <div className="App">
      <BookForm show={showBook} closeBook={closeBook} book={book} onChangeBook={onChangeBook} onSubmit={onSubmit} />
      <TopBar setShowBook={() => setShowBook(true)} />
      <Books books={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
