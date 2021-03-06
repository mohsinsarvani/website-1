import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop, withProp } from 'styled-tools';

// Import media queries
import mq from '../common/mq';

const SegmentedContainer = styled.div`
  border-bottom: ${prop('borderbottom', '1px solid #efefef')};
  padding-bottom: ${withProp('multiplier', multiplier => `${multiplier * 2.25}rem`)};
  margin-bottom: ${withProp('multiplier', multiplier => `${multiplier * 2.25}rem`)};

  @media (min-width: ${mq.min['1024']}) {
    padding-bottom: ${withProp('multiplier', multiplier => `${multiplier * 3.2}rem`)};
    margin-bottom: ${withProp('multiplier', multiplier => `${multiplier * 3.2}rem`)};
  }
`;

const Segmented = ({ children, borderBottom, multiplier, ...rest }) => (
  <SegmentedContainer
    className="Segmented"
    borderbottom={borderBottom}
    multiplier={multiplier}
    {...rest}
  >
    {children}
  </SegmentedContainer>
);

Segmented.propTypes = {
  children: PropTypes.node.isRequired,
  borderBottom: PropTypes.string,
  multiplier: PropTypes.number
};

Segmented.defaultProps = {
  borderBottom: '1px solid #efefef',
  multiplier: 1
};

export default Segmented;
