import NavBar from "../navbar/NavBar"
import NavItem from "../navbar/NavItem"
import { FiLogOut } from 'react-icons/fi';


function Conteiner({ children }) {
    return (
        <>
            <header className="bg-gradient-custom h-[110px] w-full min-w-[375px] flex justify-center">
                <div className="min-w-[375px] max-w-[1800px] flex-col">
                    <nav className="flex justify-between">
                        <h1 className='p-[10px] font-bold text-5xl cursor-default text-gray-300'>SGM</h1>
                        <NavItem to='/' Icon={FiLogOut}/>
                    </nav>
                    <NavBar />
                </div>
            </header>
            <main>{children}</main>
        </>
    )
}

export default Conteiner