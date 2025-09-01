import React from 'react'
import { Header } from '../components/Header'
import './Dashboard.css'

export const Dashboard = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='dashboard'>
        <h1 >📚 Assignment Reminder</h1>

        <div className="form__card">
          <form>
            <input placeholder="Title" />
            <input placeholder="Subject" />
            <input type="date" />
            <button className='form-button'>Add</button>
          </form>
        </div>

        <ul>
          <li>
            <span>Assignment Title - Subject (due Date)</span>
            {/* <button>Mark Complete</button> */}
          </li>
        </ul>
      </div>

    </div>
  )
}
