import React from 'react';
import App from './App';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';

it('Test Sum that 2 and 2 make 4', () => {
  expect(2 + 2).to.equal(4);
});

it('renders without crashing', () => {
  shallow(<App />);
});

it('validate if exist .employeelist class on render App', () => {
  const wrapper = render(<App />);
  expect(wrapper.find('.employeelist')).to.lengthOf(1);
});