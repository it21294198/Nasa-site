import React, {useContext, useEffect,useState} from 'react'
import logo1 from '../../public/logo1.png'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../context/userSlice'
import { UserContext } from '../context/use_context';

export default function Header() {
  const [state, setState] = useState('');
  useEffect(() => {
    setState(sessionStorage.getItem('email'))
  }, []);

  const logOutPress = () =>{
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('email', '')
    setState('')
    window.location.replace("/")
  }

  return (
  <>
  <div className="navbar bg-black">
  <img className="h-10 md:w-34 md:h-24" src={logo1}/>
  <div className="navbar-start md:hidden">
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
  <div className="navbar-end md:hidden">
  <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle swap swap-rotate">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <div tabIndex={0} className="menu menu-sm dropdown-content -left-28 mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-25 gap-4">
        <div>
            <a href='/' className="mx-2 link link-hover text-xl"><button className="btn btn-outline">Home</button></a>
        </div>
        <div>
            <a href='/pod' className="mx-2 link link-hover text-xl"><button className="btn btn-outline">POD</button></a>
        </div>
        <div>
            <a href='/earth' className="mx-2 link link-hover text-xl"><button className="btn btn-outline">Earth</button></a>
        </div>
        <div>
            <a href='/mars' className="mx-2 link link-hover text-xl"><button className="btn btn-outline">Mars</button></a>
        </div>
        <hr/>
        {
          state === '' ? (
            <>
              <div>
                <a href='/auth' className="mx-2 link link-hover text-xl">
                  <button className="btn btn-outline btn-info">LogIn</button>
                </a>
            </div>
            <div>
              <a href='/auth' className="mx-2 link link-hover text-xl">
                <button className="btn btn-outline btn-info">SignIn</button>
              </a>
            </div>
            </>
        ):(
          <>
          <h2>{state}</h2>
          <div>
            <button onClick={logOutPress} className="btn btn-error">SignIn</button>
          </div>
          </>
        )
      }
      </div>
    </div>
  </div>
</div>
</>
)
}
