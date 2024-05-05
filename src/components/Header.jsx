import React, {useContext} from 'react'
import logo1 from '../../public/logo1.png'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../context/userSlice'
import { UserContext } from '../context/use_context';

export default function Header() {
  const  { state, setState }  = useContext(UserContext);

  const logOutPress = () =>{
    sessionStorage.setItem('token', '');
    setState('')
    // window.location.replace("/")
  }

  return (
  <>
  <div className="navbar bg-black md:block sm:hidden">
  <img className="h-10 md:w-34 md:h-24" src={logo1}/>
  <div className="navbar-start md:hidden">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      </div>
  </div>
  <div className="navbar-end">
    <div className="hidden absolute inset-x-0 top-10 left-40 md:flex justify-between items-center px-4">
    <div className="flex justify-center">
      <a href='/' className="mx-2 link link-hover text-xl">Home</a>
      <a href='/pod' className="mx-2 link link-hover text-xl">POD</a>
      <a href='/earth' className="mx-2 link link-hover text-xl">Earth</a>
      <a href='/mars' className="mx-2 link link-hover text-xl">Mars</a>
    </div>
    {state === '' ? (
      <div className="flex justify-end">
        <a href='/auth' className="mx-2">
          <button className="btn btn-outline">LogIn</button>
        </a>
        <a href='/auth' className="mx-2">
          <button className="btn btn-outline btn-info">SignIn</button>
        </a>
      </div>
    ): (
      <div className="flex items-center">
      <div>{state}</div>
      <button onClick={logOutPress} className="btn btn-outline btn-error ml-2">SignOut</button>
    </div>      
    )}
  </div>
  </div>
</div>
  <div className="relative">
  <div className="navbar bg-black md:hidden">
  <div className="navbar-start">
  <img className="h-10 md:w-34 md:h-24" src={logo1}/>

    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
  </div>
</div>
</div>
</>
)
}
