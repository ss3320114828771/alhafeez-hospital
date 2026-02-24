// Project status types
export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled' | 'planned'

// Project priority types
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical' | 'urgent'

// Project category types
export type ProjectCategory = 
  | 'infrastructure'
  | 'it'
  | 'medical'
  | 'research'
  | 'training'
  | 'quality'
  | 'expansion'
  | 'equipment'
  | 'other'

// Project team member role
export type TeamMemberRole = 
  | 'project-lead'
  | 'developer'
  | 'designer'
  | 'tester'
  | 'analyst'
  | 'consultant'
  | 'stakeholder'
  | 'medical-expert'
  | 'nurse'
  | 'doctor'
  | 'admin'

// Task status types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'

// Task priority types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical'

// Risk level types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

// Budget category types
export type BudgetCategory = 
  | 'equipment'
  | 'supplies'
  | 'labor'
  | 'consulting'
  | 'training'
  | 'software'
  | 'hardware'
  | 'facilities'
  | 'miscellaneous'

// Project interface
export interface Project {
  id: string
  name: string
  description: string
  shortDescription?: string
  status: ProjectStatus
  priority: ProjectPriority
  category: ProjectCategory
  department: string
  location?: string
  
  // Dates
  startDate: string
  endDate: string
  plannedStartDate?: string
  plannedEndDate?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
  
  // Progress
  progress: number
  milestones: Milestone[]
  tasks: Task[]
  
  // Team
  team: TeamMember[]
  stakeholders: Stakeholder[]
  
  // Budget
  budget: Budget
  actualCost?: number
  
  // Documents
  documents: Document[]
  
  // Risks
  risks: Risk[]
  
  // Metrics
  metrics: ProjectMetrics
  
  // Additional
  tags: string[]
  notes?: string
  attachments?: Attachment[]
}

// Project summary (for listings)
export interface ProjectSummary {
  id: string
  name: string
  status: ProjectStatus
  priority: ProjectPriority
  progress: number
  startDate: string
  endDate: string
  teamCount: number
  taskCount: {
    total: number
    completed: number
  }
  budget: {
    total: number
    spent: number
  }
}

// Milestone interface
export interface Milestone {
  id: string
  title: string
  description?: string
  dueDate: string
  completedAt?: string
  status: 'pending' | 'in-progress' | 'completed' | 'delayed'
  progress?: number
  dependencies?: string[] // milestone ids
  attachments?: Attachment[]
}

// Task interface
export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  assigneeName: string
  reporterId: string
  reporterName: string
  projectId: string
  milestoneId?: string
  parentTaskId?: string // for subtasks
  
  // Dates
  createdAt: string
  updatedAt: string
  dueDate: string
  startedAt?: string
  completedAt?: string
  
  // Time tracking
  estimatedHours: number
  actualHours: number
  remainingHours?: number
  
  // Details
  comments: Comment[]
  attachments: Attachment[]
  tags: string[]
  
  // Dependencies
  dependencies: string[] // task ids
  blockedBy: string[] // task ids
  
  // Subtasks
  subtasks: string[] // task ids
}

// Team member interface
export interface TeamMember {
  id: string
  userId: string
  name: string
  email: string
  role: TeamMemberRole
  department: string
  avatar?: string
  joinedAt: string
  leftAt?: string
  isLead: boolean
  permissions: string[]
  allocation: number // percentage
  skills: string[]
  tasks: string[] // task ids
}

// Stakeholder interface
export interface Stakeholder {
  id: string
  name: string
  email: string
  role: string
  department: string
  influence: 'low' | 'medium' | 'high'
  interest: 'low' | 'medium' | 'high'
  expectations?: string[]
  concerns?: string[]
}

// Budget interface
export interface Budget {
  id: string
  total: number
  spent: number
  remaining: number
  currency: string
  categories: BudgetCategory[]
  items: BudgetItem[]
  lastUpdated: string
}

// Budget item interface
export interface BudgetItem {
  id: string
  category: BudgetCategory
  description: string
  plannedAmount: number
  actualAmount: number
  variance: number
  status: 'planned' | 'approved' | 'spent' | 'cancelled'
  date: string
  vendor?: string
  notes?: string
  attachments?: Attachment[]
}

