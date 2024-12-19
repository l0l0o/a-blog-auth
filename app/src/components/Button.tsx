type ButtonProps = {
    type?: "submit"
    onClick: React.MouseEventHandler<HTMLButtonElement>
    text: string
}

const Button = ({type, onClick, text}: ButtonProps) => {
    return <button type={type} onClick={onClick}>{text}</button>
;
}
 
export default Button;