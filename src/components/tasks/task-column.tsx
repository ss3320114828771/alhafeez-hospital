'use client'

import { useState } from 'react'
import TaskCard from './task-card'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  comments?: number
  attachments?: number
}

interface TaskColumnProps {
  title: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  tasks: Task[]
  icon: string
  color: string
  onTaskMove?: (taskId: string, newStatus: string) => void
  onTaskClick?: (taskId: string) => void
  onTaskDelete?: (taskId: string) => void
  onAddTask?: () => void
}

export default function TaskColumn({
  title,
  status,
  tasks,
  icon,
  color,
  onTaskMove,
  onTaskClick,
  onTaskDelete,
  onAddTask
}: TaskColumnProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [showTaskLimit, setShowTaskLimit] = useState(false)

  // Get column color classes
  const getColumnColors = () => {
    const colors = {
      todo: {
        bg: 'from-gray-600 to-gray-700',
        border: 'border-gray-600',
        text: 'text-gray-400',
        icon: 'text-gray-400'
      },
      'in-progress': {
        bg: 'from-blue-600 to-blue-700',
        border: 'border-blue-600',
        text: 'text-blue-400',
        icon: 'text-blue-400'
      },
      review: {
        bg: 'from-yellow-600 to-orange-600',
        border: 'border-yellow-600',
        text: 'text-yellow-400',
        icon: 'text-yellow-400'
      },
      done: {
        bg: 'from-green-600 to-emerald-600',
        border: 'border-green-600',
        text: 'text-green-400',
        icon: 'text-green-400'
      }
    }
    return colors[status] || colors.todo
  }

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId && onTaskMove) {
      onTaskMove(taskId, status)
    }
  }

  // Calculate task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' || t.priority === 'urgent').length
  const overdueTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate)
    const today = new Date()
    return dueDate < today && t.status !== 'done'
  }).length

  const columnColors = getColumnColors()

  return (
    <div
      className={`flex flex-col h-full rounded-xl border ${
        isDraggingOver ? 'border-blue-500 bg-blue-500/10' : columnColors.border
      } transition-colors`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`p-4 rounded-t-xl bg-gradient-to-r ${columnColors.bg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className={`fas ${icon} text-white`}></i>
            <h3 className="font-semibold text-white">{title}</h3>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          
          {/* Add Task Button */}
          {onAddTask && status === 'todo' && (
            <button
              onClick={onAddTask}
              className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
              aria-label="Add task"
            >
              <i className="fas fa-plus text-white text-xs"></i>
            </button>
          )}
        </div>

        {/* Column Stats */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-white text-sm font-medium">{totalTasks}</div>
            <div className="text-white/60 text-[10px]">Total</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <div className="text-white text-sm font-medium">{highPriorityTasks}</div>
            <div className="text-white/60 text-[10px]">High Priority</div>
          </div>
          {status === 'done' ? (
            <div className="bg-white/10 rounded-lg p-2 text-center col-span-2">
              <div className="text-white text-sm font-medium">{completedTasks}</div>
              <div className="text-white/60 text-[10px]">Completed</div>
            </div>
          ) : (
            <div className="bg-white/10 rounded-lg p-2 text-center col-span-2">
              <div className="text-white text-sm font-medium">{overdueTasks}</div>
              <div className="text-white/60 text-[10px]">Overdue</div>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[500px]">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className={`fas ${icon} text-gray-600 text-2xl`}></i>
            </div>
            <p className="text-gray-500 text-sm mb-2">No tasks</p>
            <p className="text-gray-600 text-xs">Drag tasks here or add new</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('taskId', task.id)
              }}
              className="cursor-move"
            >
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                assignee={task.assignee}
                dueDate={task.dueDate}
                comments={task.comments}
                attachments={task.attachments}
                onStatusChange={onTaskMove}
                onDelete={onTaskDelete}
                onClick={() => onTaskClick?.(task.id)}
              />
            </div>
          ))
        )}

        {/* Task Limit Warning */}
        {showTaskLimit && tasks.length >= 10 && (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400 text-xs flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Task limit reached (10). Move or complete some tasks.
            </p>
          </div>
        )}
      </div>

      {/* Column Footer */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Progress</span>
          <span>{tasks.filter(t => t.status === 'done').length}/{tasks.length}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-700 rounded-full mt-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${columnColors.bg} rounded-full transition-all duration-500`}
            style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'done').length / tasks.length) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}