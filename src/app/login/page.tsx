'use client'

import Button from "@/components/button"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    

    async function handleLogin() {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.ok) {
            alert('Login successful');
            
            window.location.href = '/';
            } else {
            alert('Login failed, check credentials.');
            }
        };

    

    return (
        <form className="flex flex-col gap-3 p-5 mx-auto my-[50px] w-[50%] shadow-sm">
            
            <div className="w-full flex justify-center items-center">
                <h2 className="text-[30px]">Sign In</h2>
            </div>

            <label htmlFor="email">Email</label>
            <input 
                autoComplete="email address" 
                onChange={(e) => setEmail(e.target.value)} 
                className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" 
                type="email" 
                name="email" 
                id="email" 
                required 
            />

            <label htmlFor="password">Password</label>
            <input 
                autoComplete="password" 
                onChange={(e) => setPassword(e.target.value)} 
                className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" 
                type="password" 
                name="password" 
                id="password" 
                required 
            />

            <div className="w-full flex justify-center items-center">
                <Button onClick={handleLogin}>Sign In</Button>
            </div>

            <div className="w-full flex justify-center items-center mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                        type="button" 
                        onClick={() => router.push('/register')}
                        className="text-blue-500 hover:underline"
                    >
                        Sign up here
                    </button>
                </p>
            </div>

        </form>
    )
}
