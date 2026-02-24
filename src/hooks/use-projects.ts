'use client'

import { useState, useEffect, useCallback } from 'react'

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
  createdAt: string
  updatedAt: string
}

interface CreateProjectData {
  name: string
  description: string
  department: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  budget: number
}

interface UpdateProjectData {
  name?: string
  description?: string
  status?: 'active' | 'completed' | 'on-hold'
  priority?: 'low' | 'medium' | 'high' | 'critical'
  department?: string
  startDate?: string
  endDate?: string
  budget?: number
}

interface ProjectFilters {
  status?: string
  priority?: string
  department?: string
  search?: string
}

interface ProjectStats {
  total: number
  active: number
  completed: number
  onHold: number
  totalBudget: number
  totalSpent: number
  averageProgress: number
}

interface UseProjectsReturn {
  projects: Project[]
  selectedProject: Project | null
  stats: ProjectStats | null
  isLoading: boolean
  error: string | null
  filters: ProjectFilters
  setFilters: (filters: ProjectFilters) => void
  loadProjects: () => Promise<void>
  loadProject: (id: string) => Promise<void>
  createProject: (data: CreateProjectData) => Promise<{ success: boolean; error?: string }>
  updateProject: (id: string, data: UpdateProjectData) => Promise<{ success: boolean; error?: string }>
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>
  bulkDeleteProjects: (ids: string[]) => Promise<{ success: boolean; error?: string; deletedCount?: number }>
  clearSelectedProject: () => void
  clearError: () => void
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProjectFilters>({})

  // Load projects with filters
  const loadProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Build query string from filters
      const queryParams = new URLSearchParams()
      if (filters.status) queryParams.append('status', filters.status)
      if (filters.priority) queryParams.append('priority', filters.priority)
      if (filters.department) queryParams.append('department', filters.department)
      if (filters.search) queryParams.append('search', filters.search)

      const response = await fetch(`/api/projects?${queryParams.toString()}`, {
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load projects')
      }

      setProjects(data.projects || [])
      setStats(data.summary || null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load projects')
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  // Load single project
  const loadProject = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${id}`, {
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load project')
      }

      setSelectedProject(data.project)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load project')
      setSelectedProject(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Create project
  const createProject = useCallback(async (data: CreateProjectData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create project')
      }

      // Refresh projects list
      await loadProjects()

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create project'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [loadProjects])

  // Update project
  const updateProject = useCallback(async (id: string, data: UpdateProjectData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update project')
      }

      // Refresh projects list
      await loadProjects()

      // Update selected project if it's the one being edited
      if (selectedProject?.id === id) {
        await loadProject(id)
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update project'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [loadProjects, loadProject, selectedProject])

  // Delete project
  const deleteProject = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete project')
      }

      // Refresh projects list
      await loadProjects()

      // Clear selected project if it was deleted
      if (selectedProject?.id === id) {
        setSelectedProject(null)
      }

      return { success: true }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [loadProjects, selectedProject])

  // Bulk delete projects
  const bulkDeleteProjects = useCallback(async (ids: string[]) => {
    if (ids.length === 0) {
      return { success: false, error: 'No projects selected' }
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/projects?ids=${ids.join(',')}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete projects')
      }

      // Refresh projects list
      await loadProjects()

      // Clear selected project if it was deleted
      if (selectedProject && ids.includes(selectedProject.id)) {
        setSelectedProject(null)
      }

      return { success: true, deletedCount: result.deletedCount }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete projects'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }, [loadProjects, selectedProject])

  // Clear selected project
  const clearSelectedProject = useCallback(() => {
    setSelectedProject(null)
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load projects on mount and when filters change
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return {
    projects,
    selectedProject,
    stats,
    isLoading,
    error,
    filters,
    setFilters,
    loadProjects,
    loadProject,
    createProject,
    updateProject,
    deleteProject,
    bulkDeleteProjects,
    clearSelectedProject,
    clearError
  }
}