import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Clock } from './Clock';

configure({ adapter: new Adapter() });

describe('<Clock/> component', () => {
  let wrapper;
  beforeEach(() => {
    //get reference to clock object
    wrapper = shallow(<Clock />);
  });

  it('should render', () => {
    //debugger
    expect(wrapper.instance().state).toEqual({
      time: {
        hrs: '00',
        min: '00',
      },
      update: 1000,
      semicolon: true,
    });
  });

  it('should add 0 to 1 in formatShortNumToStr', () => {
    let num = wrapper.instance().formatShortNumToStr(1);
    expect(num).toStrictEqual('01');
  });

  it('should return string formatShortNumToStr', () => {
    let num = wrapper.instance().formatShortNumToStr(24);
    expect(num).toStrictEqual('24');
  });

  it('should have timer with hrs of length 2', () => {
    //debugger
    //tick time
    wrapper.instance().tick();
    let hrs = wrapper.instance().state.time.hrs;
    //expect to be 2;
    expect(hrs.length).toEqual(2);
  });

  it('should have timer with min of length 2', () => {
    //tick time
    wrapper.instance().tick();
    let min = wrapper.instance().state.time.min;
    //expect to have length of 2;
    expect(min.length).toEqual(2);
  });
});
