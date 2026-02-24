// Task status types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked' | 'cancelled'

// Task priority types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical'

// Task category types (hospital-specific)
export type TaskCategory = 
  | 'patient-care'
  | 'administrative'
  | 'clinical'
  | 'surgical'
  | 'emergency'
  | 'laboratory'
  | 'pharmacy'
  | 'maintenance'
  | 'training'
  | 'research'
  | 'quality'
  | 'compliance'
  | 'other'

// Task type
export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  category: TaskCategory
  
  // Assignment
  assigneeId: string
  assigneeName: string
  assigneeAvatar?: string
  assigneeDepartment?: string
  reporterId: string
  reporterName: string
  
  // Project/Department context
  projectId?: string
  projectName?: string
  departmentId?: string
  departmentName?: string
  patientId?: string
  patientName?: string
  
  // Dates
  createdAt: string
  updatedAt: string
  dueDate: string
  startedAt?: string
  completedAt?: string
  cancelledAt?: string
  
  // Time tracking
  estimatedHours: number
  actualHours: number
  remainingHours?: number
  timeEntries?: TimeEntry[]
  
  // Progress
  progress: number // 0-100
  completionPercentage?: number
  
  // Dependencies
  dependencies: string[] // task ids
  blockedBy: string[] // task ids
  blocking: string[] // task ids that depend on this task
  
  // Subtasks
  subtasks: SubTask[]
  
  // Details
  comments: TaskComment[]
  attachments: Attachment[]
  tags: string[]
  checklists: Checklist[]
  
  // Medical context
  medicalContext?: MedicalTaskContext
  
  // Additional
  notes?: string
  metadata?: Record<string, any>
}

// SubTask interface
export interface SubTask {
  id: string
  title: string
  completed: boolean
  completedAt?: string
  assigneeId?: string
  order: number
}

// Time entry interface
export interface TimeEntry {
  id: string
  taskId: string
  userId: string
  userName: string
  startTime: string
  endTime?: string
  duration: number // in minutes
  description?: string
  billable: boolean
}

// Task comment interface
export interface TaskComment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: string
  updatedAt?: string
  attachments?: Attachment[]
  mentions?: string[] // user ids
}

// Attachment interface
export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: string
}

// Checklist interface
export interface Checklist {
  id: string
  title: string
  items: ChecklistItem[]
  completed: boolean
}

// Checklist item interface
export interface ChecklistItem {
  id: string
  text: string
  checked: boolean
  checkedAt?: string
  checkedBy?: string
}

// Medical task context (hospital-specific)
export interface MedicalTaskContext {
  patientId?: string
  patientName?: string
  roomNumber?: string
  bedNumber?: string
  doctorId?: string
  doctorName?: string
  nurseId?: string
  nurseName?: string
  procedureType?: string
  diagnosis?: string
  prescriptionId?: string
  labTestId?: string
  urgencyLevel?: 'routine' | 'urgent' | 'emergency' | 'critical'
  infectionControl?: boolean
  isolationRequired?: boolean
  specialInstructions?: string[]
}

// Task summary (for listings)
export interface TaskSummary {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  assigneeName: string
  dueDate: string
  projectName?: string
  patientName?: string
  completed: boolean
}

// Task filter interface
export interface TaskFilter {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  category?: TaskCategory[]
  assigneeId?: string[]
  reporterId?: string[]
  projectId?: string[]
  departmentId?: string[]
  patientId?: string[]
  dueDate?: {
    start?: string
    end?: string
  }
  createdDate?: {
    start?: string
    end?: string
  }
  completedDate?: {
    start?: string
    end?: string
  }
  tags?: string[]
  search?: string
  overdue?: boolean
  completed?: boolean
  medicalContext?: Partial<MedicalTaskContext>
}

// Task sort options
export interface TaskSortOptions {
  field: 'title' | 'status' | 'priority' | 'dueDate' | 'createdAt' | 'assigneeName'
  direction: 'asc' | 'desc'
}

// Task statistics
export interface TaskStatistics {
  total: number
  byStatus: Record<TaskStatus, number>
  byPriority: Record<TaskPriority, number>
  byCategory: Record<TaskCategory, number>
  byAssignee: Record<string, number>
  overdue: number
  completedToday: number
  completedThisWeek: number
  averageCompletionTime: number // in hours
  totalEstimatedHours: number
  totalActualHours: number
  efficiency: number // estimated/actual ratio
}

// Task metrics
export interface TaskMetrics {
  taskId: string
  createdToStarted: number // hours
  startedToCompleted: number // hours
  totalLeadTime: number // hours
  actualVsEstimated: number // percentage
  reworkCount?: number
  blockersTime?: number // hours spent blocked
}

// Task dependency
export interface TaskDependency {
  id: string
  taskId: string
  dependsOnTaskId: string
  type: 'blocks' | 'blocked-by' | 'related-to'
  createdAt: string
}

// Task template
export interface TaskTemplate {
  id: string
  name: string
  description: string
  category: TaskCategory
  defaultPriority: TaskPriority
  estimatedHours: number
  requiredSkills?: string[]
  checklist?: ChecklistItem[]
  medicalContext?: Partial<MedicalTaskContext>
  department?: string
  createdAt: string
  updatedAt: string
}

