import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components';

export default ({ previewUrl, artworkUrl100, trackName, artistName, collectionName, kind, trackTimeMillis}) => {
    

    return (
        <Main>
            <Title>Media Player and File info</Title>
            <Info_Frame>
                <ImgDiv><Img src={artworkUrl100}/></ImgDiv>
                <InfoDiv>
                    <Info>{trackName} <br /> by {artistName}</Info>
                    <Info>Album: {collectionName}</Info>
                    <Info>Type: {kind}</Info>
                    <Info>Length: {trackTimeMillis/1000}sec</Info>
                </InfoDiv>
            </Info_Frame>
            <ReactPlayer url={previewUrl} playing controls />
        </Main>
    )
}


// CSS //

const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
padding: 20px;
border: 1px solid black;
background: -moz-linear-gradient(top,  #f5f5dc 0%, #d2b48c 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #f5f5dc 0%,#d2b48c 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #f5f5dc 0%,#d2b48c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
min-height: 90vh;
`

const Title = styled.div`
font-family: 'Indie Flower', cursive;
font-size: 50px;
color: orange;
margin-bottom: 25px;
`

const Info_Frame = styled.div`
min-width: 700px;
min-height: 250px;
border: 1px solid black;
display: flex;
align-items: center;
background-color: #FFA500;
margin-bottom: 20px;
`

const ImgDiv = styled.div`
min-height: 200px;
min-width: 200px;
padding: 10px;
`

const Img = styled.img`
width: 200px;
height: 200px;
`

const InfoDiv = styled.div`
height: 250px;
min-width: 500px;
display: flex;
flex-direction: column;
`

const Info = styled.div`
min-height: 30px;
padding:  10px 10px;
display: flex;
align-items: center;
font-weight: 600;
font-size: 25px;
`