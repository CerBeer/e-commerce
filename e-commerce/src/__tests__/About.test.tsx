import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* About page */
describe('render About page', () => {
  it('renders Title on About page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.About />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('About Us')).toBeInTheDocument();
  });
});
