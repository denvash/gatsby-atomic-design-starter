import { useUtilities } from '@hooks';
import { IconMoon, IconSettings, IconSignal, IconWarning } from '@icons';
import { mixins, spring } from '@styles';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Item = styled(motion.div)``;

const Container = styled(motion.div)`
  ${mixins.flexCenter};
  ${Item} {
    ${tw`mx-1`}
  }
`;

const container = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  visible: {
    y: 0,
    transition: spring.slow,
  },
  hidden: {
    y: -50,
  },
};

const icons = {
  signal: IconSignal,
  moon: IconMoon,
  settings: IconSettings,
  warning: IconWarning,
};

const UtilitiesBar = () => {
  const { setValue } = useUtilities();
  return (
    <Container initial="hidden" animate="visible" variants={container}>
      {Object.entries(icons).map(([value, Icon]) => {
        const onClick = () => setValue(value);
        return (
          <Item key={Icon.name} onClick={onClick} variants={item}>
            <Icon />
          </Item>
        );
      })}
    </Container>
  );
};

export default UtilitiesBar;