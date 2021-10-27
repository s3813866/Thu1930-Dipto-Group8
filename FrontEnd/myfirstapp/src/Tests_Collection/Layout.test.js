import React from 'react';
import {getByTestId, render, cleanup, fireEvent} from '@testing-library/react';
import expect from "expect";
import { BrowserRouter as Router } from 'react-router-dom';


import MenuAppBar from "../components/Layout/Header.js";
import Landing from "../components/Layout/Landing.js";

afterEach(cleanup);


test('Renders Landing Nav-Bar', () =>{
    const { getByTestId } = render(<Router><Landing /></Router>);
    expect(getByTestId('Landing'));
  })


  test('Renders Landing Nav-Bar', () =>{
    const { getByTestId } = render(<Router><MenuAppBar /></Router>);
    expect(getByTestId('MyAccount'));
  })
