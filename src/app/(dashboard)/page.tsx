'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Types
interface Stats {
  totalPatients: number
  activeProjects: number
  pendingTasks: number
  teamMembers: number
  todayAppointments: number
  emergencyCases: number
  bedOccupancy: number
  revenue: number
}

interface Activity {
  id: string
  type: 'appointment' | 'surgery' | 'admission' | 'discharge' | 'emergency' | 'task'
  title: string
  time: string
  user: string
  status?: 'completed' | 'pending' | 'in-progress'
}

interface Appointment {
  id: string
  patient: string
  doctor: string
  time: string
  type: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
}

interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  assignedTo: string
  status: 'todo' | 'in-progress' | 'done'
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState('')

  // Load dashboard data
  useEffect(() => {
    loadDashboardData()
    setGreeting(getGreeting())
    
    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock data for Alhafeez Hospital
    setStats({
      totalPatients: 1547,
      activeProjects: 8,
      pendingTasks: 23,
      teamMembers: 45,
      todayAppointments: 32,
      emergencyCases: 4,
      bedOccupancy: 78,
      revenue: 125000
    })

    setActivities([
      { id: '1', type: 'appointment', title: 'New appointment scheduled with Dr. Ahmed', time: '5 min ago', user: 'Sarah' },
      { id: '2', type: 'surgery', title: 'Heart surgery completed successfully', time: '15 min ago', user: 'Dr. Khan', status: 'completed' },
      { id: '3', type: 'admission', title: 'Patient admitted to ICU', time: '25 min ago', user: 'Nurse Ali', status: 'in-progress' },
      { id: '4', type: 'emergency', title: 'Emergency case - Cardiac arrest', time: '35 min ago', user: 'Dr. Ahmed', status: 'in-progress' },
      { id: '5', type: 'discharge', title: 'Patient discharged from Room 204', time: '1 hour ago', user: 'Dr. Fatima', status: 'completed' },
      { id: '6', type: 'task', title: 'Medical supplies inventory updated', time: '2 hours ago', user: 'Store Dept', status: 'completed' },
    ])

    setAppointments([
      { id: '1', patient: 'Muhammad Ali', doctor: 'Dr. Ahmed Khan', time: '09:00 AM', type: 'Checkup', status: 'scheduled' },
      { id: '2', patient: 'Fatima Bibi', doctor: 'Dr. Sara Ahmed', time: '09:30 AM', type: 'Follow-up', status: 'in-progress' },
      { id: '3', patient: 'Usman Malik', doctor: 'Dr. Omar Hassan', time: '10:00 AM', type: 'Consultation', status: 'scheduled' },
      { id: '4', patient: 'Ayesha Khan', doctor: 'Dr. Fatima Ali', time: '10:30 AM', type: 'Surgery Prep', status: 'scheduled' },
      { id: '5', patient: 'Imran Qureshi', doctor: 'Dr. Ahmed Khan', time: '11:00 AM', type: 'Emergency', status: 'in-progress' },
      { id: '6', patient: 'Sadia Mirza', doctor: 'Dr. Sara Ahmed', time: '11:30 AM', type: 'Checkup', status: 'scheduled' },
    ])

    setTasks([
      { id: '1', title: 'Review patient lab results', priority: 'high', dueDate: 'Today', assignedTo: 'Dr. Ahmed', status: 'todo' },
      { id: '2', title: 'Update medical records', priority: 'medium', dueDate: 'Today', assignedTo: 'Dr. Fatima', status: 'in-progress' },
      { id: '3', title: 'Approve equipment purchase', priority: 'high', dueDate: 'Tomorrow', assignedTo: 'Admin', status: 'todo' },
      { id: '4', title: 'Staff meeting', priority: 'medium', dueDate: 'Today', assignedTo: 'HR', status: 'done' },
      { id: '5', title: 'Prepare monthly report', priority: 'low', dueDate: 'Friday', assignedTo: 'Dept Heads', status: 'todo' },
    ])

    setLoading(false)
  }

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  // Get activity icon and color
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'appointment': return { icon: 'fa-calendar-check', color: 'bg-blue-500' }
      case 'surgery': return { icon: 'fa-procedures', color: 'bg-purple-500' }
      case 'admission': return { icon: 'fa-user-plus', color: 'bg-green-500' }
      case 'discharge': return { icon: 'fa-user-check', color: 'bg-teal-500' }
      case 'emergency': return { icon: 'fa-ambulance', color: 'bg-red-500' }
      case 'task': return { icon: 'fa-tasks', color: 'bg-orange-500' }
      default: return { icon: 'fa-bell', color: 'bg-gray-500' }
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500 bg-red-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/20'
      case 'low': return 'text-green-500 bg-green-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  // Get appointment status color
  const getAppointmentStatus = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400'
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400'
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return <DashboardLoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {greeting}, Dr. Ahmed! 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening at Alhafeez Hospital today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Patients"
            value={stats?.totalPatients || 0}
            icon="fa-users"
            color="from-blue-500 to-blue-600"
            bgColor="bg-blue-500/20"
            trend="+12%"
          />
          <StatsCard
            title="Active Projects"
            value={stats?.activeProjects || 0}
            icon="fa-project-diagram"
            color="from-purple-500 to-purple-600"
            bgColor="bg-purple-500/20"
            trend="+3"
          />
          <StatsCard
            title="Pending Tasks"
            value={stats?.pendingTasks || 0}
            icon="fa-tasks"
            color="from-orange-500 to-orange-600"
            bgColor="bg-orange-500/20"
            trend="-5"
          />
          <StatsCard
            title="Team Members"
            value={stats?.teamMembers || 0}
            icon="fa-user-md"
            color="from-green-500 to-green-600"
            bgColor="bg-green-500/20"
            trend="+2"
          />
        </div>

        {/* Second Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Today's Appointments"
            value={stats?.todayAppointments || 0}
            icon="fa-calendar-check"
            color="from-cyan-500 to-cyan-600"
            bgColor="bg-cyan-500/20"
            trend="8 remaining"
          />
          <StatsCard
            title="Emergency Cases"
            value={stats?.emergencyCases || 0}
            icon="fa-ambulance"
            color="from-red-500 to-red-600"
            bgColor="bg-red-500/20"
            trend="Critical"
          />
          <StatsCard
            title="Bed Occupancy"
            value={`${stats?.bedOccupancy || 0}%`}
            icon="fa-bed"
            color="from-indigo-500 to-indigo-600"
            bgColor="bg-indigo-500/20"
            trend="Normal"
          />
          <StatsCard
            title="Today's Revenue"
            value={`$${stats?.revenue.toLocaleString() || 0}`}
            icon="fa-dollar-sign"
            color="from-emerald-500 to-emerald-600"
            bgColor="bg-emerald-500/20"
            trend="+8%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <i className="fas fa-calendar-alt text-blue-500 mr-2"></i>
                  Today's Appointments
                </h2>
                <Link href="/dashboard/appointments" className="text-sm text-blue-400 hover:text-blue-300 transition">
                  View All <i className="fas fa-arrow-right ml-1 text-xs"></i>
                </Link>
              </div>

              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition group">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${apt.status === 'in-progress' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                      <div>
                        <p className="text-white text-sm font-medium">{apt.patient}</p>
                        <p className="text-gray-400 text-xs">{apt.doctor} • {apt.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-sm">{apt.time}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getAppointmentStatus(apt.status)}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tasks */}
          <div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  Quick Tasks
                </h2>
                <Link href="/dashboard/tasks" className="text-sm text-green-400 hover:text-green-300 transition">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-green-500" />
                      <div>
                        <p className="text-white text-sm">{task.title}</p>
                        <p className="text-gray-400 text-xs">Due: {task.dueDate}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <i className="fas fa-history text-purple-500 mr-2"></i>
                  Recent Activity
                </h2>
                <Link href="/dashboard/activity" className="text-sm text-purple-400 hover:text-purple-300 transition">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => {
                  const { icon, color } = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <i className={`fas ${icon} text-white text-xs`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{activity.title}</p>
                        <p className="text-gray-400 text-xs">{activity.time} • by {activity.user}</p>
                      </div>
                      {activity.status && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          activity.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bed Occupancy Chart */}
          <div>
            <div className="bg-white/5 rounded-xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <i className="fas fa-chart-pie text-blue-500 mr-2"></i>
                Bed Occupancy
              </h2>
              
              <div className="relative pt-4">
                {/* Simple donut chart representation */}
                <div className="w-40 h-40 mx-auto mb-4 relative">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - (stats?.bedOccupancy || 0) / 100)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{stats?.bedOccupancy}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Occupied</span>
                    <span className="text-white">156 beds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Available</span>
                    <span className="text-white">44 beds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Maintenance</span>
                    <span className="text-white">12 beds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, icon, color, bgColor, trend }: {
  title: string
  value: number | string
  icon: string
  color: string
  bgColor: string
  trend: string
}) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <i className={`fas ${icon} text-white text-xl`}></i>
        </div>
        <span className="text-sm text-gray-400">{trend}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

// Loading Skeleton
function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Welcome Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-white/10 rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-white/10 rounded w-96 animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
              <div className="w-12 h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="h-4 bg-white/10 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-8 bg-white/10 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Second Stats Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
              <div className="w-12 h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="h-4 bg-white/10 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-8 bg-white/10 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-white/10 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-14 bg-white/10 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-white/10 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-14 bg-white/10 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}