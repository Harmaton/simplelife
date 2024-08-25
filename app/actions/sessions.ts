import { db } from "@/lib/db"

export const getSession = async (id: string) => {
  
    try {
        const session = await db.session.findUnique({
            where: {
                id: id,
                isPublished: true
            },   
        })
        return {
            session 
        }

    } catch (error) {
        console.log("GET_SESSION",error)
        return {
            session: null
        }
    }

  }