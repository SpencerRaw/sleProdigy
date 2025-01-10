import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return (
    <span
      style={{
        fontSize: "0.75rem", // 12px
        lineHeight: "1rem", // 16px
        color: "rgb(239, 68, 68)", // #ef4444
      }}
    >
      {message}
    </span>
  );
};

export { FieldError };
