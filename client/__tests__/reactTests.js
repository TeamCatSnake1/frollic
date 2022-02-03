/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import '@testing-library/jest-dom/extend-expect';

import App from '../App'
import MainContainer from '../components/MainContainer';
import Navbar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import ResultsContainer from '../components/ResultsContainer';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import store from '../store';
 
describe('Profile tests', () => {
  let comp;
  const props = { handleClick: jest.fn() }
  beforeEach(async () => {
    comp = await render(
      <Provider store={store}>
        <Profile { ...props } />
      </Provider>);
  });

  test('Profile contains a button labeled Logout and an onClick function', () => {
    const buttons = comp.getAllByRole('button');
    expect(buttons.length).toEqual(1);
    expect(buttons[0]).toHaveTextContent('Logout');
  }) // I don't know how to test the function on a hook because its not on props...
});

describe('Result card tests', () => {
  let comp;
  const props = {
    addFav: jest.fn(),
    addComment: jest.fn(),
  }
  beforeEach(async () => {
    comp = await render(<Provider store={store}>
        <ResultsCard { ...props } />
    </Provider>);
  })

  test('Result card should have four buttons', () => {
    const buttons = comp.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent('Show Comments');
    expect(buttons[1]).toHaveTextContent('Favorite');
    userEvent.click(buttons[1]);
    expect(props.addFav).toHaveBeenCalled();
    expect(buttons[2]).toHaveTextContent('Comment');
    userEvent.click(buttons[2]);
    expect(props.addComment).toHaveBeenCalled();
    expect(buttons[3]).toHaveTextContent('Share');
  })
});

describe('Result container tests', () => {
  let comp;
  beforeEach(async () => {
    comp = await render(<Provider store={store}>
        <ResultsContainer />
    </Provider>);
  })

  test('', () => {
    expect(comp.getById('result-word')).toHaveTextContent('Results: ')
  })
});