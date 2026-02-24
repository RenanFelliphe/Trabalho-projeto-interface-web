import { BrowserRouter, Routes, Route, NavLink, useLocation} from 'react-router-dom'
import { TaskMaster } from './pages/taskmaster'
import { Home } from './pages/home'
import { MoneyFlow } from './pages/moneyflow'
import { ConnectHub } from './pages/connecthub'
import { Header } from "./components/header"
import { Footer } from './components/footer'
 
export function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/taskmaster' element={<TaskMaster />} />
                <Route path='/moneyflow' element={<MoneyFlow />} />
                <Route path='/connecthub' element={<ConnectHub />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}