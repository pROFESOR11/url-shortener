import React from "react";
import { Input, InputOnChangeData, InputProps } from "semantic-ui-react";

interface TextInputProps {
  color:
    | "red"
    | "orange"
    | "yellow"
    | "olive"
    | "green"
    | "teal"
    | "blue"
    | "violet"
    | "purple"
    | "pink"
    | "brown"
    | "grey"
    | "black"
    | undefined;
  placeholder?: string;
  focus?: boolean;
  icon: string;
  iconText: string;
  actionDisabled?: boolean;
  value: string;
  onActionClick?: () => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
}

export const TextInput: React.FC<TextInputProps & Partial<InputProps>> = ({
  color,
  placeholder = "",
  focus = false,
  icon,
  onActionClick,
  iconText,
  actionDisabled = false,
  ...rest
}) => {
  return (
    <Input
      focus={focus}
      placeholder={placeholder}
      action={{
        color,
        labelPosition: "right",
        icon,
        content: iconText,
        onClick: onActionClick,
        disabled: actionDisabled,
      }}
      {...rest}
    />
  );
};
