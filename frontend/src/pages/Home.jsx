import React from 'react'
import { Header } from '../components/Header'
import './Home.css'

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <section className="hero">
        <h2>Stay on Top of Your Assignments 📚</h2>
        <p>
          AssignMe helps students track deadlines, get reminders, and stay stress-free.
        </p>
        <button>Get Started</button>
      </section>


      <section className="feature__boxes">
        <div className="box">
          <h2>➕ Add Assignments</h2>
          <p>Quickly add and manage your tasks with ease.</p>
        </div>
        <div className="box">
          <h2>📅 Track Deadlines</h2>
          <p>Never miss a due date with smart reminders.</p>
        </div>
        <div className="box">
          <h2>✅ Stay Organized</h2>
          <p>View all your assignments in one place.</p>
        </div>
      </section>

      <footer className="footer">
        © 2025 AssignMe. Stay Organized, Stay Ahead 🚀
      </footer>
    </div>
  )
}
