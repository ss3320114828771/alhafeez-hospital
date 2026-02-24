// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'

// ============================================
// TYPES
// ============================================

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  assigneeId: string
  projectId: string
  projectName: string
  dueDate: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  comments: number
  attachments: number
  tags: string[]
  estimatedHours: number
  actualHours: number
}

interface CreateTaskRequest {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigneeId: string
  projectId: string
  dueDate: string
  estimatedHours?: number
  tags?: string[]
}

// ============================================
// MOCK DATA
// ============================================

let tasks: Task[] = [
  {
    id: '1',
    title: 'Update patient records',
    description: 'Review and update patient medical records for the new system',
    status: 'todo',
    priority: 'high',
    assignee: 'Dr. Ahmed Khan',
    assigneeId: 'user1',
    projectId: 'proj1',
    projectName: 'Hospital Management System',
    dueDate: '2024-03-25',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    comments: 3,
    attachments: 2,
    tags: ['patients', 'records'],
    estimatedHours: 8,
    actualHours: 0
  },
  // ... باقی tasks
]

const validAssignees = [
  { id: 'user1', name: 'Dr. Ahmed Khan' },
  { id: 'user2', name: 'Dr. Fatima Ali' },
  { id: 'user3', name: 'Engineer Khan' },
  { id: 'user4', name: 'Nurse Sara' },
  { id: 'user5', name: 'HR Department' },
  { id: 'user6', name: 'Purchase Dept' }
]

const validProjects = [
  { id: 'proj1', name: 'Hospital Management System' },
  { id: 'proj2', name: 'New Wing Construction' },
  { id: 'proj3', name: 'Equipment Upgrade' },
  { id: 'proj4', name: 'Staff Training Program' }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

const verifyAuth = (request: NextRequest): { userId: string | null; error?: NextResponse } => {
  const token = request.cookies.get('auth-token')?.value
  
  if (!token) {
    return { 
      userId: null, 
      error: NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  try {
    const userId = Buffer.from(token, 'base64').toString().split('-')[0]
    return { userId }
  } catch {
    return { 
      userId: null, 
      error: NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }
  }
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

const validateTaskData = (data: Partial<CreateTaskRequest>): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (data.title && data.title.length < 3) {
    errors.push('Task title must be at least 3 characters')
  }

  if (data.description && data.description.length < 5) {
    errors.push('Description must be at least 5 characters')
  }

  if (data.dueDate && !isValidDate(data.dueDate)) {
    errors.push('Invalid due date')
  }

  if (data.dueDate) {
    const dueDate = new Date(data.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (dueDate < today) {
      errors.push('Due date cannot be in the past')
    }
  }

  if (data.estimatedHours && (data.estimatedHours < 0 || data.estimatedHours > 168)) {
    errors.push('Estimated hours must be between 0 and 168')
  }

  if (data.assigneeId && !validAssignees.some(a => a.id === data.assigneeId)) {
    errors.push('Invalid assignee')
  }

  if (data.projectId && !validProjects.some(p => p.id === data.projectId)) {
    errors.push('Invalid project')
  }

  return { valid: errors.length === 0, errors }
}

// ============================================
// GET /api/tasks
// ============================================

export async function GET(request: NextRequest) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const assigneeId = searchParams.get('assigneeId')
    const projectId = searchParams.get('projectId')
    const search = searchParams.get('search')
    const dueDate = searchParams.get('dueDate')
    const tags = searchParams.get('tags')?.split(',')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'dueDate'
    const sortOrder = searchParams.get('sortOrder') || 'asc'

    let filteredTasks = [...tasks]

    if (status) {
      filteredTasks = filteredTasks.filter(t => t.status === status)
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(t => t.priority === priority)
    }

    if (assigneeId) {
      filteredTasks = filteredTasks.filter(t => t.assigneeId === assigneeId)
    }

    if (projectId) {
      filteredTasks = filteredTasks.filter(t => t.projectId === projectId)
    }

    if (dueDate) {
      filteredTasks = filteredTasks.filter(t => t.dueDate === dueDate)
    }

    if (tags && tags.length > 0) {
      filteredTasks = filteredTasks.filter(t => 
        t.tags.some(tag => tags.includes(tag))
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredTasks = filteredTasks.filter(t => 
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.assignee.toLowerCase().includes(searchLower)
      )
    }

    filteredTasks.sort((a: any, b: any) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex)

    const summary = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'todo').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      review: tasks.filter(t => t.status === 'review').length,
      done: tasks.filter(t => t.status === 'done').length,
      urgent: tasks.filter(t => t.priority === 'urgent').length,
      high: tasks.filter(t => t.priority === 'high').length,
      overdue: tasks.filter(t => {
        const dueDate = new Date(t.dueDate)
        const today = new Date()
        return dueDate < today && t.status !== 'done'
      }).length,
      completedToday: tasks.filter(t => {
        const completedDate = t.completedAt ? new Date(t.completedAt) : null
        const today = new Date()
        return completedDate && completedDate.toDateString() === today.toDateString()
      }).length
    }

    return NextResponse.json({
      success: true,
      summary,
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total: filteredTasks.length,
        pages: Math.ceil(filteredTasks.length / limit)
      }
    })

  } catch (error) {
    console.error('GET tasks error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// POST /api/tasks
// ============================================

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error
    if (!auth.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json() as CreateTaskRequest
    const { title, description, priority, assigneeId, projectId, dueDate, estimatedHours, tags } = body

    if (!title || !description || !priority || !assigneeId || !projectId || !dueDate) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All required fields must be provided' 
        },
        { status: 400 }
      )
    }

    const validation = validateTaskData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validation.errors 
        },
        { status: 400 }
      )
    }

    const assignee = validAssignees.find(a => a.id === assigneeId)
    const project = validProjects.find(p => p.id === projectId)

    const newTask: Task = {
      id: generateId(),
      title,
      description,
      status: 'todo',
      priority,
      assignee: assignee?.name || 'Unknown',
      assigneeId,
      projectId,
      projectName: project?.name || 'Unknown Project',
      dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: 0,
      attachments: 0,
      tags: tags || [],
      estimatedHours: estimatedHours || 0,
      actualHours: 0
    }

    tasks.push(newTask)

    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      task: {
        id: newTask.id,
        title: newTask.title,
        status: newTask.status,
        dueDate: newTask.dueDate
      }
    }, { status: 201 })

  } catch (error) {
    console.error('POST task error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// PATCH /api/tasks/bulk
// ============================================

export async function PATCH(request: NextRequest) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { taskIds, updates } = await request.json()

    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Task IDs are required' },
        { status: 400 }
      )
    }

    const updatedTasks = []
    for (const taskId of taskIds) {
      const taskIndex = tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        tasks[taskIndex] = {
          ...tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        
        if (updates.status === 'done' && tasks[taskIndex].status !== 'done') {
          tasks[taskIndex].completedAt = new Date().toISOString()
        }
        
        updatedTasks.push(taskId)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedTasks.length} tasks`,
      updatedTasks
    })

  } catch (error) {
    console.error('PATCH tasks error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// OPTIONS /api/tasks
// ============================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}