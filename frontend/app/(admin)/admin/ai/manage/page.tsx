"use client"

import { useState } from "react"
import {
    Bot,
    Sparkles,
    MessageSquare,
    TrendingUp,
    PenTool,
    Zap,
    Cpu,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Settings2,
    BarChart3,
    RefreshCw,
    Play,
    Pause,
    AlertTriangle,
    ChevronRight,
    Wand2,
    ShieldCheck,
    Star,
    ArrowUpRight,
    Layers,
    FlaskConical,
    Brain,
    Rocket,
    Globe
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "overview" | "agents" | "content" | "seo" | "logs"

interface Agent {
    id: string
    name: string
    description: string
    icon: React.ElementType
    color: string
    bg: string
    border: string
    status: "active" | "paused" | "error"
    tasksToday: number
    successRate: number
}

// ─── Static Data ───────────────────────────────────────────────────────────-
const agents: Agent[] = [
    {
        id: "content-writer",
        name: "Content Writer",
        description: "Auto-generates high-converting product descriptions, blog intros, and marketing copy.",
        icon: PenTool,
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-100 dark:bg-violet-900/40",
        border: "border-violet-200 dark:border-violet-800",
        status: "active",
        tasksToday: 38,
        successRate: 97,
    },
    {
        id: "seo-optimizer",
        name: "SEO Optimizer",
        description: "Analyzes products and auto-writes meta titles, descriptions, keywords, and structured data.",
        icon: Search,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-100 dark:bg-blue-900/40",
        border: "border-blue-200 dark:border-blue-800",
        status: "active",
        tasksToday: 24,
        successRate: 100,
    },
    {
        id: "support-bot",
        name: "Support Bot",
        description: "Handles customer FAQs, return requests, and ticket routing 24/7 without human intervention.",
        icon: MessageSquare,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-100 dark:bg-emerald-900/40",
        border: "border-emerald-200 dark:border-emerald-800",
        status: "active",
        tasksToday: 61,
        successRate: 94,
    },
    {
        id: "price-engine",
        name: "Price Engine",
        description: "Provides dynamic pricing insights using competitor data, demand signals, and margin targets.",
        icon: TrendingUp,
        color: "text-orange-600 dark:text-orange-400",
        bg: "bg-orange-100 dark:bg-orange-900/40",
        border: "border-orange-200 dark:border-orange-800",
        status: "paused",
        tasksToday: 0,
        successRate: 88,
    },
    {
        id: "fraud-guard",
        name: "Fraud Guard",
        description: "Monitors transactions in real time and flags suspicious order patterns automatically.",
        icon: ShieldCheck,
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-100 dark:bg-red-900/40",
        border: "border-red-200 dark:border-red-800",
        status: "active",
        tasksToday: 12,
        successRate: 99,
    },
    {
        id: "recommendation",
        name: "Recommender",
        description: "Personalizes product suggestions for logged-in users based on browse history and purchases.",
        icon: Star,
        color: "text-fuchsia-600 dark:text-fuchsia-400",
        bg: "bg-fuchsia-100 dark:bg-fuchsia-900/40",
        border: "border-fuchsia-200 dark:border-fuchsia-800",
        status: "error",
        tasksToday: 0,
        successRate: 91,
    },
]

const logs = [
    { id: 1, icon: PenTool, iconBg: "bg-violet-100 dark:bg-violet-900/30", iconColor: "text-violet-600 dark:text-violet-400", agent: "Content Writer", message: "Generated description for \"Premium Wireless Headphones\"", time: "2 min ago", status: "success" },
    { id: 2, icon: MessageSquare, iconBg: "bg-emerald-100 dark:bg-emerald-900/30", iconColor: "text-emerald-600 dark:text-emerald-400", agent: "Support Bot", message: "Auto-resolved customer ticket #8492 (return request)", time: "15 min ago", status: "success" },
    { id: 3, icon: Search, iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400", agent: "SEO Optimizer", message: "Bulk-generated SEO tags for 14 Electronics products", time: "2 hrs ago", status: "success" },
    { id: 4, icon: ShieldCheck, iconBg: "bg-red-100 dark:bg-red-900/30", iconColor: "text-red-600 dark:text-red-400", agent: "Fraud Guard", message: "Flagged order #9921 as high-risk (unusual shipping address)", time: "3 hrs ago", status: "warning" },
    { id: 5, icon: Star, iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/30", iconColor: "text-fuchsia-600 dark:text-fuchsia-400", agent: "Recommender", message: "Personalization engine crashed — model endpoint timeout", time: "5 hrs ago", status: "error" },
    { id: 6, icon: PenTool, iconBg: "bg-violet-100 dark:bg-violet-900/30", iconColor: "text-violet-600 dark:text-violet-400", agent: "Content Writer", message: "Generated blog draft: \"Top 10 Trending Gadgets of 2026\"", time: "6 hrs ago", status: "success" },
    { id: 7, icon: Search, iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600 dark:text-blue-400", agent: "SEO Optimizer", message: "Updated meta for \"Smart Home\" category (52 products)", time: "8 hrs ago", status: "success" },
]

// ─── Sub-components ─────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, gradient, glowColor }: {
    label: string; value: string; sub: string; icon: React.ElementType; gradient: string; glowColor: string
}) {
    return (
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className={`absolute -right-8 -top-8 w-32 h-32 ${glowColor} rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500`} />
            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    )
}

function AgentStatusBadge({ status }: { status: Agent["status"] }) {
    if (status === "active") return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
        </span>
    )
    if (status === "paused") return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Paused
        </span>
    )
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />Error
        </span>
    )
}

