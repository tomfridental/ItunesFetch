import React, { Component } from 'react';
import {BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import TopBar from './TopBar';
import styled from 'styled-components';
import SearchPage from './SearchPage';
import Display from './Display';



class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            selectedItem: []
        }
        this.chosenItem = this.chosenItem.bind(this)
    }

    chosenItem(item) {
        this.setState({ selectedItem: item })
    }

    render() {

        const Links = () => (
            <Ul className="link-bar">
                <Li><Link to="/">Page 1</Link></Li>
                <Li><Link to="/result">Page 2</Link></Li>
            </Ul>
        )

        return (
            <BrowserRouter>
                <div>
                    <TopBar />
                    <Switch>
                        <Route exact path="/" render={(props) => <SearchPage chosenItem={this.chosenItem} />} />
                        <Route path="/result" render={(props) => <Display {...this.state.selectedItem} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

//CSS// 
const Ul = styled.ul`
display: flex;
align-items: center;
`

const Li = styled.li`
padding: 5px;
margin-right: 15px;
list-style-type: none;
`