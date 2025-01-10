"use client";
import { useActionState } from "react";
import { signIn } from "../actions/sign-in";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="phoneNumber"
        placeholder="电话号码"
        defaultValue={actionState.payload?.get("phoneNumber") as string}
      />
      <FieldError actionState={actionState} name="phoneNumber" />

      <Input
        type="password"
        name="password"
        placeholder="密码"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton label="登录" />
    </Form>
  );
};

export { SignInForm };
