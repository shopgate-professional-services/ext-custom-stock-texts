import { connect } from 'react-redux';
import { getProductAvailability } from '@shopgate/engage/product';
import {
  AVAILABILITY_STATE_OK,
  AVAILABILITY_STATE_WARNING,
  AVAILABILITY_STATE_ALERT,
} from '@shopgate/pwa-common-commerce/product/constants';
import { available, lowStock, unavailable } from '../../config';

/**
 * Returns the configured label for a given availability state.
 *
 * @param {string} availabilityState Availability state
 * @returns {string} Configured stock text for the given state, or an empty string
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

/**
 * Resolves the availability state.
 *
 * @param {Object} state Redux state
 * @param {Object} props Component props
 * @returns {string} Availability state ("ok" | "warning" | "alert")
 */
const resolveAvailabilityState = (state, props) => {
  // Variant sheet
  if (typeof props.state === 'string') {
    return props.state;
  }

  // Favorites
  if (props.availability && typeof props.availability.state === 'string') {
    return props.availability.state;
  }

  // PDP
  const productAvailability = getProductAvailability(state, props);
  if (productAvailability && typeof productAvailability.state === 'string') {
    return productAvailability.state;
  }

  return AVAILABILITY_STATE_OK;
};

/**
 * Redux mapStateToProps.
 *
 * @param {Object} state Redux state
 * @param {Object} props Component props
 * @returns {{ availability: string, stockText: string }}
 */
const mapStateToProps = (state, props) => {
  const availability = resolveAvailabilityState(state, props);
  return {
    availability,
    stockText: pickMappedText(availability),
  };
};

export default connect(mapStateToProps);
