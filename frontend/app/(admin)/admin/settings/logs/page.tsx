"use client"

import { useState } from "react"
import { 
    Terminal, 
    Search, 
    Filter, 
    Calendar, 
    Download, 
    Trash2, 
    ShieldAlert, 
    ShieldCheck, 
    Info, 
    Monitor, 
    Smartphone, 
    Globe, 
    User, 
    MoreHorizontal,
    Activity,
    Clock,
    ArrowUpRight
} from "lucide-react"

interface LogEntry {
    id: string
    user: string
    action: string
    module: string
    severity: 'INFO' | 'WARNING' | 'CRITICAL'
    ip: string
    device: 'DESKTOP' | 'MOBILE' | 'TABLET'
    timestamp: string
}

const mockLogs: LogEntry[] = [
    { id: "LOG-9921", user: "Admin (Kishor)", action: "Updated Global Tax Rate (UK-VAT)", module: "Finance", severity: 'WARNING', ip: "192.168.1.1", device: 'DESKTOP', timestamp: "2024-03-25 10:42 AM" },
    { id: "LOG-9920", user: "Support (Sarah)", action: "Resolved Ticket #8842", module: "Support", severity: 'INFO', ip: "192.168.1.45", device: 'DESKTOP', timestamp: "2024-03-25 10:35 AM" },
    { id: "LOG-9919", user: "Admin (Kishor)", action: "Login successful", module: "Auth", severity: 'INFO', ip: "192.168.1.1", device: 'DESKTOP', timestamp: "2024-03-25 09:12 AM" },
    { id: "LOG-9918", user: "Unknown", action: "Failed login attempt (3 times)", module: "Auth", severity: 'CRITICAL', ip: "45.12.88.19", device: 'MOBILE', timestamp: "2024-03-25 04:22 AM" },
    { id: "LOG-9917", user: "System", action: "Database backup completed", module: "Core", severity: 'INFO', ip: "INTERNAL", device: 'DESKTOP', timestamp: "2024-03-25 03:00 AM" },
]

export default function ActivityLogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>(mockLogs)
    const [filter, setFilter] = useState('ALL')

    const filteredLogs = logs.filter(l => filter === 'ALL' || l.severity === filter)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Terminal className="text-gray-900 dark:text-white" size={32} />
                        Enterprise Audit Logs
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Monitor all administrative actions, security events, and system changes in real-time.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} /> Export CSV
                    </button>
                    <button className="bg-rose-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all active:scale-95 flex items-center gap-2">
                        <Trash2 size={18} /> Clear Archives
                    </button>
                </div>
            </div>

            {/* Security Pulse Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Security Events", value: "24", sub: "Last 24 hours", icon: Activity, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Failed Logins", value: "3", sub: "Potential threats", icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                    { label: "Active Sessions", value: "8", sub: "Currently logged in", icon: User, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Sync Health", value: "99.9%", sub: "Live reporting", icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                <stat.icon size={20} />
                            </div>
                            <ArrowUpRight className="text-gray-300" size={16} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by action, user, or IP address..." 
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-gray-900 dark:focus:ring-blue-600 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    {['ALL', 'INFO', 'WARNING', 'CRITICAL'].map(s => (
                        <button 
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                filter === s 
                                ? "bg-gray-900 dark:bg-blue-600 text-white shadow-xl" 
                                : "bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-gray-900"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                    <button className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
                        <Calendar size={18} />
                    </button>
                </div>
            </div>

            {/* Logs Ledger */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Administrative Action</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin & Device</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Module</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Severity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group font-mono">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center shrink-0">
                                                <User size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1 truncate">{log.action}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{log.user}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            {log.device === 'DESKTOP' ? <Monitor size={14} className="text-gray-400" /> : <Smartphone size={14} className="text-gray-400" />}
                                            <div>
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-none mb-1">{log.ip}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">via {log.device}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className="text-[10px] font-black bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-500 uppercase tracking-widest border border-gray-100 dark:border-gray-800">{log.module}</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            log.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-600 border border-rose-200/50' :
                                            log.severity === 'WARNING' ? 'bg-orange-50 text-orange-600 border border-orange-200/50' :
                                            'bg-emerald-50 text-emerald-600 border border-emerald-200/50'
                                        }`}>
                                            {log.severity === 'CRITICAL' && <ShieldAlert size={12} />}
                                            {log.severity === 'WARNING' && <Info size={12} />}
                                            {log.severity === 'INFO' && <ShieldCheck size={12} />}
                                            {log.severity}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex flex-col items-end">
                                            <p className="text-xs font-bold text-gray-900 dark:text-white leading-none mb-1">{log.timestamp.split(' ')[1]} {log.timestamp.split(' ')[2]}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{log.timestamp.split(' ')[0]}</p>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Terminal Live View (Mock) */}
            <div className="bg-gray-950 rounded-[2.5rem] p-8 border border-gray-800 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-2 right-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                 </div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                    <p className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Live Audit Stream Active</p>
                 </div>
                 <div className="space-y-2 font-mono text-[11px] text-emerald-500/70">
                    <p className="flex gap-4"><span className="text-emerald-500/30">10:45:21</span> <span className="text-white">[INFO]</span> Incoming WebSocket connection from 192.168.1.1</p>
                    <p className="flex gap-4"><span className="text-emerald-500/30">10:45:24</span> <span className="text-white">[INFO]</span> Auth handshake successful (AdminSession_f842)</p>
                    <p className="flex gap-4"><span className="text-emerald-500/30">10:45:30</span> <span className="text-emerald-400 font-bold">[WARN]</span> Attempted access to restricted module: /admin/settings/security by User_8829</p>
                    <p className="flex gap-4"><span className="text-emerald-500/30">10:45:32</span> <span className="text-white">[INFO]</span> Heartbeat pulse received from Marketplace_Sync_Engine</p>
                 </div>
            </div>
        </div>
    )
}
