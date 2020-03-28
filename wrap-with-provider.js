import PropTypes from 'prop-types';
import React from 'react';
import { ReusableProvider } from 'reusable';

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
const WrapWithProvider = ({ element }) => <ReusableProvider>{element}</ReusableProvider>;

WrapWithProvider.propTypes = {
  element: PropTypes.node.isRequired,
};

export default WrapWithProvider;
