import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import '~/assets/fonts/inter/inter.css'
import 'simplebar/src/simplebar.css'
import '~/assets/third-party/apex-chart.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { store } from '~/store/index'
import reportWebVitals from './reportWebVitals'
import { APP_BASE_NAME } from './config'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <ReduxProvider store={store}>
    <BrowserRouter basename={APP_BASE_NAME}>
      <App/>
      <ToastContainer/>
    </BrowserRouter>
  </ReduxProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
