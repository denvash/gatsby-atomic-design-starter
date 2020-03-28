import { addDecorator, addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';
import React from 'react';
import { ReusableProvider } from 'reusable';
import { GlobalStyle } from 'styles';
import 'tailwindcss/dist/base.css';

const Container = ({ children }) => {
  return children;
};

addDecorator(S => {
  return (
    <ReusableProvider>
      <GlobalStyle />
      <Container>
        <S />
      </Container>
    </ReusableProvider>
  );
});

const theme = create({
  base: 'light',
  colorPrimary: 'hotpink',
  brandTitle: 'Atomic Starter',
  brandUrl: 'https://',
  brandImage: ``,
});

addParameters({
  options: {
    showRoots: true,
    showPanel: false,
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
    theme,
  },
});

// automatically import all files ending in *.stories.jsx
configure(require.context('../src', true, /\.stories\.js$/), module);

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
