import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  margin-right: 10px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;


const Option = styled(Link)`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: block;
  margin-bottom: 10px;
  color: #333;
  text-decoration: none;
  &:hover {
    color: #007bff;
  }
`;

const Sidebar = ({ options }) => {
// Filtrar las opciones que tienen option.status = true
  const optionsFilter = options.filter((option) => option.status === true);
  return (
    <SidebarWrapper>
      <SidebarList>
      {optionsFilter.map((option) => (
          <Option key={option.id} to={"/"+option.slug}>{option.name}</Option>
        ))}
      </SidebarList>
    </SidebarWrapper>
  );
};

export default Sidebar;
