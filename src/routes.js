import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Lander from './components/lander/login'
import HowTo from './components/HowTo/HowTo'
import Home from './components/home/Home'
import Gameroom from './components/gameroom/Gameroom'


export default (   
    <Switch>
        <Route exact path='/' component={Lander}/>
        <Route path='/howto' component={HowTo}/>
        <Route path='/home' component={Home}/>
        <Route path='/gameroom/:gameroom_id' component={Gameroom}/>
    </Switch>
)
