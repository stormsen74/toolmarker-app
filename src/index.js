import React from 'react'
import ReactDOM from 'react-dom'
import CoreComponent from './components/Core'
import { GlobalStyle } from './common/styles'
import { ThemeProvider } from 'styled-components'
import { theme } from './common/layout'

function App() {
  // const isLPreview = new URLSearchParams(window.location.search).get('preview') === 'true';
  const isLocal = window.location.href.includes('localhost')
  const protocol = !isLocal ? window.location.protocol : null

  if (protocol && protocol === 'http:') {
    // => force https
    // window.location.href = window.location.href.replace('http:', 'https:');
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{<CoreComponent />}</ThemeProvider>
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<App />, root)

export default App
