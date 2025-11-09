'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface POFUploadFormProps {
  userId: string
}

export default function POFUploadForm({ userId }: POFUploadFormProps) {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      validateAndSetFile(droppedFile)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateAndSetFile(selectedFile)
    }
  }

  const validateAndSetFile = (selectedFile: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg']
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF, DOCX, PNG, or JPEG file')
      return
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setFile(selectedFile)
    setError(null)
  }

  const processDocument = async () => {
    if (!file) return

    setIsProcessing(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)
      formData.append('documentType', 'POF')

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Upload and analyze document
      const response = await fetch('/api/verify/pof', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process document')
      }

      const results = await response.json()
      setAnalysisResults(results)

      // Auto-redirect to results page after 1 second
      setTimeout(() => {
        router.push(`/verify/pof/${results.verificationId}`)
      }, 1000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process document')
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setAnalysisResults(null)
    setError(null)
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!file && !analysisResults && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative group p-12 rounded-xl bg-white border border-gray-200 transition-all duration-300 ${
            isDragging
              ? 'border-[#635BFF] bg-blue-50/30'
              : 'hover:border-gray-300'
          }`}
        >
          <input
            type="file"
            id="pof-upload"
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-6 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>

            <h3 className="text-[24px] font-bold text-gray-900 mb-2">
              Drop your POF document here
            </h3>
            <p className="text-[16px] text-gray-600 mb-4">
              or{' '}
              <label
                htmlFor="pof-upload"
                className="text-[#635BFF] hover:text-[#5851EA] font-medium cursor-pointer underline decoration-2 underline-offset-2"
              >
                click to browse
              </label>
              {' '}your files
            </p>

            <p className="text-[13px] text-gray-500 mt-6">
              Supports PDF, DOCX, PNG, JPEG • Max 10MB
            </p>
          </div>
        </div>
      )}

      {/* File Preview & Processing */}
      {file && !analysisResults && (
        <div className="p-6 rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-100/50 shadow-inner">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[16px] font-semibold text-gray-900 mb-1 truncate">
                  {file.name}
                </h4>
                <p className="text-[14px] text-gray-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            {!isProcessing && (
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-red-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[13px] mb-2">
                <span className="text-gray-600 font-medium">
                  {uploadProgress < 100 ? 'Analyzing document...' : 'Analysis complete!'}
                </span>
                <span className="text-[#635BFF] font-semibold">{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#635BFF] to-purple-600 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!isProcessing && (
            <button
              onClick={processDocument}
              className="w-full py-3 bg-[#635BFF] text-white text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium shadow-md hover:shadow-lg"
            >
              Analyze document
            </button>
          )}
        </div>
      )}

      {/* Success State */}
      {analysisResults && (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-[24px] font-bold text-emerald-900 mb-2">
            Analysis complete!
          </h3>
          <p className="text-[16px] text-emerald-700 mb-4">
            Your POF has been verified. Redirecting to results...
          </p>
          <div className="inline-flex items-center gap-2 text-[14px] text-emerald-600">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading results...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-[16px] font-semibold text-red-900 mb-1">Processing failed</h4>
              <p className="text-[14px] text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Security Reminder */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[13px] text-blue-800 leading-relaxed">
            <strong className="font-semibold">Privacy guarantee:</strong> Your document is processed entirely in memory and is never saved to any server or storage. Only the analysis results are saved.
          </p>
        </div>
      </div>
    </div>
  )
}