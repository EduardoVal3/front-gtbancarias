import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { v } from "../../styles/Variables";

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.bg3};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
    transform: translateY(-6px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.3rem;
`;

const Desc = styled.p`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Counter = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const DashboardCard = ({
  icon,
  title,
  description,
  count,
  onClick,
  index,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.8, type: "spring", bounce: 0.4 }
    }
  };

  return (
    <Card
      onClick={onClick}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
      <Counter>
        <CountUp end={count} duration={1.4} separator="," />
      </Counter>
    </Card>
  );
};

export default DashboardCard;
