import App from '../src/App';
import Homepage from '../src/components/Homepage.js';
import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';

describe('the homepage component', () => {
    const getEventsApi = jest.fn();
    const events = [{title: 'Christmas Party', purpose: 'Spread some holiday cheer', date: '2021-12-20'}, 
                    {title: 'Chili Cookoff', purpose: 'Competition between the best chili chefs out there', date: '2022-03-14'}]
    const getMembersApi = jest.fn();
    const members = [{id: '1', name: 'Lindsay Farias', position: 'Secretary'}]

    test('should contain the title 1 Rops Booster Club', () => {
        act(() => {
            render(<Router><Homepage getMembers={getMembersApi} members={members} getEvents={getEventsApi} events={events} /></Router>);
        });
        const title = screen.getByRole('heading', {level: 1});
        expect(title).toBeInTheDocument();
    });

    test('should see list of events containing name, reason, and date rendered', () => {
        act(() => {
            render(<Router><Homepage getMembers={getMembersApi} members={members} getEvents={getEventsApi} events={events}/></Router>)
        })
        const event = screen.getAllByTestId('eventCard')
        expect(event).toContain('Christmas Party');
    });

    test('should show multiple cards on screen if there are multiple events', () => {
        act(() => {
            render(<Router><Homepage getMembers={getMembersApi} members={members} getEvents={getEventsApi} events={events}/></Router>)
        })
        const events = screen.getAllByTestId('eventCard')
        expect(events.length).toBe(2);
    });
})