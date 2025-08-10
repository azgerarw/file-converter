import Link from "next/link";
import { FaGithub, FaCopyright } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";

export default function Footer() {

    return (

        <footer className="w-full bg-gray-300 text-green-600 h-[200px] flex flex-col justify-center">

        <div className=" flex flex-col m-auto w-[150px] h-[85%] items-center justify-between">

          <div className="flex flex-col gap-3 items-center">
            <p className="text-center">Social Media</p>

            <ul className="flex flex-row gap-3 list-none">
              <li className=""><Link href='/'><SlSocialLinkedin /></Link></li>
              <li className=""><Link href='/'><FaGithub /></Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-1 items-center">
              
              <FaCopyright className="text-center" />
              <small>
              Copyright 2025.
              </small> 

          </div>

        </div>
        
        
      </footer>
    )
}