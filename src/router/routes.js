/**
 * App routes
 * all react components relevant for router are imported
 */

import HomePage from '../page/Home';
import AboutPage from '../page/About';
import ErrorPage from '../page/Error';

/**
 * Routes
 * @param {Array} route: Array of objects
 * @param {String} route.path: use in Route component of react-router-dom
 * @param {String} route.type: used to decide what router prop to use
 * @param {String} route.label: used to create Link, if not provided item is not used as link
 * @param {Object} route.component: reference to React component to load
 * @param {Object} route.props: props to spread in Route component of react-router-dom
 */
const routes = [
  {
    path: '/',
    to: '/home',
    type: 'redirect',
    props: { exact: true },
  },
  {
    path: '/home',
    component: HomePage,
    label: 'Home',
    type: 'component',
    props: { exact: true },
  },
  {
    path: '/about',
    component: AboutPage,
    label: 'About',
    type: 'component',
    props: { exact: true },
  },
  {
    path: '/error/:id',
    component: ErrorPage,
    props: { exact: true },
    type: 'component',
  },
  { path: '', to: '/error/404', type: 'redirect' },
];

export default routes;
