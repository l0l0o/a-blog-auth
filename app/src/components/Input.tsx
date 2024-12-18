import { ChangeEventHandler } from "react";

type InputProps = {
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string,
    name: string,
    type: "text" | "number" | "email" | "tel" | "password",
    placeholder: string
}

const Input = ({onChange, value, name, type, placeholder}: InputProps) => {
    return <input onChange={onChange} value={value} name={name} type={type} placeholder={placeholder} />;
}
 
export default Input;