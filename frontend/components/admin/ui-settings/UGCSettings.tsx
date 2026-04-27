"use client"

import { useState, useEffect } from "react"
import { Save, Loader2, Instagram, Plus, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface UGCData {
    title: string
    description: string
    instagramHandle: string
    posts: { image: string }[]
}

const defaultData: UGCData = {
    title: "Shop the Look",
    description: "Mention us in your posts to get featured on our gallery.",
    instagramHandle: "ReadyMart",
    posts: [
        { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80" },
        { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80" },
        { id: 3, image: "https://images.unsplash.com/photo-1539109132304-39981f1917a2?w=500&q=80" },
        { id: 4, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80" },
        { id: 5, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80" },
        { id: 6, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80" },
    ].map(p => ({ image: p.image }))
}

export default function UGCSettings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [data, setData] = useState<UGCData>(defaultData)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/public/ui-settings?key=ugc")
            const result = await res.json()
            if (result.success && result.data) {
                setData(result.data.value)
            }
        } catch (error) {
            console.error("Failed to fetch UGC settings:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch("/api/admin/ui-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: "ugc", value: data }),
            })
            const result = await res.json()
            if (result.success) {
                toast.success("UGC settings saved")
            } else {
                toast.error(result.error || "Save failed")
            }
        } catch (error) {
            toast.error("Save failed")
        } finally {
            setSaving(false)
        }
    }

    const handlePostChange = (index: number, value: string) => {
        const newPosts = [...data.posts]
        newPosts[index] = { image: value }
        setData({ ...data, posts: newPosts })
    }

    const addPost = () => {
        setData({ ...data, posts: [...data.posts, { image: "" }] })
    }

    const removePost = (index: number) => {
        const newPosts = data.posts.filter((_, i) => i !== index)
        setData({ ...data, posts: newPosts })
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading UGC settings...</div>

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-6">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram Handle</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">@</span>
                            <input
                                type="text"
                                value={data.instagramHandle}
                                onChange={(e) => setData({ ...data, instagramHandle: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 pl-8 bg-white dark:bg-gray-800"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <input
                            type="text"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Post Images</h3>
                    <button
                        onClick={addPost}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                    >
                        <Plus size={18} /> Add New Post
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.posts.map((post, index) => (
                        <div key={index} className="flex gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                            <div className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden shrink-0">
                                {post.image ? (
                                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                        <Instagram size={24} className="text-gray-300" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="block text-[10px] font-bold uppercase text-gray-400">Image URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={post.image}
                                        onChange={(e) => handlePostChange(index, e.target.value)}
                                        className="flex-1 text-xs border border-gray-300 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800"
                                    />
                                    <button
                                        onClick={() => removePost(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition flex items-center gap-2"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Save UGC Settings
                </button>
            </div>
        </div>
    )
}
