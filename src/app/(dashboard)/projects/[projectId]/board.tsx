'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Types
interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  comments: number
  attachments: number
}

interface Column {
  id: string
  title: string
  status: Task['status']
  color: string
  icon: string
}

export default function Board({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority']
  })

  // Columns configuration
  const columns: Column[] = [
    { id: 'todo', title: 'To Do', status: 'todo', color: 'from-gray-500 to-gray-600', icon: 'fa-circle' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'from-blue-500 to-blue-600', icon: 'fa-spinner' },
    { id: 'review', title: 'Review', status: 'review', color: 'from-yellow-500 to-orange-500', icon: 'fa-eye' },
    { id: 'done', title: 'Done', status: 'done', color: 'from-green-500 to-emerald-500', icon: 'fa-check-circle' }
  ]

  // Load tasks
  useEffect(() => {
    loadTasks()
  }, [projectId])

  const loadTasks = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Update patient records',
          description: 'Review and update patient medical records for the new system',
          status: 'todo',
          priority: 'high',
          assignee: 'Dr. Ahmed',
          dueDate: '2024-03-25',
          comments: 3,
          attachments: 2
        },
        {
          id: '2',
          title: 'Schedule MRI machine maintenance',
          description: 'Coordinate with technical team for quarterly maintenance',
          status: 'in-progress',
          priority: 'urgent',
          assignee: 'Engineer Khan',
          dueDate: '2024-03-20',
          comments: 5,
          attachments: 1
        },
        {
          id: '3',
          title: 'Review lab results',
          description: 'Verify and approve pending lab reports',
          status: 'review',
          priority: 'medium',
          assignee: 'Dr. Fatima',
          dueDate: '2024-03-22',
          comments: 2,
          attachments: 4
        },
        {
          id: '4',
          title: 'Staff training completed',
          description: 'New staff orientation and training session',
          status: 'done',
          priority: 'low',
          assignee: 'HR Department',
          dueDate: '2024-03-18',
          comments: 8,
          attachments: 0
        },
        {
          id: '5',
          title: 'Order medical supplies',
          description: 'Place order for surgical equipment and medicines',
          status: 'todo',
          priority: 'high',
          assignee: 'Purchase Dept',
          dueDate: '2024-03-26',
          comments: 1,
          attachments: 3
        },
        {
          id: '6',
          title: 'Patient feedback analysis',
          description: 'Compile and analyze monthly patient feedback',
          status: 'in-progress',
          priority: 'medium',
          assignee: 'Quality Dept',
          dueDate: '2024-03-23',
          comments: 4,
          attachments: 2
        }
      ]
      setTasks(mockTasks)
      setLoading(false)
    }, 1000)
  }

  // Filter tasks based on search and priority
  const getFilteredTasks = (status: Task['status']) => {
    return tasks.filter(task => {
      const matchesStatus = task.status === status
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
      return matchesStatus && matchesSearch && matchesPriority
    })
  }

  // Handle drag and drop
  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (newStatus: Task['status']) => {
    if (draggedTask) {
      setTasks(prev => prev.map(task => 
        task.id === draggedTask ? { ...task, status: newStatus } : task
      ))
      setDraggedTask(null)
    }
  }

  // Get priority color
  const getPriorityColor = (priority: Task['priority']) => {
    switch(priority) {
      case 'low': return 'bg-gray-500'
      case 'medium': return 'bg-blue-500'
      case 'high': return 'bg-orange-500'
      case 'urgent': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  // Get priority icon
  const getPriorityIcon = (priority: Task['priority']) => {
    switch(priority) {
      case 'low': return 'fa-arrow-down'
      case 'medium': return 'fa-minus'
      case 'high': return 'fa-arrow-up'
      case 'urgent': return 'fa-exclamation'
      default: return 'fa-circle'
    }
  }

  // Add new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      assignee: 'Current User',
      dueDate: new Date().toISOString().split('T')[0],
      comments: 0,
      attachments: 0
    }

    setTasks(prev => [task, ...prev])
    setNewTask({ title: '', description: '', priority: 'medium' })
    setShowAddTask(false)
  }

  if (loading) {
    return <BoardSkeleton />
  }

  return (
    <div className="h-full flex flex-col">
      {/* Board Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Project Board</h2>
          <p className="text-gray-400 text-sm">Manage and track project tasks</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* Add Task Button */}
          <button
            onClick={() => setShowAddTask(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Task
          </button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
        {columns.map(column => (
          <div
            key={column.id}
            className="bg-white/5 rounded-xl border border-white/10 flex flex-col h-full"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.status)}
          >
            {/* Column Header */}
            <div className={`p-4 rounded-t-xl bg-gradient-to-r ${column.color}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className={`fas ${column.icon} text-white text-sm`}></i>
                  <h3 className="font-semibold text-white">{column.title}</h3>
                </div>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {getFilteredTasks(column.status).length}
                </span>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[600px]">
              {getFilteredTasks(column.status).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 cursor-move hover:border-blue-500/50 hover:shadow-lg transition-all group"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm line-clamp-2 flex-1">
                      {task.title}
                    </h4>
                    <span className={`ml-2 w-2 h-2 rounded-full ${getPriorityColor(task.priority)} animate-pulse`}></span>
                  </div>

                  {/* Task Description */}
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  {/* Task Meta */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-gray-500">
                        <i className="fas fa-user mr-1 text-blue-400"></i>
                        <span className="text-gray-300">{task.assignee}</span>
                      </span>
                      <span className="flex items-center text-gray-500">
                        <i className="far fa-calendar mr-1 text-purple-400"></i>
                        <span className="text-gray-300">{new Date(task.dueDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-gray-500 text-xs">
                        <i className="far fa-comment mr-1"></i>
                        {task.comments}
                      </span>
                      <span className="flex items-center text-gray-500 text-xs">
                        <i className="far fa-paperclip mr-1"></i>
                        {task.attachments}
                      </span>
                    </div>
                    
                    {/* Priority Badge */}
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-opacity-20 flex items-center ${
                      task.priority === 'urgent' ? 'bg-red-500 text-red-300' :
                      task.priority === 'high' ? 'bg-orange-500 text-orange-300' :
                      task.priority === 'medium' ? 'bg-blue-500 text-blue-300' :
                      'bg-gray-500 text-gray-300'
                    }`}>
                      <i className={`fas ${getPriorityIcon(task.priority)} mr-1 text-xs`}></i>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {getFilteredTasks(column.status).length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`fas ${column.icon} text-gray-500`}></i>
                  </div>
                  <p className="text-gray-500 text-sm">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Add New Task</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Loading Skeleton Component
function BoardSkeleton() {
  return (
    <div className="h-full">
      {/* Header Skeleton */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="h-8 bg-white/10 rounded-lg w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded-lg w-64 animate-pulse"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-white/10 rounded-lg w-64 animate-pulse"></div>
          <div className="h-10 bg-white/10 rounded-lg w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Columns Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(col => (
          <div key={col} className="bg-white/5 rounded-xl p-4">
            <div className="h-6 bg-white/10 rounded-lg w-24 mb-4 animate-pulse"></div>
            {[1, 2, 3].map(task => (
              <div key={task} className="bg-white/10 rounded-lg p-3 mb-3">
                <div className="h-4 bg-white/20 rounded-lg w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-white/20 rounded-lg w-full mb-2 animate-pulse"></div>
                <div className="h-3 bg-white/20 rounded-lg w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}