'use client'
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Key, useEffect, useState } from "react";

type Review = {
  id: Key | null | undefined;
  rating: number;
  content: string;
  user_image: string;
  user_id: string;
  username: string;
}

export default function Home() {
  const { data: session } = useSession();

  const [reviews, setReviews] = useState<Review[]>([]);

  async function getReviews() {
    
    fetch('/api/review') 
      .then(res => res.json())
      .then(data => setReviews(data.reviews))
      .catch(err => console.error('Error al cargar perfil:', err));
      
  }

  

  useEffect(() =>  {
     getReviews();
  }, [])

  
  return (
    <div className="flex flex-row min-h-[500px] w-full">

      <div className=" h-[700px] w-[50%] flex flex-col gap-4 items-center p-5">
        
        <p>
          <strong className="text-[20px]">fileConverter... </strong>
          et repellat inventore, facere perferendis omnis doloribus iusto ducimus voluptates in consectetur! Dolores ullam consequuntur, facilis non necessitatibus libero eius omnis, quae modi debitis, quod consequatur quaerat.
          Pariatur adipisci illum dolores, quam, unde sed perspiciatis vero minima libero corrupti dolorem esse aliquid voluptates perferendis? Sunt perspiciatis assumenda deserunt, corporis quo suscipit esse reiciendis. Hic exercitationem culpa inventore!
          Eius animi aliquid, maiores laborum nihil distinctio accusamus? Rerum facere quia blanditiis explicabo? Est ducimus, aliquam optio dolorem sunt aperiam obcaecati natus odit harum iusto vitae aliquid sapiente, consequuntur magni.
          Cum eligendi illum recusandae consequatur accusantium eos laudantium error alias. Unde cumque voluptas libero culpa impedit optio aliquid eos tempora beatae quam sequi debitis, autem aspernatur nam aperiam consectetur numquam. ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis sapiente, illum tempore officia cumque neque, odit earum consequatur adipisci culpa optio obcaecati quas maxime distinctio eligendi tempora amet veniam illo!
          Dexlitia animi saepe nisi debitis! Molestiae commodi nostrum hic quia porro laborum quos ea esse, necessitatibus, dolor cupiditate vel ratione rem. Rerum a reiciendis dolore repellendus, consequuntur at?
        </p>

                  {session ? (
                    <Button><Link href='review'>Leave a review</Link></Button>
                  ) : (
                    <>
                    <h2 className="text-[40px] font-extrabold">
                      Accountless ¿?
                    </h2>
                    <Button><Link href='register'>Click me</Link></Button>
                    </>
                  )}
        
      </div>

      <div className="h-[700px] w-[50%]">
        <div className="h-[10%] w-full flex flex-col justify-center items-center">
        <Button><Link href='converter'>Start</Link></Button>
        </div>
        <>
        <div className="h-[87%] w-[100%] flex flex-col gap-4 overflow-x-hidden overflow-y-scroll">

        {reviews ? 
          reviews.map( review => 
            <div key={review.id} className="h-[30%] w-full flex flex-row gap-4 p-2 shadow-md">
              <div className=" w-[35%] h-full">
                <img className="rounded-full" src={`http://localhost:3000/usersimages/${review.user_image}`} alt="" />
              </div>
              <div className="w-[65%] h-full flex flex-col justify-center items-center gap-2">
                <div className="flex flex-col justify-center items-center">
                  <p>{review.username}</p>
                  <p>{Array.from({ length: Number(review.rating) }, (_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                  </p>
                </div>
                <div>
                  <p>{review.content}</p>
                </div>
              </div>
            </div>
          )
          :
          <div>
            <p>no reviews yet</p>
          </div>
        }
        </div>
        </>
      </div>
      
    </div>
  );
}
