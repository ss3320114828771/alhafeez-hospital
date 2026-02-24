'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Board from './board'
import Settings from './settings'

// Types
interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'on-hold'
  progress: number
  startDate: string
  endDate: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  department: string
  budget: number
  spent: number
  team: TeamMember[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  tasks: number
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  
  const [activeTab, setActiveTab] = useState<'overview' | 'board' | 'settings'>('overview')
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load project data
  useEffect(() => {
    loadProjectData()
  }, [projectId])

  const loadProjectData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock project data for Alhafeez Hospital
      const mockProject: Project = {
        id: projectId,
        name: projectId === '1' ? 'Hospital Management System' :
              projectId === '2' ? 'New Wing Construction' :
              projectId === '3' ? 'Equipment Upgrade' :
              'Staff Training Program',
        description: 'Managing healthcare projects with modern technology and efficient team collaboration.',
        status: 'active',
        progress: 65,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        priority: 'high',
        department: 'IT Department',
        budget: 250000,
        spent: 162500,
        team: [
          { id: '1', name: 'Dr. Ahmed Khan', role: 'Project Lead', avatar: '', tasks: 12 },
          { id: '2', name: 'Fatima Ali', role: 'Developer', avatar: '', tasks: 23 },
          { id: '3', name: 'Muhammad Usman', role: 'QA Engineer', avatar: '', tasks: 15 },
          { id: '4', name: 'Sara Ahmed', role: 'UI/UX Designer', avatar: '', tasks: 8 },
          { id: '5', name: 'Omar Hassan', role: 'Database Admin', avatar: '', tasks: 10 }
        ]
      }
      
      setProject(mockProject)
    } catch (err) {
      setError('Failed to load project data')
    } finally {
      setLoading(false)
    }
  }

  // Handle project update from settings
  const handleProjectUpdate = (updatedProject: Project) => {
    setProject(updatedProject)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'on-hold': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-500 bg-red-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/20'
      case 'medium': return 'text-blue-500 bg-blue-500/20'
      case 'low': return 'text-green-500 bg-green-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  // Show loading skeleton
  if (loading) {
    return <ProjectLoadingSkeleton />
  }

  // Show error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Error Loading Project</h2>
          <p className="text-gray-400 mb-6">{error || 'Project not found'}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={loadProjectData}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <i className="fas fa-redo mr-2"></i>
              Try Again
            </button>
            <Link
              href="/dashboard/projects"
              className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Section */}
      <div className="border-b border-white/10 bg-gray-900/95 backdrop-blur-lg sticky top-0 z-40">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <Link href="/dashboard/projects" className="hover:text-white transition">
              Projects
            </Link>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <span className="text-white truncate max-w-[200px]">{project.name}</span>
          </div>

          {/* Project Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start space-x-4">
              {/* Project Icon */}
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <i className="fas fa-project-diagram text-white text-2xl"></i>
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white truncate">
                    {project.name}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
                  </span>
                  <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-2 animate-pulse`}></span>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm max-w-2xl line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => window.navigator.share?.({ title: project.name, text: project.description })}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm flex items-center"
              >
                <i className="fas fa-share-alt mr-2"></i>
                Share
              </button>
              <button
                onClick={() => {/* Export functionality */}}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm flex items-center"
              >
                <i className="fas fa-download mr-2"></i>
                Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 mt-6 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
              { id: 'board', label: 'Board', icon: 'fa-columns' },
              { id: 'settings', label: 'Settings', icon: 'fa-cog' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 px-1 py-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                <i className={`fas ${tab.icon} text-sm`}></i>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-6 py-8">
        {activeTab === 'overview' && (
          <ProjectOverview project={project} />
        )}
        
        {activeTab === 'board' && (
          <Board projectId={projectId} />
        )}
        
        {activeTab === 'settings' && (
          <Settings project={project} onUpdate={handleProjectUpdate} />
        )}
      </div>
    </div>
  )
}

// Project Overview Component
function ProjectOverview({ project }: { project: Project }) {
  // Calculate days remaining
  const daysRemaining = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  // Calculate budget percentage
  const budgetPercentage = (project.spent / project.budget) * 100

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm">Progress</h3>
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-chart-line text-blue-500"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">{project.progress}%</div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm">Timeline</h3>
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar text-purple-500"></i>
            </div>
          </div>
          <div className="text-sm text-white mb-1">
            {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
          </div>
        </div>

        {/* Budget Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm">Budget</h3>
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-dollar-sign text-green-500"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${(project.spent / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-gray-400">
            of ${(project.budget / 1000).toFixed(1)}K ({budgetPercentage.toFixed(1)}%)
          </div>
        </div>

        {/* Team Card */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm">Team Size</h3>
            <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-orange-500"></i>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{project.team.length}</div>
          <div className="text-xs text-gray-400">Active members</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Section */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <i className="fas fa-users text-blue-500 mr-2"></i>
            Team Members
          </h3>
          <div className="space-y-4">
            {project.team.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition group">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-medium text-sm truncate">{member.name}</h4>
                    <p className="text-gray-400 text-xs">{member.role}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <span className="text-white text-sm font-medium">{member.tasks}</span>
                  <p className="text-gray-400 text-xs">tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <i className="fas fa-clock text-purple-500 mr-2"></i>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { action: 'Task completed: Update patient records', time: '2 hours ago', icon: 'fa-check-circle', color: 'text-green-500' },
              { action: 'New team member added: Dr. Sarah', time: '5 hours ago', icon: 'fa-user-plus', color: 'text-blue-500' },
              { action: 'Project milestone reached: 65%', time: '1 day ago', icon: 'fa-trophy', color: 'text-yellow-500' },
              { action: 'Budget updated: +$25,000', time: '2 days ago', icon: 'fa-dollar-sign', color: 'text-green-500' }
            ].map((activity, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className={`w-8 h-8 ${activity.color.replace('text', 'bg')}/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <i className={`fas ${activity.icon} ${activity.color} text-xs`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <i className="fas fa-info-circle text-green-500 mr-2"></i>
          Project Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-400 text-sm mb-2">Department</p>
            <p className="text-white">{project.department}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Project ID</p>
            <p className="text-white font-mono">{project.id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Start Date</p>
            <p className="text-white">{new Date(project.startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">End Date</p>
            <p className="text-white">{new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton Component
function ProjectLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Skeleton */}
      <div className="border-b border-white/10 p-6">
        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="h-4 bg-white/10 rounded w-48 animate-pulse"></div>
          
          {/* Title and Actions */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-8 bg-white/10 rounded w-96 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-64 animate-pulse"></div>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="h-10 bg-white/10 rounded w-24 animate-pulse"></div>
              <div className="h-10 bg-white/10 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-white/10 rounded w-24 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-6 py-8 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white/5 rounded-xl p-6">
              <div className="h-4 bg-white/10 rounded w-24 mb-4 animate-pulse"></div>
              <div className="h-8 bg-white/10 rounded w-32 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 rounded-xl p-6">
            <div className="h-6 bg-white/10 rounded w-32 mb-4 animate-pulse"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-white/10 rounded mb-3 animate-pulse"></div>
            ))}
          </div>
          <div className="bg-white/5 rounded-xl p-6">
            <div className="h-6 bg-white/10 rounded w-32 mb-4 animate-pulse"></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-white/10 rounded mb-3 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}