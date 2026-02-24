import reactLogo from '../assets/react-logo.png';
import { NavLink, useLocation} from 'react-router-dom';

export function Header() {

    const { pathname } = useLocation()
    const currentPage = pathname

    const currentPageCSS = "text-sky-400 font-bold scale-120";

    return (
            <header className='fixed top-0 z-999 backdrop-blur-sm bg-slate-800/80 border-b border-slate-700 flex items-center justify-between p-5 w-full h-20'>
                <NavLink to={'/'}><img src={reactLogo} alt="React Logo"className='w-[5.5rem] h-[3.1rem]'/></NavLink>
                <div className="flex gap-7">
                    <NavLink to={'/'} className={`hover:text-sky-700 transition-all duration-150 ${currentPage === '/' ? currentPageCSS : 'text-white'}`}>Home</NavLink>
                    <NavLink to={'/taskmaster'} className={`hover:text-sky-700 transition-all duration-150 ${currentPage === '/taskmaster' ? currentPageCSS : 'text-white'}`}>Taskmaster</NavLink>
                    <NavLink to={'/connecthub'} className={`hover:text-sky-700 transition-all duration-150 ${currentPage === '/connecthub' ? currentPageCSS : 'text-white'}`}>ConnectHub</NavLink>
                    <NavLink to={'/moneyflow'} className={`hover:text-sky-700 transition-all duration-150 ${currentPage === '/moneyflow' ? currentPageCSS : 'text-white'}`}>MoneyFlow</NavLink>
                </div>
            </header>
    )
}