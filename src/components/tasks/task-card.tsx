'use client'

import { useState } from 'react'

interface TaskCardProps {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  comments?: number
  attachments?: number
  onStatusChange?: (id: string, status: string) => void
  onDelete?: (id: string) => void
  onClick?: () => void
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  comments = 0,
  attachments = 0,
  onStatusChange,
  onDelete,
  onClick
}: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Get priority color and icon
  const getPriorityInfo = (priority: string) => {
    const priorities = {
      low: {
        color: 'bg-green-500',
        textColor: 'text-green-500',
        bgColor: 'bg-green-500/20',
        icon: 'fa-arrow-down',
        label: 'Low'
      },
      medium: {
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        bgColor: 'bg-blue-500/20',
        icon: 'fa-minus',
        label: 'Medium'
      },
      high: {
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        bgColor: 'bg-orange-500/20',
        icon: 'fa-arrow-up',
        label: 'High'
      },
      urgent: {
        color: 'bg-red-500',
        textColor: 'text-red-500',
        bgColor: 'bg-red-500/20',
        icon: 'fa-exclamation',
        label: 'Urgent'
      }
    }
    return priorities[priority as keyof typeof priorities] || priorities.medium
  }

  // Get status color
  const getStatusColor = (status: string) => {
    const statuses = {
      'todo': 'bg-gray-500',
      'in-progress': 'bg-blue-500',
      'review': 'bg-yellow-500',
      'done': 'bg-green-500'
    }
    return statuses[status as keyof typeof statuses] || 'bg-gray-500'
  }

  // Get status label
  const getStatusLabel = (status: string) => {
    const labels = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'review': 'Review',
      'done': 'Done'
    }
    return labels[status as keyof typeof labels] || status
  }

  // Format due date
  const formatDueDate = (date: string) => {
    const dueDate = new Date(date)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return 'Overdue'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days left`
  }

  // Check if task is overdue
  const isOverdue = () => {
    const dueDateObj = new Date(dueDate)
    const today = new Date()
    return dueDateObj < today && status !== 'done'
  }

  const priorityInfo = getPriorityInfo(priority)
  const statusColor = getStatusColor(status)
  const dueDateText = formatDueDate(dueDate)
  const overdue = isOverdue()

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete?.(id)
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <div
      className="bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition group"
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          {/* Title and Priority */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${priorityInfo.color}`}></span>
              <h3
                className="text-white font-medium text-sm cursor-pointer hover:text-blue-400 transition"
                onClick={onClick}
              >
                {title}
              </h3>
            </div>
            <p className="text-gray-400 text-xs line-clamp-2">{description}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 ml-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-500 hover:text-gray-300 transition"
              aria-label="Toggle details"
            >
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-xs`}></i>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-500 hover:text-red-500 transition relative"
              aria-label="Delete task"
            >
              <i className="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-xs mb-2">Delete this task?</p>
            <div className="flex space-x-2">
              <button
                onClick={handleDelete}
                className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-2 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600 transition"
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Basic Info Row */}
        <div className="flex items-center justify-between mt-3">
          {/* Assignee */}
          <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-medium">
                {assignee.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <span className="text-gray-400 text-xs">{assignee.split(' ')[0]}</span>
          </div>

          {/* Due Date */}
          <div className={`flex items-center space-x-1 text-xs ${
            overdue ? 'text-red-400' : 'text-gray-400'
          }`}>
            <i className={`fas fa-calendar ${overdue ? 'text-red-400' : ''}`}></i>
            <span>{dueDateText}</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-700">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">Status:</span>
              <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                status === 'todo' ? 'bg-gray-500/20 text-gray-300' :
                status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                status === 'review' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-green-500/20 text-green-300'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusColor} mr-1.5`}></span>
                {getStatusLabel(status)}
              </span>
            </div>

            {/* Priority Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">Priority:</span>
              <span className={`flex items-center px-2 py-1 rounded-full text-xs ${priorityInfo.bgColor} ${priorityInfo.textColor}`}>
                <i className={`fas ${priorityInfo.icon} mr-1 text-xs`}></i>
                {priorityInfo.label}
              </span>
            </div>

            {/* Full Description */}
            <div className="mb-3">
              <span className="text-gray-400 text-xs block mb-1">Description:</span>
              <p className="text-gray-300 text-xs bg-gray-700/50 p-2 rounded">
                {description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center">
                <i className="far fa-comment mr-1"></i>
                {comments} comments
              </span>
              <span className="flex items-center">
                <i className="far fa-paperclip mr-1"></i>
                {attachments} files
              </span>
            </div>

            {/* Status Change Buttons */}
            {onStatusChange && status !== 'done' && (
              <div className="mt-3 grid grid-cols-3 gap-1">
                {status !== 'todo' && (
                  <button
                    onClick={() => onStatusChange(id, 'todo')}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600 transition"
                  >
                    ← To Do
                  </button>
                )}
                {status !== 'in-progress' && (
                  <button
                    onClick={() => onStatusChange(id, 'in-progress')}
                    className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded hover:bg-blue-600/30 transition"
                  >
                    In Progress
                  </button>
                )}
                {status !== 'review' && (
                  <button
                    onClick={() => onStatusChange(id, 'review')}
                    className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded hover:bg-yellow-600/30 transition"
                  >
                    Review
                  </button>
                )}
                <button
                  onClick={() => onStatusChange(id, 'done')}
                  className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded hover:bg-green-600/30 transition"
                >
                  Done ✓
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer (only visible when not expanded) */}
      {!isExpanded && (
        <div className="px-4 py-2 bg-gray-800/80 border-t border-gray-700 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className={`flex items-center ${priorityInfo.textColor}`}>
              <i className={`fas ${priorityInfo.icon} mr-1`}></i>
              {priorityInfo.label}
            </span>
            <span className="flex items-center text-gray-400">
              <i className="far fa-clock mr-1"></i>
              {dueDateText}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {comments > 0 && (
              <span className="text-gray-400">
                <i className="far fa-comment mr-1"></i>
                {comments}
              </span>
            )}
            {attachments > 0 && (
              <span className="text-gray-400">
                <i className="far fa-paperclip mr-1"></i>
                {attachments}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}