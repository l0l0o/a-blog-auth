import { ChangeEventHandler } from "react";

type InputProps = {
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string,
    name: string,
    type: "text" | "number" | "email" | "tel" | "password",
    placeholder: string
    required?: boolean
}

const Input = ({onChange, value, name, type, placeholder, required}: InputProps) => {
    return <input required={required} onChange={onChange} value={value} name={name} type={type} placeholder={placeholder} />;
}
 
export default Input;