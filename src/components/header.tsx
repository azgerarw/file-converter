'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaHome } from 'react-icons/fa';
import Button from './button';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 bg-white">
      <nav className="w-full h-[60px] border-b-green-600 border-1 ">
        <div className="w-[90%] h-[60px] flex flex-row justify-between m-auto items-center text-green-600 ">
          <Link href="/" className="text-2xl cursor-pointer">
            <FaHome />
          </Link>
          <p className="text-2xl">fileConverter</p>

          {session ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}

          
        </div>
      </nav>
    </header>
  );
}
