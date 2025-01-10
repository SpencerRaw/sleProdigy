"use server";
import { ActionState, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { redirect } from "next/navigation";
import { z } from "zod";
import {verify} from "@node-rs/argon2"
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";

const signInSchema = z.object({
    // email: z.string().min(1, { message: "Is required" }).max(191).email(),
    phoneNumber: z.string().min(1, { message: "Is required" }).max(15, { message: "Must be 15 characters or less" }).regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
    password: z.string().min(6).max(191),
  });

  export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try {
      const { phoneNumber, password } = signInSchema.parse(
        Object.fromEntries(formData)
      );

      const user = await prisma.user.findUnique({
        where: { phoneNumber },
      });

      if (!user) {
        return toActionState("ERROR", "手机或者密码错误",formData);
      }

      const validPassword = await verify(user.passwordHash, password);

      if (!validPassword) {
        return toActionState("ERROR", "手机或者密码错误",formData);
      }

      const session = await lucia.createSession(user.id,{});
      const sessionCookie = lucia.createSessionCookie(session.id);

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );


    } catch (error) {
        return fromErrorToActionState(error, formData);
      }
      redirect(ticketsPath());
    
    }