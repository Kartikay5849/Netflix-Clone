import {NextApiRequest,NextApiResponse} from 'next';
import serverAuth from '@/lib/serverAuth';
import prismadb from "../../../lib/prismadb"
import { method } from 'lodash';

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    try{
    if(req.method!=='GET'){
        throw new Error("Invalid ID");
    }
    await serverAuth(req,res);
    const {movieId}=req.query;
    if(typeof movieId!=='string'){
        throw new Error("Invalid iD");

    }
    if (!movieId) {
        throw new Error('Missing Id');
    }
    const movies=await prismadb.movie.findUnique({
        where:{
            id:movieId
        }
    }); return res.status(200).json(movies);
} catch (error) {
  console.log(error);
  return res.status(500).end();
}
}