// Task recurrence
export interface TaskRecurrence {
  id: string
  taskId: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom'
  interval: number
  daysOfWeek?: number[] // 0-6, 0 = Sunday
  dayOfMonth?: number
  startDate: string
  endDate?: string
  count?: number
  createdTasks: string[] // generated task ids
}

// Task assignment
export interface TaskAssignment {
  id: string
  taskId: string
  userId: string
  assignedBy: string
  assignedAt: string
  role: 'owner' | 'contributor' | 'reviewer'
  estimatedHours?: number
  notes?: string
}

// Task notification
export interface TaskNotification {
  id: string
  taskId: string
  userId: string
  type: 'assigned' | 'due-soon' | 'overdue' | 'completed' | 'commented' | 'mentioned'
  read: boolean
  createdAt: string
  readAt?: string
  metadata?: Record<string, any>
}

// Task activity log
export interface TaskActivity {
  id: string
  taskId: string
  userId: string
  userName: string
  action: 'created' | 'updated' | 'assigned' | 'status-changed' | 'commented' | 'attached' | 'completed'
  field?: string
  oldValue?: any
  newValue?: any
  timestamp: string
  metadata?: Record<string, any>
}

// Task approval
export interface TaskApproval {
  id: string
  taskId: string
  requiredFrom: string[] // user ids
  approvedBy?: string[]
  rejectedBy?: string[]
  status: 'pending' | 'approved' | 'rejected'
  comments?: string
  requestedAt: string
  completedAt?: string
}

// Task priority matrix
export interface PriorityMatrix {
  urgency: 'low' | 'medium' | 'high'
  importance: 'low' | 'medium' | 'high'
  result: TaskPriority
  description: string
}

// Task reminder
export interface TaskReminder {
  id: string
  taskId: string
  userId: string
  reminderTime: string
  type: 'email' | 'notification' | 'both'
  sent: boolean
  sentAt?: string
}

// Task tag
export interface TaskTag {
  id: string
  name: string
  color: string
  description?: string
  createdAt: string
}

// Task watch
export interface TaskWatch {
  id: string
  taskId: string
  userId: string
  createdAt: string
}

// Task share
export interface TaskShare {
  id: string
  taskId: string
  sharedWith: string // email or user id
  permission: 'view' | 'comment' | 'edit'
  sharedBy: string
  sharedAt: string
  expiresAt?: string
  token?: string
}

// Task export options
export interface TaskExportOptions {
  format: 'json' | 'csv' | 'pdf'
  includeComments: boolean
  includeAttachments: boolean
  includeActivity: boolean
  dateRange?: {
    start: string
    end: string
  }
  filters?: TaskFilter
}

// Task import result
export interface TaskImportResult {
  success: boolean
  importedCount: number
  failedCount: number
  errors?: {
    row: number
    message: string
  }[]
  warnings?: string[]
}

// Task batch operation
export interface TaskBatchOperation {
  operation: 'status-change' | 'assign' | 'priority-change' | 'delete' | 'archive'
  taskIds: string[]
  data: any
  performedBy: string
  performedAt: string
  results: {
    success: string[] // task ids
    failed: {
      taskId: string
      reason: string
    }[]
  }
}

// Task dashboard data
export interface TaskDashboardData {
  myTasks: TaskSummary[]
  overdueTasks: TaskSummary[]
  upcomingTasks: TaskSummary[]
  completedToday: TaskSummary[]
  statistics: TaskStatistics
  priorityDistribution: {
    priority: TaskPriority
    count: number
  }[]
  statusTrend: {
    date: string
    todo: number
    'in-progress': number
    done: number
  }[]
  topAssignees: {
    userId: string
    userName: string
    taskCount: number
    completedCount: number
  }[]
}

// Task workflow state
export interface TaskWorkflowState {
  fromStatus: TaskStatus
  toStatus: TaskStatus
  allowed: boolean
  requiredFields?: string[]
  validationRules?: string[]
  automatedActions?: {
    type: string
    config: any
  }[]
}

// Task workflow definition
export interface TaskWorkflow {
  id: string
  name: string
  description: string
  states: TaskStatus[]
  transitions: TaskWorkflowState[]
  defaultStatus: TaskStatus
}

// Task SLA (Service Level Agreement)
export interface TaskSLA {
  id: string
  priority: TaskPriority
  responseTime: number // hours
  resolutionTime: number // hours
  escalationLevels?: {
    level: number
    time: number
    notify: string[] // roles or users
  }[]
}

// Task SLA breach
export interface TaskSLABreach {
  id: string
  taskId: string
  priority: TaskPriority
  breachType: 'response' | 'resolution'
  threshold: number
  actual: number
  breachedAt: string
  escalated: boolean
  escalatedAt?: string
  resolvedAt?: string
}

// Task quality check
export interface TaskQualityCheck {
  id: string
  taskId: string
  checkType: string
  passed: boolean
  checkedBy: string
  checkedAt: string
  comments?: string
  requiredFixes?: string[]
}

// Task audit
export interface TaskAudit {
  id: string
  taskId: string
  action: string
  performedBy: string
  performedAt: string
  ipAddress?: string
  userAgent?: string
  changes: {
    field: string
    before: any
    after: any
  }[]
}