import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Lander from './components/Lander/login'
import HowTo from './components/HowTo/HowTo'
import Home from './components/Home/Home'
import Gameroom from './components/Gameroom/Gameroom'


export default (   
    <Switch>
        <Route exact path='/' component={Lander}/>
        <Route path='/howto' component={HowTo}/>
        <Route path='/home' component={Home}/>
        <Route path='/gameroom/:gameroom_id' component={Gameroom}/>
    </Switch>
)
