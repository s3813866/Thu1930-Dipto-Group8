import React from 'react';
import {getByTestId, render, cleanup} from '@testing-library/react';
import expect from "expect";

import {EditBookForm} from "../pages/EditBookForm.js";

// Cleans ups tests  
afterEach(cleanup);

test("Renders EditBookForm Page", () => {
    const {getByTestId} = render(<EditBookForm/>)
    expect(getByTestId('EditBookForm'))
})
