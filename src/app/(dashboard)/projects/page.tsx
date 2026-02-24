'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  teamCount: number
  tasks: {
    total: number
    completed: number
  }
  budget: {
    total: number
    spent: number
  }
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  // Load projects
  useEffect(() => {
    loadProjects()
  }, [])

  // Filter projects when filters change
  useEffect(() => {
    filterProjects()
  }, [searchTerm, statusFilter, priorityFilter, projects])

  const loadProjects = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock projects data for Alhafeez Hospital
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Hospital Management System',
        description: 'Complete overhaul of the hospital management system including patient records, billing, and scheduling modules.',
        status: 'active',
        progress: 65,
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        priority: 'high',
        department: 'IT Department',
        teamCount: 8,
        tasks: {
          total: 45,
          completed: 29
        },
        budget: {
          total: 250000,
          spent: 162500
        }
      },
      {
        id: '2',
        name: 'New Wing Construction',
        description: 'Construction of new patient wing with 50 additional beds and modern facilities.',
        status: 'active',
        progress: 35,
        startDate: '2024-02-01',
        endDate: '2024-12-31',
        priority: 'critical',
        department: 'Infrastructure',
        teamCount: 15,
        tasks: {
          total: 120,
          completed: 42
        },
        budget: {
          total: 1500000,
          spent: 525000
        }
      },
      {
        id: '3',
        name: 'Equipment Upgrade',
        description: 'Upgrading MRI, CT scan, and X-ray machines to latest technology.',
        status: 'on-hold',
        progress: 20,
        startDate: '2024-03-10',
        endDate: '2024-08-15',
        priority: 'high',
        department: 'Radiology',
        teamCount: 6,
        tasks: {
          total: 30,
          completed: 6
        },
        budget: {
          total: 800000,
          spent: 160000
        }
      },
      {
        id: '4',
        name: 'Staff Training Program',
        description: 'Comprehensive training program for medical and administrative staff.',
        status: 'active',
        progress: 80,
        startDate: '2024-01-05',
        endDate: '2024-04-30',
        priority: 'medium',
        department: 'HR Department',
        teamCount: 4,
        tasks: {
          total: 25,
          completed: 20
        },
        budget: {
          total: 150000,
          spent: 120000
        }
      },
      {
        id: '5',
        name: 'Telemedicine Platform',
        description: 'Development of telemedicine platform for remote consultations.',
        status: 'completed',
        progress: 100,
        startDate: '2023-09-01',
        endDate: '2024-02-28',
        priority: 'high',
        department: 'IT Department',
        teamCount: 7,
        tasks: {
          total: 60,
          completed: 60
        },
        budget: {
          total: 300000,
          spent: 285000
        }
      },
      {
        id: '6',
        name: 'Quality Assurance Program',
        description: 'Implementation of hospital-wide quality assurance and patient safety program.',
        status: 'active',
        progress: 45,
        startDate: '2024-02-15',
        endDate: '2024-07-31',
        priority: 'high',
        department: 'Quality Dept',
        teamCount: 5,
        tasks: {
          total: 40,
          completed: 18
        },
        budget: {
          total: 200000,
          spent: 90000
        }
      }
    ]
    
    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
    setLoading(false)
  }

  // Filter projects
  const filterProjects = () => {
    let filtered = [...projects]
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(project => project.priority === priorityFilter)
    }
    
    setFilteredProjects(filtered)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPriorityFilter('all')
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

  // Get priority icon
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'critical': return 'fa-exclamation-circle'
      case 'high': return 'fa-arrow-up'
      case 'medium': return 'fa-minus'
      case 'low': return 'fa-arrow-down'
      default: return 'fa-circle'
    }
  }

  // Navigate to project details
  const goToProject = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`)
  }

  if (loading) {
    return <ProjectsLoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-gray-900/95 backdrop-blur-lg sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Projects</h1>
              <p className="text-gray-400 text-sm">Manage and track all hospital projects</p>
            </div>
            
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center self-start"
            >
              <i className="fas fa-plus mr-2"></i>
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="fas fa-grid-2 mr-1"></i>
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="fas fa-list mr-1"></i>
              List
            </button>
          </div>

          {/* Clear Filters */}
          {(searchTerm || statusFilter !== 'all' || priorityFilter !== 'all') && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              <i className="fas fa-times mr-1"></i>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="px-6 py-3">
        <p className="text-sm text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* Projects Grid/List */}
      <div className="px-6 py-4">
        {filteredProjects.length === 0 ? (
          <EmptyState onClearFilters={clearFilters} />
        ) : (
          viewMode === 'grid' ? (
            <ProjectsGridView projects={filteredProjects} onProjectClick={goToProject} />
          ) : (
            <ProjectsListView projects={filteredProjects} onProjectClick={goToProject} />
          )
        )}
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <NewProjectModal 
          onClose={() => setShowNewProjectModal(false)}
          onProjectCreated={() => {
            setShowNewProjectModal(false)
            loadProjects()
          }}
        />
      )}
    </div>
  )
}

// Projects Grid View
function ProjectsGridView({ projects, onProjectClick }: { projects: Project[], onProjectClick: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project.id)}
          className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer group"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <i className="fas fa-project-diagram text-white text-xl"></i>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${(project.priority)}`}>
              <i className={`fas ${(project.priority)} mr-1 text-xs`}></i>
              {project.priority}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{project.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <span className="flex items-center text-gray-400">
                <i className="fas fa-users mr-1 text-blue-400"></i>
                {project.teamCount}
              </span>
              <span className="flex items-center text-gray-400">
                <i className="fas fa-tasks mr-1 text-purple-400"></i>
                {project.tasks.completed}/{project.tasks.total}
              </span>
            </div>
            <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
              project.status === 'active' ? 'bg-green-500/20 text-green-400' :
              project.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${(project.status)} mr-1 animate-pulse`}></span>
              {project.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Projects List View
function ProjectsListView({ projects, onProjectClick }: { projects: Project[], onProjectClick: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project.id)}
          className="bg-white/5 rounded-lg border border-white/10 p-4 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-project-diagram text-white text-sm"></i>
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h3 className="text-white font-medium">{project.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${(project.priority)}`}>
                    <i className={`fas ${(project.priority)} mr-1 text-xs`}></i>
                    {project.priority}
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-1">{project.description}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6 ml-14 lg:ml-0">
              {/* Progress */}
              <div className="w-32">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-3 text-sm">
                <span className="flex items-center text-gray-400">
                  <i className="fas fa-users mr-1 text-blue-400"></i>
                  {project.teamCount}
                </span>
                <span className="flex items-center text-gray-400">
                  <i className="fas fa-tasks mr-1 text-purple-400"></i>
                  {project.tasks.completed}/{project.tasks.total}
                </span>
              </div>

              {/* Status */}
              <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                project.status === 'active' ? 'bg-green-500/20 text-green-400' :
                project.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${(project.status)} mr-1 animate-pulse`}></span>
                {project.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Empty State Component
function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="fas fa-search text-gray-500 text-3xl"></i>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
      <p className="text-gray-400 mb-6">Try adjusting your filters or create a new project</p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
      >
        Clear Filters
      </button>
    </div>
  )
}

// New Project Modal
function NewProjectModal({ onClose, onProjectCreated }: { onClose: () => void, onProjectCreated: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    priority: 'medium',
    startDate: '',
    endDate: '',
    budget: ''
  })
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onProjectCreated()
    setIsCreating(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Create New Project</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter department"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Budget ($)
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter budget"
                min="0"
                step="1000"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton
function ProjectsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Skeleton */}
      <div className="border-b border-white/10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-white/10 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-white/10 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="p-6 border-b border-white/10">
        <div className="flex gap-4">
          <div className="h-10 bg-white/10 rounded flex-1 animate-pulse"></div>
          <div className="h-10 bg-white/10 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-white/10 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-white/10 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white/5 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl animate-pulse"></div>
                <div className="w-16 h-6 bg-white/10 rounded-full animate-pulse"></div>
              </div>
              <div className="h-5 bg-white/10 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-full mb-1 animate-pulse"></div>
              <div className="h-4 bg-white/10 rounded w-2/3 mb-4 animate-pulse"></div>
              <div className="h-2 bg-white/10 rounded w-full mb-4 animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-white/10 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}