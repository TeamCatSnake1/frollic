/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import { Provider } from 'react-redux';
 import userEvent from '@testing-library/user-event';
 import { render, screen, waitFor } from '@testing-library/react';
 import regeneratorRuntime from 'regenerator-runtime';
 import { renderHook, act } from '@testing-library/react-hooks';
 
 import App from '../App'
 import MainContainer from '../components/MainContainer';
 import Navbar from '../components/Navbar';
 import ResultCard from '../components/ResultCard';
 import ResultsContainer from '../components/ResultsContainer';
 import Sidebar from '../components/Sidebar';
 import store from '../store';
 
 describe('Let it stop', () => {
   let comp;
   beforeEach(async () => {
     comp = await render(
       <Provider store={store}>
         <ResultsContainer />
       </Provider>);
   });
 
   test('Why', () => {
     expect(comp.getByRole('section')).toStrictEqual()
   })
 });