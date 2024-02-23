import DashboardHome from '@/components/dashboardHome'
import SideBar from '@/components/sideBar'
import React from 'react'

export default function Dashboard() {
  return (
    <main>
      <SideBar/>
      <DashboardHome/>
    </main>
  )
}