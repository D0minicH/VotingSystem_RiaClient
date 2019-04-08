import React from 'react';
import { Jumbotron } from 'reactstrap';

const Header = ({ title, status, isError }) => (
  <Jumbotron>
    <h1>{title}</h1>
    <h4 style={isError ? errorStyle : msgStyle}>{status}</h4>
  </Jumbotron>
)
export default Header;

const errorStyle = {
  color: 'red',
};

const msgStyle = {
  color: 'black',
};

