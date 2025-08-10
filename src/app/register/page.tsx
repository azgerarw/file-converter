'use client'

import Button from "@/components/button"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";


type UserDetails = {
    username: string;
    name: string;
    lastname: string;
    email: string;
    birthdate: string;
    phone: string;
    country: string;
    image?: File;
    password: string;
    policy: string;
}

export default function Register() {

    const router = useRouter();

    const [formDetails, setFormDetails] = useState<UserDetails>({
            username: '',
            name: '',
            lastname: '',
            email: '',
            birthdate: '',
            phone: '',
            country: '',
            password: '',
            policy: '',
        });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        
        
        const { name, value, files } = e.target;

        setFormDetails((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
        }));

        

        const wrongValue = "border border-red-400 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400";
        const rightValue = "border border-green-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300";

        switch (name) {

        case 'username':
            e.target.className = value.length < 6 ? `${wrongValue}` : `${rightValue}`;
            break;
        case 'email':
            e.target.className = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? `${rightValue}` : `${wrongValue}`;
            break;
        case 'password':
            e.target.className = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? `${rightValue}` : `${wrongValue}`;
            break;
        default:
            break; 
            
        }

    }

    async function createAccount() {

        
        
        const accountDetails = new FormData();
        accountDetails.append('username', formDetails.username);
        accountDetails.append('name', formDetails.name);
        accountDetails.append('lastname', formDetails.lastname);
        accountDetails.append('phone', formDetails.phone);
        accountDetails.append('email', formDetails.email);
        accountDetails.append('country', formDetails.country);
        accountDetails.append('password', formDetails.password);
        accountDetails.append('birthdate', formDetails.birthdate);
        accountDetails.append('policy', formDetails.policy);
        accountDetails.append('password', formDetails.password);
        if (formDetails.image instanceof File) {
            accountDetails.append('image', formDetails.image);
        }

        const res = await fetch('/api/register', {
        method: 'POST',
        body: accountDetails
        });

        const result = await res.json();
        
        if (result.success) {
            alert('Account created');
            setTimeout(() => router.push('/'), 1500)
            return;
        }

        const errs = result.errors?.fieldErrors || {};
        const errorsArray = [];

        if (errs.username) {
            errorsArray.push(errs.username);
        }
        if (errs.email) {
            errorsArray.push(errs.email);
        }
        if (errs.birthdate) {
            errorsArray.push(errs.birthdate);
        }
        if (errs.name) {
            errorsArray.push(errs.name);
        }
        if (errs.lastname) {
            errorsArray.push(errs.lastname);
        }
        if (errs.phone) {
            errorsArray.push(errs.phone);
        }
        if (errs.country) {
            errorsArray.push(errs.country);
        }
        if (errs.password) {
            errorsArray.push(errs.password);
        }
        if (errs.policy) {
            errorsArray.push(errs.policy);
        }
        
        errorsArray.length > 0 ? alert(`${errorsArray}`) : '';
    }

    return (
        
        <form className="flex flex-col gap-3 p-5 mx-auto my-[50px] w-[50%] shadow-sm">
            
            <div className="w-full flex justify-center items-center" >
                <h2 className="text-[30px]">Create your account</h2>
            </div>

            <label htmlFor="username">Username</label>
            <input autoComplete="username" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="text" name="username" id="username" required />

            <label htmlFor="name">Name</label>
            <input autoComplete="name" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="text" name="name" id="name" required />

            <label htmlFor="lastname">Lastname</label>
            <input autoComplete="lastname" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="text" name="lastname" id="lastname" required />

            <label htmlFor="birthdate">Birthdate</label>
            <input autoComplete="birthdate" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer" type="date" name="birthdate" id="birthdate" required />

            <label htmlFor="email">Email</label>
            <input autoComplete="email address" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="email" name="email" id="email" required />

            <label htmlFor="phone">Phone number</label>
            <input autoComplete="phone number" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="text" name="phone" id="phone" required />

            <label htmlFor="country">Country</label>
            <input autoComplete="country" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="text" name="country" id="country" required />

            <label htmlFor="image">Profile picture</label>
            <input onChange={handleChange} accept=".png" className="cursor-pointer border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="file" name="image" id="image" required />

            <label htmlFor="password">Password</label>
            <input autoComplete="password" onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300" type="password" name="password" id="password" required />

            <label htmlFor="policy" className="flex flex-row gap-1"> 
            <input onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer" type="checkbox" name="policy" id="policy" required />
             I accept t&c.
            </label>
            
            <div className="w-full flex justify-center items-center">
            <Button onClick={createAccount}>Sign Up</Button>
            </div>

        </form>
    )
}