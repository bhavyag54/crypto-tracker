import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import useApi from '../Context/ApiContext'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import { ThreeDots } from 'react-loader-spinner'

function CoinDetail() {

    const {coinsData, loader, fetchData} = useApi()

    const pageOptions = [10,25,50,100];
    const [numberPages, setNumberPages] = useState(pageOptions[0])
    const [totalPages, setTotalPages] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const filtersArray = [
        'Favorites',
        'DeFi',
        'CryptoCurrencies',
        'NFTs and Collectibles'
    ]

    const [isMobile, setIsMobile] = useState(window.matchMedia('(min-width: 768px)').matches)

    useEffect(() => {

        window.addEventListener('resize', () => setIsMobile(window.matchMedia('(min-width: 768px)').matches))
    }, [])

    useEffect(() => {
        
        let tp = []
        for(let i = 1; i<=(100/numberPages); i++)
        {
            tp.push(i);
        }

        setTotalPages([...tp])

        setPageNumber(1)
        fetchData(1, numberPages)

    }, [numberPages])

    useEffect(() => {
        console.log(pageNumber)
        fetchData(pageNumber, numberPages)
    }, [pageNumber])

    const [selectedFilters, setSelectedFilers] = useState({})

    const [modalOpen, setModalOpen] = useState({
        open: false,
        data: null
    })

    let number = 0;
    const [data, setData] = useState(() => [
        ...coinsData?.map((cd) =>({
            isFav: false,
            name: cd.name,
            price: cd.current_price,
            num:++number,
            symbol: cd.symbol,
            image: cd.image,
            high24h: parseFloat(cd.price_change_percentage_24h).toFixed(3),
            high7d: parseFloat(cd.price_change_percentage_7d_in_currency).toFixed(3),
            market_cap: cd.market_cap,
            volume: cd.total_volume,
            circulating_supply: parseInt(cd.circulating_supply),
            total_supply: parseInt(cd.total_supply)
        }))
    ])

    useEffect(() => {

        setData(() => [
            ...coinsData?.map((cd) =>({
                isFav: false,
                name: cd.name,
                price: cd.current_price,
                num:++number,
                symbol: cd.symbol,
                image: cd.image,
                high24h: parseFloat(cd.price_change_percentage_24h).toFixed(3),
                high7d: parseFloat(cd.price_change_percentage_7d_in_currency).toFixed(3),
                market_cap: cd.market_cap,
                volume: cd.total_volume,
                circulating_supply: parseInt(cd.circulating_supply),
                total_supply: parseInt(cd.total_supply)
            }))
        ])

    }, [coinsData])

    const openModal = (d = null) => {

        if(!d)
        {
            setModalOpen({
                open: false,
                data: null
            })
        }
        else
        setModalOpen({
            open: true,
            data: {...d}
        })
    }

    useEffect(() => {

        console.log(coinsData)
        console.log(modalOpen)
    }, [modalOpen])

    return (
        <Container>
        
            <Header>Top 100 Cryptocurrencies by Market Cap</Header>

            <Filters>

                <LeftFilters>

                {isMobile && filtersArray.map(f => (
                    
                    <Filter selected={selectedFilters[f]} onClick={() => setSelectedFilers({...selectedFilters, [f]: !selectedFilters[f]})}>{f}</Filter>
                    ))}
                </LeftFilters>

                <form>
                    <Select 
                    value={numberPages} 
                    onChange={e => setNumberPages(e.target.value)}>
                        {pageOptions.map((value) => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                        ))}
                    </Select>
                </form>

            </Filters>

            <MainCont>
            {loader?
            <Loader><ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="rgb(60,60,240)" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
                />
                </Loader>:
            


            <Table>

                <tbody>
                <Row dis={true}>
                    <Fav></Fav>
                    {isMobile?

                    <Number>#</Number>:""
                    }
                    <Name>NAME</Name>
                    <Price>PRICE</Price>
                    <High24h>24H</High24h>
                    {isMobile?
                    <>
                    <High7d>7D</High7d>
                    <Capital>MARKET CAP</Capital>
                    <Volume>VOLUME(24H)</Volume>
                    <Base>CIRCULATING SUPPLY</Base>

                    </>
                    :""}
                </Row>


                {data?.map(d => {
                    
                    console.log(d)
                    return(
                    <Row dis={false}>
                        <Fav 
                            onClick={() => 
                                setData(data.map(dd => dd.symbol === d.symbol?{...dd, isFav: !d.isFav}:{...dd}))}
                        >
                            {
                                d.isFav?<AiFillStar color='rgba(230,47,50,1)'/>
                                :
                                <AiOutlineStar/>
                            }
                        </Fav>
                        {isMobile?
                        <Number>{d.num}</Number>:""}
                        <Name onClick={() => openModal(d)}><Image src={`${d.image}`}/>{d.name}<Symbol>{d.symbol}</Symbol></Name>
                        <Price>${d.price}</Price>
                        <High24h color={d.high24h}>{Math.abs(d.high24h)} {d.high24h>0?"↑":"↓"}</High24h>
                        {isMobile?
                        <>
                        <High7d color={d.high7d}>{Math.abs(d.high7d)} {d.high7d>0?"↑":"↓"}</High7d>
                        <Capital>{d.market_cap}</Capital>
                        <Volume>{d.volume}
                        {/* <div>{parseInt(parseFloat(d.volume)/parseFloat(d.price))} btc</div> */}
                        </Volume>
                        <Supply w={parseFloat(d.circulating_supply/d.total_supply)*101}>{d.circulating_supply} BTC</Supply>
                        </>:""
                        }
                    </Row>
                )})}
                </tbody>

            </Table>
            }
            </MainCont>

            <Modal show={modalOpen.open}>
                <ModalData>
                    <ModalHeader>
                        <Name><Image src={`${modalOpen?.data?.image}`}/>{modalOpen?.data?.name}</Name>
                        
                        <Close onClick={() => openModal()}>X</Close>
                    </ModalHeader>

                    <ModalRow>
                        
                        <Price>PRICE<Price>${modalOpen?.data?.price}</Price></Price>
                        <High24h>24H<High24h color={modalOpen?.data?.high24h}>{modalOpen?.data?.high24h} {modalOpen?.data?.high24h>0?"↑":"↓"}</High24h></High24h>
                        <High7d>7D<High7d color={modalOpen?.data?.high7d}>{modalOpen?.data?.high7d} {modalOpen?.data?.high7d>0?"↑":"↓"}</High7d></High7d>
                        
                    </ModalRow>

                    <ModalRow>

                        <Capital>MARKET CAP
                        <Capital>${modalOpen?.data?.market_cap}</Capital>
                        </Capital>
                    </ModalRow>
                    <ModalRow>

                        <Volume>
                        VOLUME (24H)
                        <Volume>${modalOpen?.data?.volume}
                        </Volume>
                        </Volume>
                    </ModalRow>
                    <ModalRow>

                        <Base>
                        CIRCULATING SUPPLY
                        <ModalSupply w={parseFloat(modalOpen?.data?.circulating_supply/modalOpen?.data?.total_supply)*101}>{modalOpen?.data?.circulating_supply} BTC</ModalSupply>
                        </Base>
                    </ModalRow>

                </ModalData>
            </Modal>
            
            {!loader?
            <Pages>

            {totalPages?.map(p => {
                
                if(p <= 2);
                else if(p >= totalPages?.length-2);
                else if(p < pageNumber-2)
                return <></>
                
                else if(p > pageNumber+3)
                return <></>
                
                return (
                    <PageButton
                    bg={p===pageNumber?'rgb(200,230,255)':''}
                    onClick={() => setPageNumber(p)}
                    
                    >
                    {p}
                </PageButton>
                )
                
            })}
            </Pages>:""
            }

        </Container>
    )
}

