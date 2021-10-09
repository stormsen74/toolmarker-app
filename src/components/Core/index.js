import React, { useEffect } from 'react'
import { Container } from './styles'
import { appStates, database } from 'services/appStates'
import Recorder from '../Recorder'
import List from '../List'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ToolView from '../ToolView'
import { hot } from 'react-hot-loader'
import Home from '../Home'

// Todo's
// ADD TO GIT
// LIST ITEMS
// ADD NEW ITEM
// DISPLAY ITEM (IMAGE / SOUND)
// SOUND => UPLOAD
// USER ROLES
// ESLINT config
// PM2 on server
// https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually

export function NotFound() {
  return <div>{'NotFound!'}</div>
}

function CoreComponent() {
  const environment = appStates(state => state.environment)
  const database_url = database[environment]
  // const isMobile = appStates(state => state.debug);

  useEffect(() => {
    appStates.getState().init()

    console.log('init', database_url, history)
  }, [])

  return (
    // <Container>
    //   {/*<Recorder />*/}
    //   {/*<Login />*/}
    //   {/*<Upload />*/}
    //   <List />
    //   {/*{debug && <StyledPin />}*/}
    // </Container>
    <>
      <Router>
        <Container>
          {/*<Link to="/tool?id=1">ToolView</Link>*/}
          <Switch>
            {/*<Route path="/config" component={Config} />*/}
            {/*<Route exact path="/intro" component={Intro} />*/}
            {/*<Route exact path="/tool" component={ToolView} />*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
            <Route exact path="/tool" component={ToolView} />
            <Route exact path="/recorder" component={Recorder} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default hot(module)(CoreComponent)
