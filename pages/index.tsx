import { NextPageContext } from "next/types"
import {getSession,signOut} from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() {
  const {data:user}=useCurrentUser();
  return (
   <div>
   <h1 className="text-4xl text-blue-400"> Netflix </h1>
   <p className="text-2xl p-4 text-gray-200">Logged in as {user?.name}</p>
   <button onClick={()=>signOut()} className="w-full text-3xl p-3 h-auto bg-red-300 text-white text-cecnter" >Logout</button>
   </div>
  )
}
