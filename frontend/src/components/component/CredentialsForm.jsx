import React, { useState, useEffect } from 'react'

export default function CredentialsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [credentialsLoaded, setCredentialsLoaded] = useState(false)

  // Function to read credentials from file
  const loadCredentials = async () => {
    try {
      setIsLoading(true)
      setMessage('')
      
      // Create credentials directory if it doesn't exist
      const response = await fetch('/api/credentials/load', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setFormData(data.credentials)
          setCredentialsLoaded(true)
          setMessage('✅ Credentials loaded successfully from file!')
          setTimeout(() => setMessage(''), 3000)
        } else {
          setMessage('⚠️ No credentials file found. Please save credentials first.')
        }
      } else {
        setMessage('❌ Error loading credentials from file.')
      }
    } catch (error) {
      console.error('Error loading credentials:', error)
      setMessage('❌ Failed to load credentials from file.')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to save credentials to file
  const saveCredentials = async () => {
    try {
      setIsLoading(true)
      setMessage('')
      
      const response = await fetch('/api/credentials/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setMessage('✅ Credentials saved successfully to file!')
          setTimeout(() => setMessage(''), 3000)
        } else {
          setMessage('❌ Error saving credentials to file.')
        }
      } else {
        setMessage('❌ Failed to save credentials to file.')
      }
    } catch (error) {
      console.error('Error saving credentials:', error)
      setMessage('❌ Failed to save credentials to file.')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to clear form
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    })
    setMessage('')
    setCredentialsLoaded(false)
  }

  // Function to validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage('❌ Please enter a name.')
      return false
    }
    if (!formData.email.trim()) {
      setMessage('❌ Please enter an email.')
      return false
    }
    if (!formData.password.trim()) {
      setMessage('❌ Please enter a password.')
      return false
    }
    if (!formData.email.includes('@')) {
      setMessage('❌ Please enter a valid email address.')
      return false
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    await saveCredentials()
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Load credentials on component mount
  useEffect(() => {
    loadCredentials()
  }, [])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Raspberry Pi Credentials Manager
      </h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg text-center ${
          message.includes('✅') ? 'bg-green-100 text-green-800' :
          message.includes('⚠️') ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Credentials'}
          </button>
          
          <button
            type="button"
            onClick={loadCredentials}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load Credentials'}
          </button>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={clearForm}
            disabled={isLoading}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Form
          </button>
        </div>
      </form>

      {credentialsLoaded && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Loaded Credentials:</h3>
          <div className="text-sm text-blue-700">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Password:</strong> {'•'.repeat(formData.password.length)}</p>
          </div>
        </div>
      )}
    </div>
  )
} 