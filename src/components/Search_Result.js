import React from 'react';
import styled from 'styled-components';


export default ({artistName, collectionName, trackName, artworkUrl100}) => {

    return (
        <Main>
            <Img src={artworkUrl100} />
            <Song_Name>{trackName}</Song_Name>
            <ArtistAlbum_Name>{artistName}from{collectionName}</ArtistAlbum_Name>
        </Main>
    )
}

// CSS //

const Main = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
padding: 10px;
`

const Img = styled.img`
width: 220px;
height: 220px;
`

const Song_Name = styled.div`
font-size: 20px;
font-weight: 900;
margin-top: 5px;
`

const ArtistAlbum_Name = styled.div`
font-size: 20px;
margin-top: 5px;
`