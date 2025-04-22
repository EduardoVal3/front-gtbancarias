import React from "react";
import styled from "styled-components";
import DashboardCard from "./DashboardCard";

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  width: 100%;
`;

const DashboardGrid = ({ cards, navigate }) => (
  <Grid>
    {cards.map((card, idx) => (
      <DashboardCard
        key={card.title}
        icon={card.icon}
        title={card.title}
        description={card.description}
        count={card.count}
        onClick={() => navigate(card.route)}
        index={idx}
      />
    ))}
  </Grid>
);

export default DashboardGrid;
