import React from 'react'
import { NavLink } from 'react-router'
function Header() {
  return (
    <div className='flex flex-col sm:flex-row justify-between bg-blue-400 '>
        <img  width="80px" className="rounded-full p-2 bg-blend-multiply bg-blue-400" src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg" alt="logo" />
    
    <ul className='flex  flex-col sm:flex-row gap-8 p-5 font-bold text-2xl'>
        <li>
            <NavLink className={({isActive})=>isActive ? "text-orange-500 bg-white rounded-2xl p-2" :""} to="">Home</NavLink>
        </li>
        <li>
            <NavLink className={({isActive})=>isActive ? "text-orange-500 bg-white rounded-2xl p-2":""} to="/add-user" >Add User</NavLink>
        </li>
        <li>
            <NavLink className={({isActive})=>isActive ? "text-orange-500 bg-white rounded-2xl p-2":""} to="/user-list">User List</NavLink>
        </li>
        
    </ul>
    </div>
  )
}

export default Header