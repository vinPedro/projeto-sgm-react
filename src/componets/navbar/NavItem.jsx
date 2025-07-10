import { Link } from "react-router-dom"

function NavItem({ to, label, Icon }) {
    return (
        <li className="list-none p-[12px] text-white text-sm">
            <Link to={to} >
                {Icon && <Icon size={20} className='text-white m-[10px]'/>}
                <span>{label}</span>
            </Link>
        </li>
    )
}

export default NavItem