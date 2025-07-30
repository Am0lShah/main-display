import React, { useState,useRef,useEffect } from 'react'
import FileDropUpload from '../components/component/FileDropUpload.jsx'
import CredentialsForm from '../components/component/CredentialsForm.jsx'
import { supabase } from '../services/supabaseClient.js'
import { connectSocket } from '../services/socket.js'

import { getSocket } from '../services/socket.js'

export default function ImageNotice() {
  const [activeTab, setActiveTab] = useState('image')

  const [contentType, setContentType]=useState('');


  const [fileUrl, setFileUrl] = useState(null)
  const [fileType, setFileType] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef()



  const setContentTypeHandler=(type)=>{
      setContentType(type);
  }


  // Unified upload handling for both drop and button
  const uploadHandler = async (file) => {
    try {
      setError('')
      setFileUrl(null)
      setCopied(false)
      
      if (!file) {
        setError('No file selected')
        return
      }

      setUploading(true)
      setFileType(file.type)
      
      const filePath = `${Date.now()}-${file.name}`
      
      // Try to upload directly to the 'uploads' bucket
      // If the bucket doesn't exist, we'll get a clear error
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        
        // Check if it's a bucket not found error
        if (uploadError.message.includes('not found') || uploadError.message.includes('does not exist')) {
          setError('Storage bucket "uploads" does not exist. Please create it in your Supabase dashboard under Storage.')
        } else if (uploadError.message.includes('row-level security policy')) {
          setError('Access denied. Please check your Supabase storage policies or authentication.')
        } else {
          setError(`Upload failed: ${uploadError.message}`)
        }
        setUploading(false)
        return
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

        console.log(urlData);
        
      if (urlData?.publicUrl) {
        setFileUrl(urlData.publicUrl)
      } else {
        setError('Failed to get public URL for uploaded file')
      }
      
    } catch (error) {
      console.error('Unexpected error:', error)
      setError('An unexpected error occurred during upload')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (event) => {
    event.preventDefault()
    if (event.dataTransfer.files.length > 0) {
      uploadHandler(event.dataTransfer.files[0])
    }
  }

  const onFileChange = (event) => {
    if (event.target.files.length > 0) {
      uploadHandler(event.target.files[0])
    }
  }

  const handleCopy = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  const renderPreview = () => {
    if (!fileUrl) return null
    if (fileType.startsWith('image/')) {
      return <img src={fileUrl} alt="Preview" className="w-48 h-auto mt-2 mx-auto border rounded" />
    }
    if (fileType.startsWith('video/')) {
      return <video src={fileUrl} controls className="w-48 mt-2 mx-auto rounded" />
    }
    return <p className="italic mt-2">Not previewable – download with link below.</p>
  }



  // socket connection 



  const [messages, setMessages] = useState([]);
  // const [formate,setFormate]= useState('Image_video')

  const [newMessage, setNewMessage] = useState('');
  const [groupName,setGroupName]=useState('');


   useEffect(() => {
      const socket = connectSocket(localStorage.getItem('token'));
  
      socket.on('new_message', (message) => {
        setMessages(prev => [...prev, message]);
        // console.log(message);
        
      });
  
      
  
      socket.on('error', (err) => {
        setError(err);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const handleSend = () => {
      try {
        const socket = getSocket();
        socket.emit('send_message', {newMessage,groupName,activeTab,fileUrl});
        setNewMessage('');
      } catch (err) {
        setError(err.message);
      }
    };



    const handleGroupIdChange = (e) => {
    setGroupName(e.target.value);
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Raspberry Pi Management System
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            
             <button
        onClick={() => setActiveTab('image')}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          activeTab === 'image'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Image
      </button>

      <button
        onClick={() => setActiveTab('video')}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          activeTab === 'video'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Video
      </button>

          </div>
        </div>

        {/* Tab Content */}
        <div className="flex justify-center">
          
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Supabase File Upload Demo
              </h2>
              

              <div>
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-slate-50 transition hover:bg-slate-100"
        style={{ minWidth: 300 }}
        onClick={() => fileInputRef.current.click()}
      >
        <p>Drag and drop a file here <br />or</p>
        <button
          type="button"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          onClick={(e) => {
            e.stopPropagation()
            fileInputRef.current.click()
          }}
        >
          Choose File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
        />
        {uploading && <p className="mt-3">Uploading...</p>}
        {error && <p className="mt-3 text-red-600">{error}</p>}
      </div>

      {fileUrl && (
        <div className="mt-5 p-4 border rounded bg-white">
          <div className="flex flex-col items-center space-y-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 break-all text-center"
              style={{ wordBreak: 'break-all', maxWidth: 240 }}
            >
              {fileUrl}
            </a>
            <button
              onClick={handleCopy}
              className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="flex justify-center">
            {renderPreview()}
          </div>
        </div>
      )}
    </div>



            </div>
         
         
        </div>

      <div>
        <input
        type="text"
        value={groupName}
        onChange={handleGroupIdChange}
        placeholder="Group Name"
        className="w-full my-2 py-2 pl-10 text-sm text-gray-700 bg-white rounded-lg focus:outline-none border-1 border-red-100"
      />
<input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button 
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
      </div>

      </div>
    </div>
  )
}
