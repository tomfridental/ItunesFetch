import React, { Component } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import Search_Result from './Search_Result';
import { Redirect, Route } from 'react-router-dom';

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetchDone: false,
            fetchedResult: [],
            searchValue: '',
            redirect: false,
            topTen: [],
            showTopTen: false
        }
        this.setSearchValue = this.setSearchValue.bind(this)
        this.searchOnItunes = this.searchOnItunes.bind(this)
        this.selectAndRedirect = this.selectAndRedirect.bind(this)
        this.updateSearchParams = this.updateSearchParams.bind(this)
        this.displayTopTen = this.displayTopTen.bind(this)
    }

    setSearchValue(event) {
        this.setState({ searchValue: event.target.value })
    }

    searchOnItunes() {
        if(this.state.searchValue.length > 0){
        const searchKey = this.state.searchValue.replace(/ /, "+");
        fetch(`https://itunes.apple.com/search?term=${searchKey}&limit=25`)
            .then((res) => res.json())
            .then(res => this.setState({ fetchedResult: res.results }))
            .then(() => this.setState({ fetchDone: true }))
            .catch(err => console.log('Your Error is:', err));

        this.updateSearchParams(this.state.searchValue)
        }
    }

    selectAndRedirect(item) {
        this.props.chosenItem(item);
        this.setState({ redirect: true })
    }

    updateSearchParams(str) {

        fetch('http://localhost:3030/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchStr: str,
            })
        })
        .then((res,err) => {
            if(res.status === 201) console.log('Response: ',res);
            else console.log('Error: ',err);
        })
    }

    displayTopTen(){
        this.setState({showTopTen: !this.state.showTopTen})    
    }

    componentDidMount(){
    fetch(`http://localhost:3030/top_ten`)
    .then((res) => res.json())
    .then((res) => this.setState({topTen: res.list}))
    .then(() => console.log(this.state.topTen))
    .catch(err => console.log('Your Error is: ',err))
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to='/result' />
        }

        return (
            <Main>
                <SearchBar>
                    <Logo>Search Your song:</Logo>
                    <Search_Form>
                        <Search_Input type="text" placeholder="Search your Music" onChange={this.setSearchValue} />
                        <Search_Button type="button" onClick={this.searchOnItunes}>Run a Search</Search_Button>
                        <TopTenButton type="button" onClick={this.displayTopTen}>Top Ten Searches</TopTenButton>
                        {this.state.showTopTen &&
                        <ResUl>
                            {
                                this.state.topTen.map((str,i) => 
                                <li key={`res${i}`}>{`${i+1}. ${str.searchStr}`}</li>    
                                )
                            }
                        </ResUl>
                        }
                    </Search_Form>
                </SearchBar>
                <Results>
                    {this.state.fetchDone &&
                        <Ul>

                            {
                                this.state.fetchedResult.map(item =>
                                    <Li key={item.trackId} onClick={() => this.selectAndRedirect(item)}>
                                        <Search_Result {...item} />
                                    </Li>
                                )
                            }
                        </Ul>}
                </Results>
            </Main>

        )
    }
}

export default SearchPage;


// CSS //

const Main = styled.div`
min-height: 720px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 50px;
background: papayawhip;
background: -moz-linear-gradient(top,  #f5f5dc 0%, #d2b48c 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #f5f5dc 0%,#d2b48c 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #f5f5dc 0%,#d2b48c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
`

const SearchBar = styled.div`
min-height: 120px;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
padding: 20px 0px;

`

const Logo = styled.div`
font-family: 'Indie Flower', cursive;
font-size: 50px;
color: black;
`

const Search_Form = styled.form`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const Search_Button = styled.button`
margin: 10px 0px;
width: 150px;
height: 45px;
`

const TopTenButton = styled(Search_Button)`
margin: 0px;
`

const Search_Input = styled.input`
margin-top: 30px;
width: 300px;
height: 40px;
padding: 0px 10px;
`

const Results = styled.div`
min-width: 1600px;
min-height: 620px;
display: flex;
`

const Ul = styled.ul`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
width: 1600px;
`

const Li = styled.li`
width: 280px;
min-height: 350px;
border: 2px solid black;
list-style-type: none;
margin: 15px;
`
const ResUl = styled.ul`
font-size: 28px;
color: black;

& li {
list-style-type: none;   
}
`