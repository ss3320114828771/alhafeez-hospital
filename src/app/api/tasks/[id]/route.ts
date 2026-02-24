// app/api/tasks/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

// ============================================
// TYPES
// ============================================

type RouteContext = {
  params: Promise<{ id: string }>
}

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

interface UpdateTaskRequest {
  title?: string
  description?: string
  status?: 'todo' | 'in-progress' | 'review' | 'done'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  assigneeId?: string
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
}

// ============================================
// MOCK DATA (shared - in real app, import from a shared file)
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

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

// ============================================
// GET /api/tasks/[id]
// ============================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { id } = await context.params

    const task = tasks.find(t => t.id === id)
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      task
    })

  } catch (error) {
    console.error('GET task error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// PUT /api/tasks/[id]
// ============================================

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { id } = await context.params
    const updates = await request.json() as UpdateTaskRequest

    const taskIndex = tasks.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    if (updates.title && updates.title.length < 3) {
      return NextResponse.json(
        { success: false, error: 'Title must be at least 3 characters' },
        { status: 400 }
      )
    }

    if (updates.dueDate && !isValidDate(updates.dueDate)) {
      return NextResponse.json(
        { success: false, error: 'Invalid due date' },
        { status: 400 }
      )
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (updates.status === 'done' && tasks[taskIndex].status !== 'done') {
      updatedTask.completedAt = new Date().toISOString()
    }

    tasks[taskIndex] = updatedTask

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      task: {
        id: updatedTask.id,
        title: updatedTask.title,
        status: updatedTask.status,
        updatedAt: updatedTask.updatedAt
      }
    })

  } catch (error) {
    console.error('PUT task error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// DELETE /api/tasks/[id]
// ============================================

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { id } = await context.params

    const taskIndex = tasks.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      )
    }

    tasks.splice(taskIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    })

  } catch (error) {
    console.error('DELETE task error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ============================================
// OPTIONS /api/tasks/[id]
// ============================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}