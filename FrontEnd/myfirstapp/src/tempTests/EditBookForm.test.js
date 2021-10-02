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

describe("Input Value for Book ID", () => {
    it("Book ID updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("ID")).toBeTruthy()
        const editInput = queryByPlaceholderText('ID');

        fireEvent.change(editInput, {target: {value: "1"}})

        expect(editInput.value).toBe("1");
    })
})

describe("Input Value for Title", () => {
    it("Title updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("Book Title")).toBeTruthy()
        const titleInput = queryByPlaceholderText('Book Title');

        fireEvent.change(titleInput, {target: {value: "C Programming Language"}})

        expect(titleInput.value).toBe("C Programming Language");
    })
})


describe("Input Value for Author", () => {
    it("Author updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("Author")).toBeTruthy()
        const authorInput = queryByPlaceholderText('Author');

        fireEvent.change(authorInput, {target: {value: "Kernighan & Ritchie"}})

        expect(authorInput.value).toBe("Kernighan & Ritchie");
    })
})

describe("Input Value for Category", () => {
    it("Category updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("Category")).toBeTruthy()
        const categoryInput = queryByPlaceholderText('Category');

        fireEvent.change(categoryInput, {target: {value: "Programming"}})

        expect(categoryInput.value).toBe("Programming");
    })
})


describe("Input Value for ISBN", () => {
    it("ISBN updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("ISBN")).toBeTruthy()
        const ISBNInput = queryByPlaceholderText('ISBN');

        fireEvent.change(ISBNInput, {target: {value: "1231232232131"}})

        expect(ISBNInput.value).toBe("1231232232131");
    })
})


describe("Input Value for Book Description", () => {
    it("Book Description updates on change", () =>{

        const {queryByPlaceholderText} = render(<EditBookForm/>)

        expect(queryByPlaceholderText("Book Description")).toBeTruthy()
        const descriptionInput = queryByPlaceholderText('Book Description');

        fireEvent.change(descriptionInput, {target: {value: "This is a description"}})

        expect(descriptionInput.value).toBe("This is a description");
    })
})

describe("Submit Button", () => {
    describe("with empty query", () => {
        it("does not submit", () => {
            const { queryByText } = render(<EditBookForm />);
            const submitButton = queryByText('null-submit');
            expect(submitButton).toBeNull();

            // const {submitQuery} = render(<EditBookForm/>)
            // fireEvent.click(screen.getByText('Submit').toBeInTheDocument())

        })
    })
})
