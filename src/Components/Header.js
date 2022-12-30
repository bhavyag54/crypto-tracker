import React from 'react'
import styled from 'styled-components'
import {AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai'

function Header() {
  return (
    <Container>
      
        <Right>
            Crypto Tracker
        </Right>

        <Left>
            <Icon>
                <AiOutlineSearch/>
            </Icon>
            <AiOutlineMenu/>
        </Left>

    </Container>
  )
}

export default Header

const Container = styled.div`

    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    box-shadow: 0px 3px 20px rgba(0,0,0,0.2);
    align-items: center;
    gap: 10px;
    @media (max-width: 768px){
        
        flex-direction: row-reverse;
        justify-content: flex-end;
    }

`

const Right = styled.div`

    position: relative;
    font-weight: 700;
    font-size: 20px;
`

const Icon = styled.div`
    cursor: pointer;
`

const Left = styled.div`

    display: flex;
    gap: 20px;
    /* background-color: aliceblue; */
    align-items: center;
    position: relative;
    font-size: 20px;

    @media (max-width: 768px)
    {
        ${Icon}{
                display: none;
            }
    }

`
