'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

type ReviewForm = {
    
    rating: number;
    content: string;
}

export default function Review() {
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState<ReviewForm>({
        
        rating: 5,
        content: '',
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    
    const emojis = ['😊', '😍', '😐', '😕', '😡', '👍', '👎', '⭐', '❤️', '🔥', '💯', '💪', '🎉', '✨', '💡'];

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function addEmoji(emoji: string) {
        setFormData(prev => ({
            ...prev,
            content: prev.content + emoji
        }));
        setShowEmojiPicker(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        
        if (formData.content.trim().length < 10) {
            alert('Please write at least 10 characters for your review');
            return;
        }

        const reviewDetails = new FormData();
        reviewDetails.append('rating', String(formData.rating));
        reviewDetails.append('content', formData.content);
        reviewDetails.append('user_id', session?.user.id);
        

        const res = await fetch('/api/review', {
            method: 'POST',
            body: reviewDetails
        });
        
        const result = await res.json();
        
        if (result.success) {
            alert('Review submitted');
            setTimeout(() => router.push('/'), 1500)
            return;
        }

        setFormData({
            
            rating: 5,
            content: '',
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5 mx-auto my-[50px] w-[50%] shadow-sm">
            
            <div className="w-full flex justify-center items-center">
                <h2 className="text-[30px]">Write a Review</h2>
            </div>

            
            <label htmlFor="rating">Rating</label>
            <select 
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                name="rating"
                id="rating"
                value={formData.rating}
                required
            >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Good)</option>
                <option value={2}>⭐⭐ (2 - Fair)</option>
                <option value={1}>⭐ (1 - Poor)</option>
            </select>

            <label htmlFor="content">Review Content</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-sm p-1 cursor-pointer shadow-md hover:shadow-gray-500 rounded-lg"
                >
                    😊
                </button>
                
                {showEmojiPicker && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-1">
                        <div className="grid grid-cols-5 gap-1">
                            {emojis.map((emoji, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => addEmoji(emoji)}
                                    className="text-xl p-2 hover:bg-gray-100 rounded cursor-pointer"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <textarea 
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 min-h-[120px] resize-vertical"
                name="content"
                id="content"
                value={formData.content}
                placeholder="Share your experience..."
                required
            />

            

            <div className="w-full flex justify-center items-center">
                <button 
                    type="submit"
                    className="bg-green-600 text-white p-2 w-fit h-10 cursor-pointer hover:bg-green-500 active:scale-95 transition-transform rounded-[5px]"
                >
                    Submit Review
                </button>
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <p className="text-sm text-gray-600">
                    Want to go back?{' '}
                        <Link className="text-blue-500 hover:underline" href='/'>Return to home</Link>
                    
                </p>
            </div>

        </form>
    )
}
