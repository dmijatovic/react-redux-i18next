import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Config } from '../store/app.cfg';

configure({ adapter: new Adapter() });

// use named export to test only component
// not default react export that includes redux
import { Home } from './Home';

describe('Home', () => {
  it('should render Home', () => {
    const wrapper = shallow(
      <Home
        loader={() => {
          true;
        }}
      />
    );

    wrapper.setProps({
      logo: Config.header.logo,
      appTitle: Config.header.appTitle,
      pageTitle: Config.header.pageTitle,
      loader: Config.loader,
    });

    expect(wrapper.instance()).toBeTruthy();
  });
});
