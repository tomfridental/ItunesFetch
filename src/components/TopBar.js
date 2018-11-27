import React from 'react';
import styled from 'styled-components';

export default ({children}) => {

    return(
        <DivBar>{children}</DivBar>

    )};


// CSS //
const DivBar = styled.div`
width: 100%;
height: 8rem;
background-color: black;
display: flex;
align-items: center;
color: white;
font-size: 3rem;

 & a {
     color: white;
     text-decoration: none;
     border-bottom: 1px solid white;
     padding: 5px;
 }

 & a:hover{
     color: blue;
 }
`