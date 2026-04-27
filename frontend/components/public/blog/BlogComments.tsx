"use client"

import { useState } from "react"
import { MessageCircle, Send, User, Heart, Reply, MoreHorizontal } from "lucide-react"
import Image from "next/image"

const initialComments = [
    {
        id: 1,
        author: "Ayesha Rahman",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
        date: "2 hours ago",
        content: "This trend forecast is spot on! I've already started seeing more minimalistic tech-inspired pieces in local boutiques. Can't wait for the sustainability part to become mainstream.",
        likes: 12,
        replies: 2
    },
    {
        id: 2,
        author: "Tanvir Ahmed",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        date: "5 hours ago",
        content: "Love the focus on material innovation. ReadyMart always brings something new to the table. Great editorial!",
        likes: 8,
        replies: 0
    }
]

export default function BlogComments() {
    const [comments, setComments] = useState(initialComments)
    const [newComment, setNewComment] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        
        const comment = {
            id: Date.now(),
            author: "Guest User",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
            date: "Just now",
            content: newComment,
            likes: 0,
            replies: 0
        }
        
        setComments([comment, ...comments])
        setNewComment("")
    }

    return (
        <section className="mt-24 space-y-12">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-600">
                    <MessageCircle size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
                        Join the <span className="text-orange-600">Conversation</span>
                    </h2>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{comments.length} Comments so far</p>
                </div>
            </div>

            {/* Comment Form */}
            <div className="bg-white dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none mb-16">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <textarea 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..." 
                            className="w-full bg-gray-50 dark:bg-gray-950 p-8 rounded-[2rem] border-2 border-transparent focus:border-orange-600 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all font-medium text-gray-700 dark:text-gray-300 min-h-[150px] resize-none"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Logged in as Guest</p>
                        <button className="bg-gray-950 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all active:scale-95 flex items-center gap-3 shadow-2xl shadow-orange-600/20">
                            Post Comment <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-8">
                {comments.map((comment) => (
                    <div key={comment.id} className="group animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex gap-6">
                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{comment.author}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{comment.date}</p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                                <div className="bg-gray-50/50 dark:bg-gray-900/30 p-6 rounded-[2rem] rounded-tl-none border border-gray-50 dark:border-gray-800/50">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                                <div className="flex items-center gap-6 ml-4">
                                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-orange-600 transition-colors">
                                        <Heart size={14} className={comment.likes > 10 ? "fill-orange-600 text-orange-600" : ""} /> {comment.likes} Likes
                                    </button>
                                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-orange-600 transition-colors">
                                        <Reply size={14} /> Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
