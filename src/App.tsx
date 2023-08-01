import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import axios from 'axios';
import Books from './components/books/Books';
import { Book } from './models/models';
import './App.css';
import TopBar from './components/topBar/TopBar';
import BookForm from './components/topBar/BookForm';
import { initBook, initSignup, PageType, Cart, Image } from './models/models';
import SignupForm from './components/authentication/SignupForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './store/store'
import { bookSliceActions } from './store/bookSlice';
import { useSelector } from 'react-redux';
import ManageBooks from './components/manageBooks/ManageBooks';
import Orders from './components/orders/Orders';

interface IProps {

}

function App(props: IProps) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const data = useSelector((state: any) => state.books);
  const categories: string[] = Array.from(new Set(data?.map((book: Book) => book.categoryID)));

  const [showBook, setShowBook] = useState(false);
  const [book, setBook] = useState(initBook());

  const [signup, setSignup] = useState(false);
  const [signupData, setSignupData] = useState(initSignup());

  const page = useSelector((state: any) => state.page);

  const token = useSelector((state: any) => state.token);

  const userID = useSelector((state: any) => state.userID);

  const cart: Cart | null = useSelector((state: any) => state.cart);

  const formState = useSelector((state: any) => state.formState);

  // this is for storing the image
  const [images, setImages] = useState<Image[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const closeBook = () => {
    setShowBook(false);
    setImage(null);
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

  const onAdd = (newBook: Book) => {
    let newCart: Cart | null = cart ? { ...cart } : null;
    if (!newCart)
      newCart = { books: [{ book: newBook, quantity: 1 }], userID: userID, date: "" }
    else {
      let foundMatch = false;
      const updatedBooks = newCart.books.map((item) => {
        if (item.book.id === newBook.id) {
          foundMatch = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (!foundMatch) {
        updatedBooks.push({ book: newBook, quantity: 1 });
      }

      newCart = { ...newCart, books: updatedBooks };
    }

    dispatch(bookSliceActions.setCart(newCart));

  }

  const onEdit = (book: Book) => {

    setBook(book);
    dispatch(bookSliceActions.setFormState("Edit"));
    setShowBook(true);
  }

  const handleImageChange = (e: any) => {

    const file = e.currentTarget.files[0];
    setImage(file);
  };

  const onSubmitSignup = () => {
    const newuser = { username: signupData.username, password: signupData.password, userID: signupData.userID };
    axios.post('http://localhost:4000/signup', newuser).then((res) => {

      navigate('/login');
    }).catch(() => {
      console.warn("fail");
    });
    setSignup(false);
    setSignupData(initSignup());
  }

  const submitImage = () => {
    const getBook = book;
    if (formState === "Add") {
      const formData = new FormData();
      formData.append('id', book.id);
      if (image) {
        formData.append('file', image);
      }

      axios.post('http://localhost:4000/addImage', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const newImages = [...images, { id: book.id, image: image }];
        // setImages(newImages);
        setImage(null);
      })
        .catch(error => {
          // Handle any errors
          console.error("here", error);
        });
    }
    else {
      axios.post('http://localhost:4000/editImage', { id: book.id, image: image }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {

        const newImages = images?.map((image) => { return image.id === getBook.id ? { id: book.id, image: image.image } : image })
        setImages(newImages);
        setImage(null);
      }).catch(error => {
        console.warn("error");
      })
    }
  }

  const onSubmit = () => {
    submitImage();
    const newBook = { ...book, userID: userID };

    if (formState === "Add") {
      axios.post('http://localhost:4000/addBook', newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const newData = [...data, newBook];
        dispatch(bookSliceActions.setBooks(newData));
        setShowBook(false);
        setBook(initBook());
      })
        .catch(error => {
          // Handle any errors
          console.error("here", error);
        });
    }
    else {
      axios.post('http://localhost:4000/editBook', newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        dispatch(bookSliceActions.editBook(newBook));
        setShowBook(false);
      }).catch(error => {
        console.warn("error");
      })
    }
  }

  useEffect(() => {

    axios.get('http://localhost:4000/images').then(response => {
      setImages(response.data);
    }).catch(err => console.warn("error", err));

    axios.get('http://localhost:4000/books').then(response => {
      dispatch(bookSliceActions.setBooks(response.data));
    }).catch(err => console.warn("error", err));


  }, []);


  return (
    <div className="App">
      <BookForm show={showBook} closeBook={closeBook} book={book} onChangeBook={onChangeBook} onSubmit={onSubmit} handleImageChange={handleImageChange} />
      <SignupForm show={signup} closeForm={closeSignup} signupData={signupData} onChange={onChangeSignup} onSubmit={onSubmitSignup} />
      <TopBar setShowBook={() => {
        setShowBook(true);
        setBook(initBook());
        dispatch(bookSliceActions.setFormState("Add"));
      }
      } setSignUp={() => setSignup(true)} />
      {page === "Books" && <Books books={data} onAdd={onAdd} onEdit={onEdit} images={images} categories={categories} />}
      {page === "Manage" && <ManageBooks onEdit={onEdit} images={images} categories={categories} />}
      {page === "Orders" && <Orders />}
    </div>
  );
}

export default App;