// Risk interface
export interface Risk {
  id: string
  title: string
  description: string
  category: 'technical' | 'schedule' | 'budget' | 'resource' | 'quality' | 'external'
  probability: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high' | 'critical'
  level: RiskLevel
  owner: string
  mitigationPlan?: string
  contingencyPlan?: string
  status: 'identified' | 'mitigated' | 'occurred' | 'closed'
  createdAt: string
  updatedAt: string
  triggeredAt?: string
  resolvedAt?: string
}

// Document interface
export interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedBy: string
  uploadedAt: string
  version: number
  description?: string
  tags: string[]
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

// Comment interface
export interface Comment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: string
  updatedAt?: string
  attachments?: Attachment[]
  replies?: Comment[]
  mentions?: string[] // user ids
}

// Project metrics interface
export interface ProjectMetrics {
  id: string
  projectId: string
  // Timeline metrics
  plannedDuration: number // days
  actualDuration: number // days
  scheduleVariance: number // days
  // Budget metrics
  costVariance: number
  roi?: number
  // Quality metrics
  defectCount: number
  defectDensity: number
  customerSatisfaction?: number
  // Progress metrics
  milestoneCompletion: number // percentage
  taskCompletion: number // percentage
  // Team metrics
  teamVelocity: number
  teamMorale?: number
  // Risk metrics
  openRisks: number
  mitigatedRisks: number
  occurredRisks: number
  // Custom metrics
  customMetrics?: Record<string, number>
  updatedAt: string
}

// Timeline event interface
export interface TimelineEvent {
  id: string
  projectId: string
  type: 'milestone' | 'task' | 'risk' | 'decision' | 'update' | 'other'
  title: string
  description?: string
  date: string
  createdBy: string
  attachments?: Attachment[]
}

// Project filter interface
export interface ProjectFilter {
  status?: ProjectStatus[]
  priority?: ProjectPriority[]
  category?: ProjectCategory[]
  department?: string[]
  dateRange?: {
    start: string
    end: string
  }
  budget?: {
    min: number
    max: number
  }
  progress?: {
    min: number
    max: number
  }
  team?: string[]
  tags?: string[]
  search?: string
}

// Project sort options
export interface ProjectSortOptions {
  field: 'name' | 'status' | 'priority' | 'progress' | 'startDate' | 'endDate' | 'budget'
  direction: 'asc' | 'desc'
}

// Project statistics
export interface ProjectStatistics {
  total: number
  byStatus: Record<ProjectStatus, number>
  byPriority: Record<ProjectPriority, number>
  byCategory: Record<ProjectCategory, number>
  byDepartment: Record<string, number>
  averageProgress: number
  totalBudget: number
  totalSpent: number
  totalTasks: number
  completedTasks: number
  upcomingDeadlines: TimelineEvent[]
  overdue: number
  risks: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
  }
}

// Project report interface
export interface ProjectReport {
  id: string
  projectId: string
  title: string
  type: 'progress' | 'financial' | 'risk' | 'completion' | 'custom'
  generatedAt: string
  generatedBy: string
  data: any
  format: 'pdf' | 'excel' | 'csv' | 'json'
  url?: string
}

// Project template interface
export interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: ProjectCategory
  defaultMilestones: Milestone[]
  defaultTasks: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>[]
  defaultBudget?: Omit<Budget, 'id' | 'lastUpdated'>
  defaultRisks?: Omit<Risk, 'id' | 'createdAt' | 'updatedAt'>[]
  estimatedDuration: number // days
  estimatedCost: number
  requiredSkills: string[]
  departments: string[]
  createdAt: string
  updatedAt: string
  usageCount: number
}

// Project comment (for discussions)
export interface ProjectComment {
  id: string
  projectId: string
  content: string
  authorId: string
  authorName: string
  authorAvatar?: string
  createdAt: string
  updatedAt?: string
  attachments?: Attachment[]
  replies?: ProjectComment[]
  mentions?: string[]
  reactions?: Record<string, string[]>
}

// Project activity log
export interface ProjectActivity {
  id: string
  projectId: string
  userId: string
  userName: string
  action: string
  entityType: 'project' | 'milestone' | 'task' | 'budget' | 'risk' | 'document'
  entityId: string
  entityName: string
  changes?: {
    field: string
    oldValue: any
    newValue: any
  }[]
  metadata?: Record<string, any>
  timestamp: string
}

