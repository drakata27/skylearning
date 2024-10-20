import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const customRender = (ui, options) =>
  render(ui, { 
    wrapper: ({ children }) => (
      <MemoryRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </MemoryRouter>
    ),
    ...options
  });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };