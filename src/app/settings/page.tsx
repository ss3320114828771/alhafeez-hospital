'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Types
interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  department: string
  joinDate: string
  avatar?: string
  bio?: string
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  appointmentReminders: boolean
  taskAssignments: boolean
  projectUpdates: boolean
  mentions: boolean
  marketingEmails: boolean
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  trustedDevices: Device[]
  loginAlerts: boolean
}

interface Device {
  id: string
  name: string
  location: string
  lastActive: string
  current: boolean
}

interface TeamSettings {
  defaultUserRole: string
  allowInvitations: boolean
  requireApproval: boolean
  maxTeamSize: number
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Profile form state
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    fullName: 'Dr. Ahmed Khan',
    email: 'ahmed.khan@alhafeez.com',
    phone: '+92 300 1234567',
    role: 'Chief Medical Officer',
    department: 'Cardiology',
    joinDate: '2020-01-15',
    bio: 'Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology.'
  })

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    taskAssignments: true,
    projectUpdates: true,
    mentions: true,
    marketingEmails: false
  })

  // Security settings state
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-02-15',
    trustedDevices: [
      { id: '1', name: 'Chrome on Windows', location: 'Faisalabad, Pakistan', lastActive: '2 hours ago', current: true },
      { id: '2', name: 'Safari on iPhone', location: 'Faisalabad, Pakistan', lastActive: '2 days ago', current: false }
    ],
    loginAlerts: true
  })

  // Team settings state
  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    defaultUserRole: 'doctor',
    allowInvitations: true,
    requireApproval: true,
    maxTeamSize: 50
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Load settings
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  // Handle profile update
  const handleProfileUpdate = async () => {
    setSaving(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccessMessage('Profile updated successfully')
    } catch (error) {
      setErrorMessage('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  // Handle password change
  const handlePasswordChange = async () => {
    // Validate passwords
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMessage('All fields are required')
      return
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    setSaving(true)
    setErrorMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccessMessage('Password changed successfully')
      setShowPasswordModal(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      setErrorMessage('Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  // Handle two-factor toggle
  const toggleTwoFactor = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))
      setSuccessMessage(`Two-factor authentication ${!security.twoFactorEnabled ? 'enabled' : 'disabled'}`)
    } catch (error) {
      setErrorMessage('Failed to update security settings')
    } finally {
      setSaving(false)
    }
  }

  // Handle device removal
  const removeDevice = async (deviceId: string) => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSecurity(prev => ({
        ...prev,
        trustedDevices: prev.trustedDevices.filter(d => d.id !== deviceId)
      }))
      setSuccessMessage('Device removed successfully')
    } catch (error) {
      setErrorMessage('Failed to remove device')
    } finally {
      setSaving(false)
    }
  }

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Redirect to login after deletion
      router.push('/login')
    } catch (error) {
      setErrorMessage('Failed to delete account')
      setSaving(false)
    }
  }

  if (loading) {
    return <SettingsLoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and configuration</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-between">
          <span className="text-green-400 text-sm">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-400 hover:text-green-300">
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center justify-between">
          <span className="text-red-400 text-sm">{errorMessage}</span>
          <button onClick={() => setErrorMessage('')} className="text-red-400 hover:text-red-300">
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* Settings Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: 'fa-user' },
          { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
          { id: 'security', label: 'Security', icon: 'fa-shield-alt' },
          { id: 'team', label: 'Team', icon: 'fa-users' },
          { id: 'billing', label: 'Billing', icon: 'fa-credit-card' },
          { id: 'integrations', label: 'Integrations', icon: 'fa-plug' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className={`fas ${tab.icon} text-sm`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl">
        {activeTab === 'profile' && (
          <ProfileSettings
            profile={profile}
            setProfile={setProfile}
            onSave={handleProfileUpdate}
            saving={saving}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationSettings
            notifications={notifications}
            setNotifications={setNotifications}
            onSave={() => setSuccessMessage('Notification settings updated')}
            saving={saving}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySettings
            security={security}
            onToggle2FA={toggleTwoFactor}
            onRemoveDevice={removeDevice}
            onShowPasswordModal={() => setShowPasswordModal(true)}
            saving={saving}
          />
        )}

        {activeTab === 'team' && (
          <TeamSettings
            settings={teamSettings}
            setSettings={setTeamSettings}
            onSave={() => setSuccessMessage('Team settings updated')}
            saving={saving}
          />
        )}

        {activeTab === 'billing' && (
          <BillingSettings />
        )}

        {activeTab === 'integrations' && (
          <IntegrationsSettings />
        )}

        {/* Danger Zone */}
        {activeTab === 'security' && (
          <div className="mt-8">
            <DangerZone
              showDeleteConfirm={showDeleteConfirm}
              setShowDeleteConfirm={setShowDeleteConfirm}
              onDelete={handleDeleteAccount}
              saving={saving}
            />
          </div>
        )}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <PasswordModal
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          onSave={handlePasswordChange}
          onClose={() => {
            setShowPasswordModal(false)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
          }}
          saving={saving}
        />
      )}
    </div>
  )
}

// Profile Settings Component
function ProfileSettings({ profile, setProfile, onSave, saving }: any) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-user text-blue-500 mr-2"></i>
        Profile Information
      </h2>

      <div className="space-y-4">
        {/* Avatar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {profile.fullName.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition">
              Change Avatar
            </button>
            <p className="text-gray-400 text-xs mt-2">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Department</label>
            <input
              type="text"
              value={profile.department}
              onChange={(e) => setProfile({...profile, department: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">Bio</label>
          <textarea
            rows={4}
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Notification Settings Component
function NotificationSettings({ notifications, setNotifications, onSave, saving }: any) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-bell text-yellow-500 mr-2"></i>
        Notification Preferences
      </h2>

      <div className="space-y-6">
        {/* Notification Channels */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Notification Channels</h3>
          <div className="space-y-3">
            {[
              { id: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
              { id: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications' },
              { id: 'smsNotifications', label: 'SMS Notifications', desc: 'Text message alerts' }
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.id]}
                  onChange={(e) => setNotifications({...notifications, [item.id]: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/20 text-blue-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Notification Types</h3>
          <div className="space-y-3">
            {[
              { id: 'appointmentReminders', label: 'Appointment Reminders' },
              { id: 'taskAssignments', label: 'Task Assignments' },
              { id: 'projectUpdates', label: 'Project Updates' },
              { id: 'mentions', label: 'Mentions' },
              { id: 'marketingEmails', label: 'Marketing Emails' }
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white text-sm">{item.label}</span>
                <input
                  type="checkbox"
                  checked={notifications[item.id]}
                  onChange={(e) => setNotifications({...notifications, [item.id]: e.target.checked})}
                  className="w-5 h-5 rounded bg-white/5 border-white/20 text-blue-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

// Security Settings Component
function SecuritySettings({ security, onToggle2FA, onRemoveDevice, onShowPasswordModal, saving }: any) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-shield-alt text-green-500 mr-2"></i>
        Security Settings
      </h2>

      <div className="space-y-6">
        {/* Password */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h3 className="text-white text-sm font-medium">Password</h3>
            <p className="text-gray-400 text-xs">Last changed {security.lastPasswordChange}</p>
          </div>
          <button
            onClick={onShowPasswordModal}
            className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition"
          >
            Change Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h3 className="text-white text-sm font-medium">Two-Factor Authentication</h3>
            <p className="text-gray-400 text-xs">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={onToggle2FA}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              security.twoFactorEnabled
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {security.twoFactorEnabled ? 'Enabled' : 'Enable'}
          </button>
        </div>

        {/* Login Alerts */}
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h3 className="text-white text-sm font-medium">Login Alerts</h3>
            <p className="text-gray-400 text-xs">Get notified of new sign-ins to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={security.loginAlerts}
              onChange={(e) => {/* Handle change */}}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-blue-500 transition"></div>
          </label>
        </div>

        {/* Trusted Devices */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Trusted Devices</h3>
          <div className="space-y-3">
            {security.trustedDevices.map((device: any) => (
              <div key={device.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className={`fas fa-${device.name.includes('iPhone') ? 'mobile' : 'desktop'} text-gray-400`}></i>
                  <div>
                    <p className="text-white text-sm">
                      {device.name}
                      {device.current && <span className="ml-2 text-xs text-green-400">(Current)</span>}
                    </p>
                    <p className="text-gray-400 text-xs">{device.location} • {device.lastActive}</p>
                  </div>
                </div>
                {!device.current && (
                  <button
                    onClick={() => onRemoveDevice(device.id)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Team Settings Component
function TeamSettings({ settings, setSettings, onSave, saving }: any) {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-users text-purple-500 mr-2"></i>
        Team Settings
      </h2>

      <div className="space-y-4">
        {/* Default User Role */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Default User Role</label>
          <select
            value={settings.defaultUserRole}
            onChange={(e) => setSettings({...settings, defaultUserRole: e.target.value})}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Team Settings */}
        <div className="space-y-3">
          {[
            { id: 'allowInvitations', label: 'Allow Team Invitations' },
            { id: 'requireApproval', label: 'Require Admin Approval' }
          ].map((item) => (
            <label key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white text-sm">{item.label}</span>
              <input
                type="checkbox"
                checked={settings[item.id]}
                onChange={(e) => setSettings({...settings, [item.id]: e.target.checked})}
                className="w-5 h-5 rounded bg-white/5 border-white/20 text-blue-500"
              />
            </label>
          ))}
        </div>

        {/* Max Team Size */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Maximum Team Size</label>
          <input
            type="number"
            value={settings.maxTeamSize}
            onChange={(e) => setSettings({...settings, maxTeamSize: parseInt(e.target.value)})}
            min="1"
            max="100"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// Billing Settings Component
function BillingSettings() {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-credit-card text-green-500 mr-2"></i>
        Billing Information
      </h2>

      <div className="text-center py-8">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-credit-card text-gray-500 text-3xl"></i>
        </div>
        <h3 className="text-white text-lg font-medium mb-2">No Billing Information</h3>
        <p className="text-gray-400 text-sm mb-6">You haven't added any payment methods yet.</p>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
          Add Payment Method
        </button>
      </div>
    </div>
  )
}

// Integrations Settings Component
function IntegrationsSettings() {
  const integrations = [
    { name: 'Google Calendar', icon: 'fa-calendar', connected: true, color: 'bg-blue-500' },
    { name: 'Slack', icon: 'fa-slack', connected: false, color: 'bg-purple-500' },
    { name: 'Zoom', icon: 'fa-video', connected: true, color: 'bg-green-500' },
    { name: 'Dropbox', icon: 'fa-dropbox', connected: false, color: 'bg-blue-600' }
  ]

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
        <i className="fas fa-plug text-orange-500 mr-2"></i>
        Integrations
      </h2>

      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center`}>
                <i className={`fab ${integration.icon} text-white`}></i>
              </div>
              <div>
                <h3 className="text-white text-sm font-medium">{integration.name}</h3>
                <p className="text-gray-400 text-xs">
                  {integration.connected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded-lg text-sm transition ${
                integration.connected
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              }`}
            >
              {integration.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Danger Zone Component
function DangerZone({ showDeleteConfirm, setShowDeleteConfirm, onDelete, saving }: any) {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-red-500 mb-4 flex items-center">
        <i className="fas fa-exclamation-triangle mr-2"></i>
        Danger Zone
      </h2>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white text-sm font-medium">Delete Account</h3>
          <p className="text-gray-400 text-xs">Permanently delete your account and all associated data</p>
        </div>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-red-400 text-sm">Are you sure?</span>
            <button
              onClick={onDelete}
              disabled={saving}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition disabled:opacity-50"
            >
              {saving ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Password Modal Component
function PasswordModal({ passwordData, setPasswordData, onSave, onClose, saving }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-white mb-4">Change Password</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Changing...
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton
function SettingsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="h-8 bg-white/10 rounded w-48 mb-2 animate-pulse"></div>
      <div className="h-4 bg-white/10 rounded w-64 mb-8 animate-pulse"></div>
      
      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-10 bg-white/10 rounded w-24 animate-pulse"></div>
        ))}
      </div>

      <div className="bg-white/5 rounded-xl p-6">
        <div className="h-6 bg-white/10 rounded w-32 mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <div className="h-4 bg-white/10 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-white/10 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}