// Project permission
export interface ProjectPermission {
  userId: string
  projectId: string
  role: 'owner' | 'manager' | 'member' | 'viewer'
  permissions: string[]
  grantedBy: string
  grantedAt: string
  expiresAt?: string
}

// Project invite
export interface ProjectInvite {
  id: string
  projectId: string
  email: string
  role: TeamMemberRole
  invitedBy: string
  invitedAt: string
  expiresAt: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  token: string
}

// Project export options
export interface ProjectExportOptions {
  includeTasks: boolean
  includeMilestones: boolean
  includeBudget: boolean
  includeRisks: boolean
  includeDocuments: boolean
  includeComments: boolean
  includeActivity: boolean
  dateRange?: {
    start: string
    end: string
  }
  format: 'json' | 'csv' | 'pdf'
}

// Project import result
export interface ProjectImportResult {
  success: boolean
  projectId?: string
  errors?: string[]
  warnings?: string[]
  importedCount: {
    tasks: number
    milestones: number
    risks: number
    documents: number
  }
}

// Project dashboard data
export interface ProjectDashboardData {
  summary: ProjectSummary
  recentActivity: ProjectActivity[]
  upcomingMilestones: Milestone[]
  overdueTasks: Task[]
  riskSummary: {
    total: number
    critical: number
    high: number
  }
  budgetStatus: {
    total: number
    spent: number
    remaining: number
    percentage: number
  }
  teamWorkload: {
    memberId: string
    memberName: string
    taskCount: number
    totalHours: number
  }[]
  progressChart: {
    date: string
    planned: number
    actual: number
  }[]
}

// Project health check
export interface ProjectHealthCheck {
  projectId: string
  overall: 'good' | 'fair' | 'poor' | 'critical'
  indicators: {
    schedule: 'good' | 'fair' | 'poor' | 'critical'
    budget: 'good' | 'fair' | 'poor' | 'critical'
    quality: 'good' | 'fair' | 'poor' | 'critical'
    team: 'good' | 'fair' | 'poor' | 'critical'
    risks: 'good' | 'fair' | 'poor' | 'critical'
  }
  issues: {
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    recommendation?: string
  }[]
  lastUpdated: string
}

// Project milestone template
export interface MilestoneTemplate {
  id: string
  name: string
  description: string
  typicalDuration: number // days
  dependencies?: string[] // milestone template ids
  deliverables?: string[]
  tasks?: string[] // task template ids
}

// Project task template
export interface TaskTemplate {
  id: string
  title: string
  description: string
  typicalHours: number
  requiredSkills: string[]
  dependsOn?: string[] // task template ids
}

// Project resource allocation
export interface ResourceAllocation {
  projectId: string
  resourceId: string
  resourceName: string
  resourceType: 'human' | 'equipment' | 'facility'
  allocation: number // hours or percentage
  startDate: string
  endDate: string
  cost?: number
  notes?: string
}

// Project dependency
export interface ProjectDependency {
  id: string
  sourceProjectId: string
  targetProjectId: string
  type: 'blocked-by' | 'related-to' | 'depends-on' | 'duplicates'
  description?: string
  createdAt: string
  updatedAt?: string
}

// Project change request
export interface ChangeRequest {
  id: string
  projectId: string
  title: string
  description: string
  type: 'scope' | 'schedule' | 'budget' | 'resource' | 'quality'
  proposedChanges: {
    field: string
    oldValue: any
    newValue: any
  }[]
  impact: {
    schedule?: number // days
    budget?: number // amount
    resources?: number // number of people
    quality?: 'high' | 'medium' | 'low'
  }
  status: 'draft' | 'review' | 'approved' | 'rejected' | 'implemented'
  requestedBy: string
  requestedAt: string
  reviewedBy?: string
  reviewedAt?: string
  comments?: string[]
  attachments?: Attachment[]
}

// Project lessons learned
export interface LessonsLearned {
  id: string
  projectId: string
  category: 'success' | 'challenge' | 'improvement' | 'innovation'
  title: string
  description: string
  impact: string
  recommendations: string[]
  createdBy: string
  createdAt: string
  tags: string[]
  attachments?: Attachment[]
}

// Project performance indicator
export interface KPI {
  id: string
  projectId: string
  name: string
  description: string
  category: 'time' | 'cost' | 'quality' | 'scope' | 'resource'
  target: number
  actual: number
  variance: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
  updatedAt: string
}