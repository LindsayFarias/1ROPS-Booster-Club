import App from '../src/App';
import Homepage from '../src/components/Homepage.js';
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";

describe('the homepage component', () => {

    test('should contain the title 1 Rops Booster Club', () => {
        act(() => {
            render(<Homepage />);
        });
        
        const title = screen.getByRole('heading', {level: 1});
        expect(title).toBeInTheDocument();
    })

    test('should see list of events when rendered', () => {
        const grabEvents = () => {
            const mockHomePageState = [{title: 'Christmas Party', purpose: 'Spread some holiday cheer', date: '2021-12-20'}];
            return mockHomePageState;
        }
        act(() => {
            render(<Homepage />)
            let events = grabEvents();
        })

        const event = screen.getByText('Christmas Party')
        expect(event).toBeInTheDocument();
    } )
})