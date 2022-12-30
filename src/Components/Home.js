import React from 'react'
import styled from 'styled-components'
import useApi from '../Context/ApiContext'
import Carousel from './Carousel'
import CoinDetail from './CoinDetail'
import Header from './Header'

function Home() {


    return (
        <Container>
            <Header/>
            <Carousel/>
            <CoinDetail/>
        
        </Container>
    )
}

export default Home


const Container = styled.div`

    display: flex;
    flex-direction: column;

`