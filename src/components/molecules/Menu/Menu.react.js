import { mixins, spring } from '@styles';
import { NOOP } from '@utils';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { Children, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import tw from 'twin.macro';

const selected = css`
  ${tw`text-black font-semibold`}
`;

const Item = styled(motion.div)`
  ${mixins.colorOnFocus}
  ${tw`text-secondary text-center`};
  transition-property: color, font-weight;
  ${ifProp('selected', selected)};
`;

const horizontal = css`
  ${tw`flex-row`}
  ${Item}:not(:last-child) {
    ${tw`mr-10`}
  }
`;

const vertical = css`
  ${tw`flex-col`}
  ${Item}:not(:last-child) {
    ${tw`mb-3`}
  }
`;

const Items = styled(motion.div)`
  ${mixins.flexCenter}
  ${ifProp('horizontal', horizontal, vertical)}
`;

const container = {
  visible: delayChildren => ({
    transition: {
      ...spring.slow,
      staggerChildren: 0.3,
      delayChildren,
    },
  }),
};

const item = {
  visible: {
    opacity: 1,
    x: 0,
    transition: spring.slow,
  },
  hidden: {
    opacity: 0,
    x: -20,
  },
};

const Menu = ({
  children,
  onChange = NOOP,
  className,
  delayAnimation = 0,
  visible = true,
  horizontal = false,
}) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  return (
    <Items
      className={className}
      horizontal={horizontal}
      custom={delayAnimation}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={container}>
      {Children.map(children, child => {
        const key = child.key;
        const onClick = () => setSelected(key);
        return (
          <Item key={key} selected={selected === key} onClick={onClick} variants={item}>
            {child}
          </Item>
        );
      })}
    </Items>
  );
};

Menu.SC = {
  Item,
  Items,
};
Menu.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  delayAnimation: PropTypes.number,
  visible: PropTypes.bool,
  horizontal: PropTypes.bool,
};

export default Menu;