import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import App from './App.jsx'
import './index.css'
import './theme.js'
import { ThemeProvider } from '@emotion/react'
import theme from './theme.js'
createRoot(document.getElementById('root')).render(
<ThemeProvider theme={theme}>
 <Provider store={store}>
    <App />
  </Provider>,
  </ThemeProvider>
)
