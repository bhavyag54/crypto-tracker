import React from 'react'
import styled from 'styled-components'
import Slider from 'react-styled-carousel';


function Carousel() {

    const responsive = [
        { breakPoint: 768, cardsToShow: 3, margin:"10px"},
        {breakPoint:0, cardsToShow: 1, autoSlide:2000,}
    ];
       

    // const Example = () => (
    //     <Slider >
          
    //     </Slider>
    //   );

    return (
        <Container>
            
            <Example responsive={responsive}>
                <Card>
                    <Image src="/bm.png"/>
                    <Text>
                        Ea deserunt esse ex irure. Enim enim commodo ad id
                    </Text>
                </Card>
                <Card>
                    <Image src="/bm.png"/>
                    <Text>
                        Ea deserunt esse ex irure. Enim enim commodo ad id 
                    </Text>
                </Card>
                <Card>
                    <Image src="/bm.png"/>
                    <Text>
                        Ea deserunt esse ex irure. Enim enim commodo ad id 
                    </Text>
                </Card>
            </Example>

        </Container>
    )
}

export default Carousel


const Container = styled.div`

    width: 90vw;
    height: 20vh;
    /* background-color: aliceblue; */
    margin: auto;
    margin-top: 20px;
    overflow: hidden;
    text-align: center;

`

const Example = styled(Slider)`

    align-items: center;
    text-align: center;
    margin: auto;

`

const Image = styled.img`

    width: 100px;
    overflow: hidden;
    height: 100px;
    border-radius: 100px;
    border: 1px solid rgb(240,240,240);

`

const Card = styled.div`

    width: 90%;
    align-self: center;
    text-align: center;
    align-items: center;
    /* background-color: red; */
    height: 20vh;
    border-radius: 20px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`

const Text = styled.div`

    position: relative;
    font-size: 14px;
    width: 50%;

`