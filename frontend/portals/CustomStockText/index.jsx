import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentProduct } from '@shopgate/engage/core';
import { Availability } from '@shopgate/engage/components';
import {
  AVAILABILITY_STATE_OK,
  AVAILABILITY_STATE_WARNING,
  AVAILABILITY_STATE_ALERT,
} from '@shopgate/pwa-common-commerce/product/constants';
import connect from './connector';

/**
 * Renders a stock text with visual indication of product availability.
 *
 * @param {Object} props Component props.
 * @param {string} props.availability Availability state identifier.
 * @param {string} props.stockText Text describing the current stock state.
 * @returns {JSX.Element|null} Stock text element or null when no text should be shown.
 */
const CustomStockText = ({ availability, stockText }) => (
  <Availability
    text={stockText}
    state={availability}
    showWhenAvailable
    className="custom-stock-text"
  />
);

CustomStockText.propTypes = {
  availability: PropTypes.oneOf([
    AVAILABILITY_STATE_OK,
    AVAILABILITY_STATE_WARNING,
    AVAILABILITY_STATE_ALERT,
  ]).isRequired,
  stockText: PropTypes.string,
};

CustomStockText.defaultProps = {
  stockText: '',
};

export default withCurrentProduct(connect(CustomStockText));
