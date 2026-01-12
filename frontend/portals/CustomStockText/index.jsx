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
 * Renders a configured stock/availability label.
 *
 * @param {Object} props Component props
 * @param {string} props.availability Availability state ("ok" | "warning" | "alert")
 * @param {string} props.stockText Display text derived from configuration
 * @returns {JSX.Element}
 */
const CustomStockText = ({ stockText, availability }) => (
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

export const StockTextPdp = withCurrentProduct(connect(CustomStockText));
export const StockTextSheet = connect(CustomStockText);
export default StockTextPdp;
