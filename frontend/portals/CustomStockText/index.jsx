import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withCurrentProduct } from '@shopgate/engage/core/hocs';
import { Availability } from '@shopgate/engage/components';
import { getProductAvailability } from '@shopgate/engage/product';
import {
  AVAILABILITY_STATE_OK,
  AVAILABILITY_STATE_WARNING,
  AVAILABILITY_STATE_ALERT,
} from '@shopgate/pwa-common-commerce/product/constants';
import { available, lowStock, unavailable } from '../../config';


/**
 * Returns the configured label for a given availability state.
 */
const pickMappedText = (availabilityState) => {
  switch (availabilityState) {
    case AVAILABILITY_STATE_ALERT:
      return unavailable || '';
    case AVAILABILITY_STATE_WARNING:
      return lowStock || '';
    case AVAILABILITY_STATE_OK:
    default:
      return available || '';
  }
};

const isValidState = (state) =>
  state === AVAILABILITY_STATE_OK ||
  state === AVAILABILITY_STATE_WARNING ||
  state === AVAILABILITY_STATE_ALERT;

/**
 * Hook: resolves availability state from props override, favorites prop, PDP selector.
 */
const useResolvedAvailabilityState = (props) =>
  useSelector((state) => {
    // Variant sheet
    if (isValidState(props.state)) {
      return props.state;
    }

    // Favorites
    const favState = props.availability?.state;
    if (isValidState(favState)) {
      return favState;
    }

    // PDP
    const productAvailability = getProductAvailability(state, props);
    const pdpState = productAvailability?.state;

    return isValidState(pdpState) ? pdpState : AVAILABILITY_STATE_OK;
  });

const CustomStockText = (props) => {
  const availability = useResolvedAvailabilityState(props);
  const stockText = pickMappedText(availability);

  return (
    <Availability
      text={stockText}
      state={availability}
      showWhenAvailable
      className="custom-stock-text"
    />
  );
};

CustomStockText.propTypes = {
  state: PropTypes.oneOf([
    AVAILABILITY_STATE_OK,
    AVAILABILITY_STATE_WARNING,
    AVAILABILITY_STATE_ALERT,
  ]),
  availability: PropTypes.shape({
    state: PropTypes.oneOf([
      AVAILABILITY_STATE_OK,
      AVAILABILITY_STATE_WARNING,
      AVAILABILITY_STATE_ALERT,
    ]),
  }),
};

CustomStockText.defaultProps = {
  state: undefined,
  availability: undefined,
};

export const StockTextPdp = withCurrentProduct(CustomStockText);
export const StockTextSheet = CustomStockText;
export default StockTextPdp;
