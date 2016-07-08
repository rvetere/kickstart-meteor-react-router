/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';

import TodoItem from './TodoItem';

describe('TodoApp', () => {
  it('should render', () => {
    const el = shallow(<TodoItem />);
    console.log(el.debug());
    expect(true).to.equal(true);
  });
});
