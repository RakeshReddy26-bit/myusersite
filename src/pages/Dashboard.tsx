import React from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaCheckCircle, FaChartPie, FaBolt, FaExclamationTriangle } from 'react-icons/fa';

const stats = [
  {
    label: 'Total Tasks',
    value: 5,
    icon: <FaTasks className="text-primary-500 text-2xl" />,
    change: '+12.5%',
    color: 'from-primary-500 to-primary-700',
  },
  {
    label: 'Completion Rate',
    value: '20.0%',
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    change: '+8.2%',
    color: 'from-green-400 to-green-600',
  },
  {
    label: 'In Progress',
    value: 1,
    icon: <FaBolt className="text-yellow-500 text-2xl" />,
    change: '-3.1%',
    color: 'from-yellow-400 to-yellow-600',
  },
  {
    label: 'Overdue Tasks',
    value: 4,
    icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
    change: '-15.3%',
    color: 'from-red-400 to-red-600',
  },
];

const statusData = [
  { label: 'To Do', value: 1, color: 'bg-blue-400' },
  { label: 'In Progress', value: 1, color: 'bg-yellow-400' },
  { label: 'Completed', value: 1, color: 'bg-green-500' },
  { label: 'Blocked', value: 1, color: 'bg-red-500' },
];

const priorityData = [
  { label: 'Urgent', value: 1, color: 'bg-red-500' },
  { label: 'High', value: 2, color: 'bg-orange-400' },
  { label: 'Medium', value: 1, color: 'bg-yellow-400' },
  { label: 'Low', value: 1, color: 'bg-green-500' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted dark:from-black dark:to-gray-900 py-8 px-2 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-10 text-center text-lg">Track your productivity and task performance</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
              className={`rounded-2xl shadow-xl p-6 bg-gradient-to-br ${stat.color} text-white flex flex-col items-center justify-center glass-card`}
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-base font-medium mb-1">{stat.label}</div>
              <div className="text-xs text-white/80">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Task Status Distribution */}
          <div className="bg-white/80 dark:bg-black/40 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Status Distribution</h2>
            <div className="flex items-center gap-6">
              {/* Donut Chart (mocked) */}
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="25,75" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#facc15" strokeWidth="4" strokeDasharray="25,75" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="25,75" strokeDashoffset="50" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="25,75" strokeDashoffset="75" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">5</div>
              </div>
              <div className="flex-1 space-y-2">
                {statusData.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm">
                    <span className={`inline-block w-3 h-3 rounded-full ${s.color}`}></span>
                    <span className="text-gray-700 dark:text-gray-200">{s.label}</span>
                    <span className="ml-auto text-gray-500 dark:text-gray-400">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Priority Distribution */}
          <div className="bg-white/80 dark:bg-black/40 rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Priority Distribution</h2>
            <div className="space-y-3">
              {priorityData.map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm">
                  <span className={`inline-block w-3 h-3 rounded-full ${p.color}`}></span>
                  <span className="text-gray-700 dark:text-gray-200">{p.label}</span>
                  <div className="flex-1 mx-2 h-2 rounded bg-gray-200 dark:bg-gray-800 relative">
                    <div className={`${p.color} h-2 rounded`} style={{ width: `${p.value * 20}%` }}></div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 