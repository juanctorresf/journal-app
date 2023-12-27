import React from 'react'
import ReactDOM from 'react-dom/client'

import { JournalApp } from './JournalApp'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Provider store={ store }>
        <BrowserRouter>
            <JournalApp />
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>,
)
