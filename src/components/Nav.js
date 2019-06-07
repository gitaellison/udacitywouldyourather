import React from 'react'
import { NavLink } from 'react-router-dom'
import User from './User'

export default function Nav () {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>   
         <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li>
           Hello, <User />!        
        </li>
        <li>
          <NavLink to='/logout' activeClassName='active'>
            Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}