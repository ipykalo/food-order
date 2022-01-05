import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

test('renders learn react link', () => {
  const initialState = {
    token: {
      tokenData: {
        token: 'sfssssdsdss',
        expiresAt: 0,
        timestamp: new Date()
      }
    }
  }
  const mockStore = configureStore();
  const store = mockStore(initialState);

  render(<Provider store={store}><App /></Provider>)
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