export default CoinDetail

const Container = styled.div`

    position: relative;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 90vw;
    /* background-color: aliceblue; */
    margin: auto;

`

const MainCont = styled.div`

    position: relative;
    /* background-color: aliceblue; */
    height: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

`

const PageButton = styled.div`

    cursor: pointer;
    border-radius: 10px;
    padding: 5px 10px;

    background-color: ${props => props.bg};
`

const Header = styled.div`

    font-size: 24px;
    font-weight: 700;
    margin-top: 20px;

    @media (max-width: 768px)
    {
        font-size: 20px;
    }
`

const Select = styled.select`

    border: 1px solid rgb(240,240,240);
    font-size: 16px;
    border-radius: 10px;
    padding: 3px 5px;
    &:focus-visible{
        border: none;
    }
`

const Pages = styled.div`

    display: flex;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;

`

const Filters = styled.div`

    display: flex;
    gap: 10px;
    margin: 10px 20px;
    justify-content: space-between;


`

const LeftFilters = styled.div`

    display: flex;
    gap: 20px;
`

const Filter = styled.div`

    padding: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    background: ${props => props.selected?"rgb(230,240,255)":"rgb(240,240,240)"};
    border-radius: 6px;
    color:${props => props.selected?"rgb(100,100,255)":"rgb(0,0,0)"};

`

