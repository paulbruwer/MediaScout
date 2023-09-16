import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import Search from './Components/Search';


test('renders correctly', () => {
  const tree = renderer
  .create(<Search />)
  .toJSON();
  expect(tree).toMatchSnapshot();
  });
