import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

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
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface CreateProjectRequest {
  name: string
  description: string
  department: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  budget: number
}

interface UpdateProjectRequest {
  name?: string
  description?: string
  status?: 'active' | 'completed' | 'on-hold'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  department?: string
  startDate?: string
  endDate?: string
  budget?: number
}

// Mock projects database
let projects: Project[] = [
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
    },
    createdBy: 'user1',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
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
    },
    createdBy: 'user1',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
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
    },
    createdBy: 'user2',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
]

// Helper function to verify authentication
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
    // Decode token (in production, verify JWT)
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

// Helper function to generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Helper function to validate date
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

// Helper function to validate project data
const validateProjectData = (data: Partial<CreateProjectRequest>): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (data.name && data.name.length < 3) {
    errors.push('Project name must be at least 3 characters')
  }

  if (data.description && data.description.length < 10) {
    errors.push('Description must be at least 10 characters')
  }

  if (data.startDate && !isValidDate(data.startDate)) {
    errors.push('Invalid start date')
  }

  if (data.endDate && !isValidDate(data.endDate)) {
    errors.push('Invalid end date')
  }

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    if (start > end) {
      errors.push('End date must be after start date')
    }
  }

  if (data.budget && data.budget < 0) {
    errors.push('Budget cannot be negative')
  }

  return { valid: errors.length === 0, errors }
}

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const department = searchParams.get('department')
    const search = searchParams.get('search')

    // Filter projects
    let filteredProjects = [...projects]

    if (status) {
      filteredProjects = filteredProjects.filter(p => p.status === status)
    }

    if (priority) {
      filteredProjects = filteredProjects.filter(p => p.priority === priority)
    }

    if (department) {
      filteredProjects = filteredProjects.filter(p => 
        p.department.toLowerCase().includes(department.toLowerCase())
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }

    // Calculate summary stats
    const summary = {
      total: projects.length,
      active: projects.filter(p => p.status === 'active').length,
      completed: projects.filter(p => p.status === 'completed').length,
      onHold: projects.filter(p => p.status === 'on-hold').length,
      totalBudget: projects.reduce((sum, p) => sum + p.budget.total, 0),
      totalSpent: projects.reduce((sum, p) => sum + p.budget.spent, 0),
      averageProgress: Math.round(
        projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
      )
    }

    return NextResponse.json({
      success: true,
      summary,
      projects: filteredProjects.map(({ createdBy, ...project }) => project) // Remove sensitive data
    })

  } catch (error) {
    console.error('GET projects error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (auth.error) return auth.error
    if (!auth.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json() as CreateProjectRequest
    const { name, description, department, priority, startDate, endDate, budget } = body

    // Validate required fields
    if (!name || !description || !department || !priority || !startDate || !endDate || !budget) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400 }
      )
    }

    // Validate data
    const validation = validateProjectData(body)
    if (!validation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validation.errors 
        },
        { status: 400 }
      )
    }

    // Calculate progress based on dates
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    let progress = 0
    
    if (now > end) {
      progress = 100
    } else if (now > start) {
      progress = Math.round(((now - start) / (end - start)) * 100)
    }

    // Create new project
    const newProject: Project = {
      id: generateId(),
      name,
      description,
      status: 'active',
      progress,
      startDate,
      endDate,
      priority,
      department,
      teamCount: 0,
      tasks: {
        total: 0,
        completed: 0
      },
      budget: {
        total: budget,
        spent: 0
      },
      createdBy: auth.userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to database
    projects.push(newProject)

    return NextResponse.json({
      success: true,
      message: 'Project created successfully',
      project: {
        id: newProject.id,
        name: newProject.name,
        status: newProject.status,
        progress: newProject.progress
      }
    }, { status: 201 })

  } catch (error) {
    console.error('POST project error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/projects - Update multiple projects (bulk update)
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { projectIds, updates } = await request.json()

    if (!Array.isArray(projectIds) || projectIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Project IDs are required' },
        { status: 400 }
      )
    }

    // Update each project
    const updatedProjects = []
    for (const projectId of projectIds) {
      const projectIndex = projects.findIndex(p => p.id === projectId)
      if (projectIndex !== -1) {
        projects[projectIndex] = {
          ...projects[projectIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        updatedProjects.push(projects[projectIndex].id)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedProjects.length} projects`,
      updatedProjects
    })

  } catch (error) {
    console.error('PUT projects error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects - Delete multiple projects (bulk delete)
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { searchParams } = new URL(request.url)
    const projectIdsParam = searchParams.get('ids')
    
    if (!projectIdsParam) {
      return NextResponse.json(
        { success: false, error: 'Project IDs are required' },
        { status: 400 }
      )
    }

    const projectIds = projectIdsParam.split(',')
    
    // Filter out deleted projects
    const initialCount = projects.length
    projects = projects.filter(p => !projectIds.includes(p.id))
    const deletedCount = initialCount - projects.length

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} projects`,
      deletedCount
    })

  } catch (error) {
    console.error('DELETE projects error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/projects - Partial update for multiple projects
export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication
    const auth = verifyAuth(request)
    if (auth.error) return auth.error

    const { filters, updates } = await request.json()

    if (!filters || !updates) {
      return NextResponse.json(
        { success: false, error: 'Filters and updates are required' },
        { status: 400 }
      )
    }

    // Find projects matching filters
    const projectsToUpdate = projects.filter(p => {
      let match = true
      if (filters.status) match = match && p.status === filters.status
      if (filters.priority) match = match && p.priority === filters.priority
      if (filters.department) match = match && p.department === filters.department
      return match
    })

    // Update each matching project
    const updatedIds = []
    for (const project of projectsToUpdate) {
      const index = projects.findIndex(p => p.id === project.id)
      if (index !== -1) {
        projects[index] = {
          ...projects[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        updatedIds.push(project.id)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedIds.length} projects`,
      updatedProjects: updatedIds
    })

  } catch (error) {
    console.error('PATCH projects error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// OPTIONS /api/projects - CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  })
}