'use client'

interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan'
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatsCards() {
  // Mock data - in real app, this would come from props or API
  const stats: StatsCardProps[] = [
    {
      title: 'Total Patients',
      value: '1,547',
      icon: 'fa-users',
      color: 'blue',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Projects',
      value: '8',
      icon: 'fa-project-diagram',
      color: 'green',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Pending Tasks',
      value: '23',
      icon: 'fa-tasks',
      color: 'orange',
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Team Members',
      value: '45',
      icon: 'fa-user-md',
      color: 'purple',
      trend: { value: 2, isPositive: true }
    },
    {
      title: "Today's Appointments",
      value: '32',
      icon: 'fa-calendar-check',
      color: 'cyan',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Emergency Cases',
      value: '4',
      icon: 'fa-ambulance',
      color: 'red',
      trend: { value: 2, isPositive: false }
    },
    {
      title: 'Bed Occupancy',
      value: '78%',
      icon: 'fa-bed',
      color: 'blue',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Revenue (Today)',
      value: '$125K',
      icon: 'fa-dollar-sign',
      color: 'green',
      trend: { value: 8, isPositive: true }
    }
  ]

  // Get color classes based on color prop
  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-500',
        icon: 'bg-blue-500'
      },
      green: {
        bg: 'bg-green-500/20',
        text: 'text-green-500',
        icon: 'bg-green-500'
      },
      purple: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-500',
        icon: 'bg-purple-500'
      },
      orange: {
        bg: 'bg-orange-500/20',
        text: 'text-orange-500',
        icon: 'bg-orange-500'
      },
      red: {
        bg: 'bg-red-500/20',
        text: 'text-red-500',
        icon: 'bg-red-500'
      },
      cyan: {
        bg: 'bg-cyan-500/20',
        text: 'text-cyan-500',
        icon: 'bg-cyan-500'
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const colors = getColorClasses(stat.color)
        
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition"
          >
            <div className="flex items-start justify-between mb-4">
              {/* Icon */}
              <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
                <i className={`fas ${stat.icon} text-white text-xl`}></i>
              </div>

              {/* Trend */}
              {stat.trend && (
                <span className={`text-xs font-medium flex items-center ${
                  stat.trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  <i className={`fas fa-arrow-${stat.trend.isPositive ? 'up' : 'down'} mr-1 text-xs`}></i>
                  {stat.trend.value}%
                </span>
              )}
            </div>

            {/* Value */}
            <div className="mb-1">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>

            {/* Title */}
            <p className="text-gray-400 text-sm">{stat.title}</p>
          </div>
        )
      })}
    </div>
  )
}