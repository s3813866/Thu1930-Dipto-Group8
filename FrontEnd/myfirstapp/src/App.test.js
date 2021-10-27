import React from 'react';
import {getByTestId, render, cleanup} from '@testing-library/react';
import Homepage from './pages/Homepage'
import expect from "expect";
import {GetBookByAuthor} from "./pages/getBookByAuthor";
import Person from "./components/Persons/Person";
import Statistics from "./components/Persons/Statistics";
import Login from "./components/UserManagement/Login";
import {AddBook} from "./pages/AddBook";
import {Register} from "./components/UserManagement/Register";

afterEach(cleanup);
test('renders title', () =>{
  const { getByText } = render(<Homepage />);
  const figcaption = getByText(/Welcome to Bookeroo!/);
  expect(figcaption).toHaveTextContent("Welcome to Bookeroo!")
})

test("renders cardgroup1 properly", () =>{
  const {getByTestId} = render(<Homepage/>)
  expect(getByTestId('Card1'))
})

test("renders cardgroup2 properly", () =>{
  const {getByTestId} = render(<Homepage/>)
  expect(getByTestId('Card2'))
})

test('renders getBookByAuthor title', () => {
  const { getByText } = render(<GetBookByAuthor />);
  const h2 = getByText(/Search your favourite author/);
  expect(h2).toHaveTextContent("Search your favourite author")
})

test('renders getBookByAuthor form properly', () =>{
  const {getByTestId} = render(<GetBookByAuthor />)
  expect(getByTestId('form'))
})

test("renders Dog dashboard properly", () =>{
  const {getByTestId} = render(<Person />)
  expect(getByTestId('person'))
})

// test("renders statistics dashboard properly", () =>{
//   const {getByTestId} = render(<Statistics/>)
//   expect(getByTestId('stats'))
// })

// test("renders login form properly", () =>{
//   const {getByTestId} = render(<Login />)
//   expect(getByTestId('login'))
// })

test("renders addBook form properly", () =>{
  const {getByTestId} = render(<AddBook/>)
  expect(getByTestId('Addbook'))
})

test("renders register form properly", () =>{
  const {getByTestId} = render(<Register />)
  expect(getByTestId('register'))
})



