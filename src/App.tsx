import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Books from './components/books/Books';
import { Book } from './models/models';
import './App.css';
import TopBar from './components/topBar/TopBar';
import BookForm from './components/topBar/BookForm';
import { initBook, initSignup } from './models/models';
import SignupForm from './components/authentication/SignupForm';

interface IProps {
  setToken: Function;
  token: string;
}

function App(props: IProps) {

  const [data, setData] = useState<Book[]>([]);

  const [showBook, setShowBook] = useState(false);
  const [book, setBook] = useState(initBook());

  const [signup, setSignup] = useState(false);
  const [signupData, setSignupData] = useState(initSignup());

  const closeBook = () => {
    setShowBook(false);
  }

  const onChangeBook = (e: any) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  }

  const closeSignup = () => {
    setSignupData(initSignup());
    setSignup(false);
  }
  const onChangeSignup = (e: any) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
  }

  const logout = () => {
    props.setToken("");
    localStorage.removeItem("userData");
  }

  const onSubmitSignup = () => {
    const newuser = { username: signupData.username, password: signupData.password };
    axios.post('http://localhost:4000/signup', newuser).then((res) => {
      console.warn(res);
      props.setToken(res.data.token);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          token: res.data.token,
          expiration: 3600
        })
      );
    }).catch(() => {
      console.warn("fail");
    });
    setSignup(false);
    setSignupData(initSignup());
  }

  const onSubmit = () => {
    axios.post('http://localhost:4000/addBook', book, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }).then(response => {
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
    axios.post('http://localhost:4000/deleteBook', book, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    }).then(response => {
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
      <SignupForm show={signup} closeForm={closeSignup} signupData={signupData} onChange={onChangeSignup} onSubmit={onSubmitSignup} />
      <TopBar setShowBook={() => setShowBook(true)} setSignUp={() => setSignup(true)} token={props.token} logout={logout} />
      <Books books={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
