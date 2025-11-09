'use client';

import { useState } from 'react';

interface Analysis {
  riskScore: number;
  riskLevel: string;
  summary: string;
  redFlags: Array<{
    title: string;
    description: string;
    severity: string;
  }>;
  parties: Array<{
    name: string;
    role: string;
    concerns: string;
  }>;
  recommendations: string[];
  chainAnalysis: {
    intermediaryCount: number;
    chainComplexity: string;
    chainDescription: string;
  };
}

export default function AnalyzePage() {
  const [dealInfo, setDealInfo] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!dealInfo.trim()) {
      setError('Please enter deal information');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealInfo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-green-600 bg-green-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'HIGH':
        return 'text-orange-600 bg-orange-50';
      case 'CRITICAL':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW':
        return 'bg-yellow-100 text-yellow-800';
      case 'MEDIUM':
        return 'bg-orange-100 text-orange-800';
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            DealShield Analysis
          </h1>
          <p className="text-gray-600 mb-8">
            AI-powered due diligence for luxury asset transactions
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deal Information
            </label>
            <textarea
              value={dealInfo}
              onChange={(e) => setDealInfo(e.target.value)}
              placeholder="Enter details about the transaction: parties involved, asset type, transaction size, intermediaries, any concerns..."
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Analyzing...' : 'Analyze Deal'}
          </button>

          {analysis && (
            <div className="mt-8 space-y-6">
              {/* Risk Score */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold">Risk Assessment</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(
                      analysis.riskLevel
                    )}`}
                  >
                    {analysis.riskLevel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {analysis.riskScore}/100
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${analysis.riskScore}%` }}
                    />
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{analysis.summary}</p>
              </div>

              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Red Flags</h2>
                  <div className="space-y-3">
                    {analysis.redFlags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-gray-900">
                            {flag.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(
                              flag.severity
                            )}`}
                          >
                            {flag.severity}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">
                          {flag.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parties */}
              {analysis.parties.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    Parties Involved
                  </h2>
                  <div className="space-y-2">
                    {analysis.parties.map((party, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">
                            {party.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({party.role})
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {party.concerns}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chain Analysis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-3">
                  Intermediary Chain Analysis
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Intermediaries</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analysis.chainAnalysis.intermediaryCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Complexity</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analysis.chainAnalysis.chainComplexity}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  {analysis.chainAnalysis.chainDescription}
                </p>
              </div>

              {/* Recommendations */}
              <div>
                <h2 className="text-xl font-semibold mb-3">
                  Recommendations
                </h2>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}