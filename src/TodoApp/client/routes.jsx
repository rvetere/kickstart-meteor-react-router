import { Route } from 'react-router';
import TodoApp from './components/TodoApp';
import AboutPage from './components/AboutPage';

export default (
  <Route>
    <Route path="/" component={TodoApp} />
    <Route path="/about" component={AboutPage} />
  </Route>
);
