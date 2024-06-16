import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

type ButtonProps = {
  label?: string;
} & Omit<AntdButtonProps, "children">;

export const Button = ({ label, ...props }: ButtonProps) => {
  return <AntdButton {...props}>{label}</AntdButton>;
};
