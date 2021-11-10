import App from '../src/App';
import Homepage from '../src/components/Homepage';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-router-dom';
import { act } from "react-dom/test-utils";

describe('the homepage component', () => {
    let container;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    })
    test('should contain the title 1 Rops Booster Club', () => {
        act(() => {
            render(<Homepage />, container);
        });
        
        const title = container.getByRole('heading', {level: 2});
        expect(title).toExist();
    })
})