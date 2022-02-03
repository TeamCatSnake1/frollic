/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

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
  beforeEach(async () => {
    comp = await render(
      <Provider store={store}>
        <Profile />
      </Provider>);
  });

  test('Profile contains a button labeled Logout and an onClick function', () => {
    const buttons = comp.getAllByRole('button');
    expect(buttons.length).toEqual(1);
    expect(buttons[0]).toHaveTextContent('Logout');
    expect(typeof buttons[0].props.onClick).toEqual('function');
  //  expect(comp.getByRole('section')).toStrictEqual()
  })
});

describe('Result card tests', () => {
  let comp;
  const props = {
    image: 'My image'
  }
  beforeEach(async () => {
    comp = await render(<Provider store={store}>
        <ResultCard { ...props } />
    </Provider>);
  })

  test('Result card should display the business logo', () => {
    expect(comp.getByText('businessImg').nextSibling).toEqual(props.image);
  })
});

describe('Result container tests', () => {
  let comp;
  const props = {
    image: 'My image'
  }
  beforeEach(async () => {
    comp = await render(<Provider store={store}>
        <ResultContainer { ...props } />
    </Provider>);
  })

  test('', () => {
    expect(1).toEqual(1);
  })
});