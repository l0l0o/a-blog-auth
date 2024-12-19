type CardProps = {
    imageUrl: string,
    title: string,
    description: string
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const Card = ({imageUrl, title, description, onClick}: CardProps) => {
    return ( 
        <div onClick={onClick}>
            <img src={imageUrl} alt="" />
            <p>{title}</p>
            <p>{description}</p>
        </div>
    );
}

export default Card;