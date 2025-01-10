"use server"

import { signInPath, ticketPath,ticketsPath } from "@/path"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {z} from "zod"
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state"
import { setCookieByKey } from "@/actions/cookies"
import { toCent } from "@/utils/currency"
import { getAuth } from "@/features/auth/queries/get-auth"
import { use } from "react"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner"

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Is required"),
    bounty: z.coerce.number().positive(),
})

export const upsertTicket = async (
    id: string | undefined ,
    _actionState:ActionState,
    formData: FormData
) => {

    const { user } = await getAuthOrRedirect();
    const simpleUser = user ? { id: user.id } : null;


    try {

        if (id) {
            const ticket = await prisma.ticket.findUnique({
              where: {
                id,
              },
            });
      
            if (!ticket || !isOwner(simpleUser, ticket)) {
              return toActionState("ERROR", "Not authorized");
            }
          }

        const data = upsertTicketSchema.parse({
            // id: formData.get("id"),
            title: formData.get("title"),
            content: formData.get("content"),
            deadline: formData.get("deadline"),
            bounty: formData.get("bounty"),
        })

        const dbData = {
            ...data,
            userId: user.id,
            bounty: toCent(data.bounty),
        }
        
        await prisma.ticket.upsert({
            where:{
                id: id || "",
            },
            update: dbData,
            create: dbData,
        })
        
    } catch (error) {
        return fromErrorToActionState(error,formData);
        

    }
  

    revalidatePath(ticketsPath())
    if (id) {
        setCookieByKey("toast","Ticket updated")
        redirect(ticketPath(id))
    }

    return toActionState("SUCCESS","Ticket created")
}