import React from 'react';
import {getByTestId, render, cleanup, fireEvent} from '@testing-library/react';
import expect from "expect";

import {EditBookForm} from "../pages/EditBookForm.js";

/**
 * Reference: https://www.youtube.com/watch?v=NE_aorvSeSQ
 */


afterEach(cleanup);

test("Renders EditBookForm Page", () => {
    const {getByTestId} = render(<EditBookForm/>)
    expect(getByTestId('EditBookForm'))


})

// describe("Input Value", () => {
//     it("updates on change", () =>{

//         const {queryByPlaceholdertext} = render(<EditBookForm/>)

//         expect(queryByPlaceholdertext("ID")).toBeTruthy()
//         const editInput = queryByPlaceholdertext('ID');

//         //fireEvent.change(searchInput, {target: {value: "1"}})

//         expect(editInput.value).toBe("ID");
//     })
// })
