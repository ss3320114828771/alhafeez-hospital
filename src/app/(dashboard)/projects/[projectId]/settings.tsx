'use client'

import { useState } from 'react'

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

interface SettingsProps {
  project: Project
  onUpdate: (updatedProject: Project) => void
}

export default function Settings({ project, onUpdate }: SettingsProps) {
  const [activeSection, setActiveSection] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    priority: project.priority,
    department: project.department,
    startDate: project.startDate,
    endDate: project.endDate,
    budget: project.budget,
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle save
  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const updatedProject = {
      ...project,
      ...formData,
      budget: Number(formData.budget)
    }
    
    onUpdate(updatedProject)
    setIsSaving(false)
  }

  // Handle delete project
  const handleDeleteProject = async () => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to projects list
    window.location.href = '/dashboard/projects'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Project Settings</h2>
        <p className="text-gray-400 text-sm">Manage your project configuration and preferences</p>
      </div>

      {/* Settings Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: 'fa-cog' },
          { id: 'team', label: 'Team', icon: 'fa-users' },
          { id: 'budget', label: 'Budget', icon: 'fa-dollar-sign' },
          { id: 'timeline', label: 'Timeline', icon: 'fa-calendar' },
          { id: 'danger', label: 'Danger Zone', icon: 'fa-exclamation-triangle' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className={`fas ${section.icon} text-sm`}></i>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        {activeSection === 'general' && (
          <GeneralSettings 
            formData={formData} 
            handleChange={handleChange} 
          />
        )}

        {activeSection === 'team' && (
          <TeamSettings 
            team={project.team} 
            onUpdate={onUpdate} 
            project={project}
          />
        )}

        {activeSection === 'budget' && (
          <BudgetSettings 
            formData={formData}
            spent={project.spent}
            handleChange={handleChange}
          />
        )}

        {activeSection === 'timeline' && (
          <TimelineSettings 
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {activeSection === 'danger' && (
          <DangerZone 
            showDeleteConfirm={showDeleteConfirm}
            setShowDeleteConfirm={setShowDeleteConfirm}
            handleDeleteProject={handleDeleteProject}
            isSaving={isSaving}
          />
        )}

        {/* Save Button (not shown in danger zone) */}
        {activeSection !== 'danger' && (
          <div className="flex justify-end mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// General Settings Component
function GeneralSettings({ formData, handleChange }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center">
        <i className="fas fa-cog text-blue-500 mr-2"></i>
        General Settings
      </h3>

      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter project name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter project description"
          />
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            placeholder="Enter department name"
          />
        </div>
      </div>
    </div>
  )
}

// Team Settings Component
function TeamSettings({ team, onUpdate, project }: any) {
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', role: '' })

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.role.trim()) return

    const updatedTeam = [
      ...team,
      {
        id: Date.now().toString(),
        name: newMember.name,
        role: newMember.role,
        avatar: '',
        tasks: 0
      }
    ]

    onUpdate({ ...project, team: updatedTeam })
    setNewMember({ name: '', role: '' })
    setShowAddMember(false)
  }

  const handleRemoveMember = (memberId: string) => {
    const updatedTeam = team.filter((m: TeamMember) => m.id !== memberId)
    onUpdate({ ...project, team: updatedTeam })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <i className="fas fa-users text-blue-500 mr-2"></i>
          Team Members
        </h3>
        <button
          onClick={() => setShowAddMember(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Member
        </button>
      </div>

      {/* Team List */}
      <div className="space-y-3">
        {team.map((member: TeamMember) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{member.name}</h4>
                <p className="text-gray-400 text-xs">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400">{member.tasks} tasks</span>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="text-gray-500 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Add Team Member</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="Enter member name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Role</label>
                <input
                  type="text"
                  value={newMember.role}
                  onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="Enter member role"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Budget Settings Component
function BudgetSettings({ formData, spent, handleChange }: any) {
  const budgetPercentage = (spent / formData.budget) * 100

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center">
        <i className="fas fa-dollar-sign text-green-500 mr-2"></i>
        Budget Settings
      </h3>

      <div className="space-y-4">
        {/* Total Budget */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Total Budget ($)
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
            step="1000"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Budget Overview */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-white text-sm font-medium mb-3">Budget Overview</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Budget:</span>
              <span className="text-white font-medium">${formData.budget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Spent:</span>
              <span className="text-white font-medium">${spent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Remaining:</span>
              <span className={`font-medium ${formData.budget - spent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${(formData.budget - spent).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Budget Used</span>
              <span>{budgetPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  budgetPercentage > 90 ? 'bg-red-500' :
                  budgetPercentage > 70 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Timeline Settings Component
function TimelineSettings({ formData, handleChange }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white flex items-center">
        <i className="fas fa-calendar text-purple-500 mr-2"></i>
        Timeline Settings
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Timeline Info */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white text-sm font-medium mb-3">Project Duration</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Days:</span>
            <span className="text-white">
              {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Days Remaining:</span>
            <span className="text-white">
              {Math.max(0, Math.ceil((new Date(formData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Danger Zone Component
function DangerZone({ showDeleteConfirm, setShowDeleteConfirm, handleDeleteProject, isSaving }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-red-500 flex items-center">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        Danger Zone
      </h3>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
        <h4 className="text-white font-medium mb-2">Delete Project</h4>
        <p className="text-gray-400 text-sm mb-4">
          Once you delete this project, all associated data will be permanently removed. This action cannot be undone.
        </p>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Project
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-red-400 text-sm font-medium">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteProject}
                disabled={isSaving}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Yes, Delete Project'
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}