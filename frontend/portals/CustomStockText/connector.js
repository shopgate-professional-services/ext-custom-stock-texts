import { connect } from 'react-redux';
import { getProductStock } from '@shopgate/engage/product';
import {
  AVAILABILITY_STATE_OK,
  AVAILABILITY_STATE_WARNING,
  AVAILABILITY_STATE_ALERT,
} from '@shopgate/pwa-common-commerce/product/constants';
import { available, lowStock, unavailable } from '../../config';

/**
 * Determines the availability state and stock text based on quantity thresholds.
 *
 * @param {Object} state state.
 * @param {Object} props Component own props.
 * @param {string} [props.variantId] Product variant identifier.
 * @param {string} [props.productId] Base product identifier.
 * @param {string} props.id Product identifier on PDL.
 *
 * @returns {{
 *   stockText: string,
 *   availability: string
 * }}
 */
const mapStateToProps = (state, props) => {
  const resolvedId = props.variantId || props.productId || props.id;
  const stockInfo = getProductStock(state, { productId: resolvedId });

  if (!stockInfo || typeof stockInfo.quantity !== 'number') {
    return {
      stockText: '',
      availability: AVAILABILITY_STATE_OK,
    };
  }

  const stockQuantity = stockInfo.quantity;

  if (stockQuantity <= 0) {
    return {
      stockText: unavailable || '',
      availability: AVAILABILITY_STATE_ALERT,
    };
  }

  if (stockQuantity <= 5) {
    return {
      stockText: lowStock || '',
      availability: AVAILABILITY_STATE_WARNING,
    };
  }

  return {
    stockText: available || '',
    availability: AVAILABILITY_STATE_OK,
  };
};

export default connect(mapStateToProps);
