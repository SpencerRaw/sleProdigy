"use client";

import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { signUp } from "../actions/sign-up";
import { Form } from "@/components/form/form";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="用户名"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />

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

      <Input
        type="password"
        name="confirmPassword"
        placeholder="确定密码"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="注册" />
    </Form>
  );
};

export { SignUpForm };