const Table = styled.table`

    border-collapse: collapse;
    width: 100%;

`

const Modal = styled.div`
    z-index: auto;
    display: ${({show}) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    transition: all 0.2s ease-in;
    background: rgba(0,0,0,0.1);
    backdrop-filter: blur(5px);

    @media (min-width: 768px)
    {
        display: none;
    }
`;


const ModalData = styled.div`

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 65%;
    width: 80vw;
    background-color: white;
    /* border: 1px solid black; */
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 10px;

`


const ModalHeader = styled.div`

    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
`

const ModalRow = styled.div`

    display: flex;
    justify-content: space-evenly;

`

const Close = styled.div`
    cursor: pointer;
`

const Row = styled.tr`

    /* cursor: pointer; */

    border-bottom: 1px solid rgba(0,0,0,0.3);
    /* transition: all 0.2s ease-out;
    &:hover{
        background-color: rgba(220,220,220,1); */
        /* transform: scale(1.02) translateX(2px) translateY(2px);
    } */
    
    
`
const Base = styled.th`
    /* border-bottom: 1px solid rgba(0,0,0,0.3); */
    /* text-align: center; */
    /* vertical-align: middle; */
    padding: 15px 0px;

`

const Loader = styled.div`

    position: relative;
    top: 200px;
    left: 50%;
    transform: translate(-50%,-50%);

`

const Fav = styled(Base)`

    position: relative;
    cursor: pointer;
    text-align: center;
    /* padding-top: 15px; */
    top: 2px;
`

const Symbol = styled.span`

    font-size: small;
    font-weight: 500;
    color: rgba(50,50,50, 1);
    margin-top: 1px;

`

const Number = styled(Base)`



`

const Image = styled.img`
    width: 20px;
    height: 20px;

`

const Name = styled(Base)`

    display: flex;
    align-items: center;
    margin-top: 0px;
    gap: 3px;
    cursor: pointer;
    /* background-color: red; */
    height: 100%;
    
`

const Price = styled(Base)`

`

const High24h = styled(Base)`

    color: ${props => props.color?props.color>0?'green':'red':'black'};

`

const High7d = styled(Base)`

color: ${props => props.color?props.color>0?'green':'red':'black'};
`

const Capital = styled(Base)`

    

`

const Volume = styled(Base)`

    position: relative;
    div{
        font-size: 10px;
        color: rgb(100,100,100);
    }

`


const Supply = styled(Base)`

    position: relative;
    
    &:after{
        content: "";
        position: absolute;
        top: 40px;
        left: 50px;
        right: 0;
        width: 100px;
        height: 2px;
        border: 1px solid rgb(200,200,200);
        border-radius: 10px;
        z-index: -1;
    }

    &::before{
        content: "";
        position: absolute;
        top: 40px;
        left: 50px;
        right: 0;
        width: ${props => props.w?props.w:101}px;
        height: 4px;
        background-color: rgb(200,200,200);
        border-radius: 10px;
        z-index: -1;
    }

`

const ModalSupply = styled(Base)`

position: relative;
    
    &:after{
        content: "";
        position: absolute;
        top: 40px;
        left: 0px;
        right: 0;
        width: 100px;
        height: 2px;
        border: 1px solid rgb(200,200,200);
        border-radius: 10px;
        z-index: -1;
    }

    &::before{
        content: "";
        position: absolute;
        top: 40px;
        left: 0px;
        right: 0;
        width: ${props => props.w?props.w:101}px;
        height: 4px;
        background-color: rgb(200,200,200);
        border-radius: 10px;
        z-index: -1;
    }    

`