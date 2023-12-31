type TypographyProps = {
    text: string | number;
}

const Typography: React.FC<TypographyProps> = ({text}) => {
    return (
        <p className="leading-2 [&:not(:first-child)]:mt-3">
            {text}
        </p>
    )
}


export default Typography;