import { db } from "@/lib/db";

type GetEventProps = {
    id: string;
}

export const getEvent = async ({
    id
  }: GetEventProps) => {


    try{
        const event = await db.inHouseEvent.findUnique({
            where: {
                id: id
            }
        })

        return {event}
    } catch (error){
        console.log("[GET_EVENTS_ACTIONS]", error)
        return {event: null}
    }
}