function AgentCard({ agent, onToggle }: { agent: Agent; onToggle: (id: string) => void }) {
    const Icon = agent.icon
    return (
        <div className={`bg-white dark:bg-gray-900 rounded-2xl border ${agent.border} p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300`}>
            <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 ${agent.bg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${agent.color}`} />
                </div>
                <AgentStatusBadge status={agent.status} />
            </div>
            <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{agent.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl py-2">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.tasksToday}</p>
                    <p className="text-xs text-gray-400">Tasks today</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl py-2">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{agent.successRate}%</p>
                    <p className="text-xs text-gray-400">Success rate</p>
                </div>
            </div>
            <div className="flex gap-2 mt-1">
                <button
                    onClick={() => onToggle(agent.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        agent.status === "active"
                            ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                            : "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    }`}
                >
                    {agent.status === "active" ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Activate</>}
                </button>
                <button className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Settings2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AIManagePage() {
    const [activeTab, setActiveTab] = useState<Tab>("overview")
    const [agentList, setAgentList] = useState<Agent[]>(agents)
    const [contentPrompt, setContentPrompt] = useState("")
    const [contentType, setContentType] = useState("product-description")
    const [seoPrompt, setSeoPrompt] = useState("")
    const [generating, setGenerating] = useState(false)
    const [generatedContent, setGeneratedContent] = useState("")

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "agents", label: "AI Agents", icon: Bot },
        { id: "content", label: "Content Gen", icon: PenTool },
        { id: "seo", label: "SEO Tools", icon: Globe },
        { id: "logs", label: "Activity Log", icon: Layers },
    ]

    const handleToggleAgent = (id: string) => {
        setAgentList(prev => prev.map(a =>
            a.id === id
                ? { ...a, status: a.status === "active" ? "paused" : "active" }
                : a
        ))
    }

    const handleGenerate = () => {
        if (!contentPrompt.trim()) return
        setGenerating(true)
        setGeneratedContent("")
        setTimeout(() => {
            setGeneratedContent(
                contentType === "product-description"
                    ? `Introducing the ${contentPrompt} — engineered for those who refuse to settle. With precision-crafted materials and an ultra-modern aesthetic, this product redefines everyday performance. Whether you're at home or on the go, its seamless design ensures reliability, while its smart functionality keeps you ahead of the curve. Backed by our quality guarantee, the ${contentPrompt} isn't just a purchase — it's an upgrade to your lifestyle.`
                    : `Discover everything you need to know about ${contentPrompt}! In this comprehensive guide, we'll explore the top features, expert tips, and how to make the most of your experience. From unboxing to advanced usage, we've got you covered with actionable insights designed to help you succeed. Let's dive in!`
            )
            setGenerating(false)
        }, 1800)
    }

    const activeAgents = agentList.filter(a => a.status === "active").length
    const totalTasks = agentList.reduce((sum, a) => sum + a.tasksToday, 0)

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 flex items-center gap-3">
                        <Sparkles className="text-violet-500 w-8 h-8 md:w-10 md:h-10 shrink-0" />
                        AI Manage Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
                        Control your store&apos;s intelligent agents, generate content, and monitor automation.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all">
                        <Rocket className="w-4 h-4" /> Run All
                    </button>
                </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Active Agents" value={`${activeAgents} / ${agentList.length}`} sub="Currently running" icon={Bot} gradient="from-violet-500 to-fuchsia-500" glowColor="bg-violet-400" />
                <StatCard label="Tasks Today" value={totalTasks.toString()} sub="Across all agents" icon={Zap} gradient="from-fuchsia-500 to-pink-500" glowColor="bg-fuchsia-400" />
                <StatCard label="Tokens Consumed" value="2.4M" sub="This month" icon={Cpu} gradient="from-blue-500 to-cyan-500" glowColor="bg-blue-400" />
                <StatCard label="Avg. Accuracy" value="94.8%" sub="Success rate" icon={Brain} gradient="from-emerald-500 to-teal-500" glowColor="bg-emerald-400" />
            </div>

            {/* ── Tab Navigation ── */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex gap-1 overflow-x-auto hide-scrollbar">
                    {tabs.map(tab => {
                        const TabIcon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all duration-200 ${
                                    isActive
                                        ? "border-violet-600 text-violet-700 dark:text-violet-400"
                                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* ── Tab Content ── */}

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Agent Overview List */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <h2 className="font-bold text-gray-900 dark:text-white text-base">Agents Status</h2>
                            <button
                                onClick={() => setActiveTab("agents")}
                                className="text-xs text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-1 hover:underline"
                            >
                                Manage <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                            {agentList.map(agent => {
                                const Icon = agent.icon
                                return (
                                    <div key={agent.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                        <div className={`w-10 h-10 ${agent.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                            <Icon className={`w-5 h-5 ${agent.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{agent.name}</p>
                                            <p className="text-xs text-gray-400">{agent.tasksToday} tasks today</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{agent.successRate}%</p>
                                                <p className="text-xs text-gray-400">accuracy</p>
                                            </div>
                                            <AgentStatusBadge status={agent.status} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Insights */}
                    <div className="space-y-4">
                        {/* Model Info */}
                        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-5 text-white shadow-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <FlaskConical className="w-5 h-5 opacity-80" />
                                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Active Model</p>
                            </div>
                            <h3 className="text-xl font-extrabold mb-1">Gemini 2.0 Flash</h3>
                            <p className="text-xs opacity-75 mb-4">Multimodal · Function calling enabled</p>
                            <div className="flex items-center justify-between text-xs">
                                <span className="bg-white/20 rounded-full px-3 py-1 font-semibold">Context: 128K</span>
                                <span className="bg-white/20 rounded-full px-3 py-1 font-semibold">rpm: 1500</span>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "Generate product descriptions", tab: "content" as Tab, icon: PenTool },
                                    { label: "Run SEO audit", tab: "seo" as Tab, icon: Search },
                                    { label: "View all logs", tab: "logs" as Tab, icon: Layers },
                                ].map(action => {
                                    const ActionIcon = action.icon
                                    return (
                                        <button
                                            key={action.label}
                                            onClick={() => setActiveTab(action.tab)}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-700 dark:text-gray-300 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium transition-all group"
                                        >
                                            <ActionIcon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                                            <span className="flex-1 text-left">{action.label}</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AGENTS TAB */}
            {activeTab === "agents" && (
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activeAgents} of {agentList.length} agents active
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {agentList.map(agent => (
                            <AgentCard key={agent.id} agent={agent} onToggle={handleToggleAgent} />
                        ))}
                    </div>
                </div>
            )}

            {/* CONTENT TAB */}
            {activeTab === "content" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Panel */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                                <Wand2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">AI Content Generator</h2>
                                <p className="text-xs text-gray-400">Generate copy in seconds</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Content Type</label>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { value: "product-description", label: "Product Desc." },
                                    { value: "blog-intro", label: "Blog Intro" },
                                ].map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setContentType(opt.value)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                            contentType === opt.value
                                                ? "bg-violet-600 text-white shadow-md"
                                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                                {contentType === "product-description" ? "Product Name / Details" : "Blog Title / Topic"}
                            </label>
                            <textarea
                                rows={4}
                                value={contentPrompt}
                                onChange={e => setContentPrompt(e.target.value)}
                                placeholder={contentType === "product-description" ? "e.g. Noise-Cancelling Bluetooth Headphones, premium build..." : "e.g. Top 10 Smart Home Gadgets in 2026"}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition"
                            />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating || !contentPrompt.trim()}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {generating ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating…</> : <><Wand2 className="w-4 h-4" /> Generate Content</>}
                        </button>
                    </div>

                    {/* Output Panel */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 dark:text-white">Generated Output</h3>
                            {generatedContent && (
                                <button
                                    onClick={() => navigator.clipboard?.writeText(generatedContent)}
                                    className="text-xs text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                                >Copy</button>
                            )}
                        </div>
                        {generating && (
                            <div className="flex-1 flex flex-col gap-3 justify-center">
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-full" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-4/5" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-5/6" />
                                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse w-3/4" />
                            </div>
                        )}
                        {!generating && generatedContent && (
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{generatedContent}</p>
                        )}
                        {!generating && !generatedContent && (
                            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-300 dark:text-gray-700">
                                <PenTool className="w-12 h-12" />
                                <p className="text-sm font-medium">Your generated content will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SEO TAB */}
            {activeTab === "seo" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 dark:text-white">SEO Generator</h2>
                                <p className="text-xs text-gray-400">Auto-generate meta & keywords</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Product or Page</label>
                            <input
                                type="text"
                                value={seoPrompt}
                                onChange={e => setSeoPrompt(e.target.value)}
                                placeholder="e.g. Wireless Charging Pad — Electronics"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                        <button
                            disabled={!seoPrompt.trim()}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Search className="w-4 h-4" /> Analyze & Generate SEO
                        </button>

                        {/* Placeholder SEO results */}
                        {seoPrompt && (
                            <div className="space-y-3 pt-2">
                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-1">Meta Title</p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{seoPrompt} | Best Deals &amp; Fast Delivery — ReadyMart</p>
                                </div>
                                <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800">
                                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase mb-1">Meta Description</p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">Shop the best {seoPrompt} on ReadyMart. Free delivery, easy returns, and top-rated quality — your trusted store for premium electronics.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Suggested Keywords</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[seoPrompt.toLowerCase(), "buy online", "best price", "fast delivery", "top rated", "2026"].map(kw => (
                                            <span key={kw} className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">{kw}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SEO Score Panel */}
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Store SEO Health</h3>
                            <div className="space-y-4">
                                {[
                                    { label: "Products with meta title", score: 78, color: "bg-blue-500" },
                                    { label: "Products with description", score: 61, color: "bg-fuchsia-500" },
                                    { label: "Images with alt text", score: 45, color: "bg-amber-500" },
                                    { label: "Pages with schema markup", score: 92, color: "bg-emerald-500" },
                                ].map(item => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                                            <span>{item.label}</span>
                                            <span className="font-bold text-gray-900 dark:text-white">{item.score}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.score}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-2xl border border-blue-100 dark:border-blue-900 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Recommendations</h4>
                            </div>
                            <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" /> 12 products missing meta descriptions — run bulk SEO fill</li>
                                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" /> 31 product images have no alt text — impacts accessibility & ranking</li>
                                <li className="flex items-start gap-2"><ChevronRight className="w-3 h-3 text-blue-500 mt-0.5 shrink-0" /> Category pages lack breadcrumb schema — add structured data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* LOGS TAB */}
            {activeTab === "logs" && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <h2 className="font-bold text-gray-900 dark:text-white">Automation Activity Log</h2>
                        <span className="text-xs text-gray-400">Last 24 hours</span>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {logs.map(log => {
                            const LogIcon = log.icon
                            return (
                                <div key={log.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                    <div className={`w-10 h-10 rounded-full ${log.iconBg} flex items-center justify-center shrink-0`}>
                                        <LogIcon className={`w-5 h-5 ${log.iconColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{log.message}</p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                            <Clock className="w-3 h-3" /> {log.time} &bull; {log.agent}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        {log.status === "success" && (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="w-4 h-4" /> Success
                                            </span>
                                        )}
                                        {log.status === "warning" && (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                                <AlertTriangle className="w-4 h-4" /> Warning
                                            </span>
                                        )}
                                        {log.status === "error" && (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
                                                <XCircle className="w-4 h-4" /> Error
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 text-center">
                        <button className="text-sm text-violet-600 dark:text-violet-400 font-semibold hover:underline">Load more logs</button>
                    </div>
                </div>
            )}
        </div>
    )
}
