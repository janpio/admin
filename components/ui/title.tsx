type TitleProps = {
    variant: "H2" | "H3" | "H4" | "H5" | "H6";
    text: string;
}

const Title: React.FC<TitleProps> = ({variant, text}) => {
    return (
        <div>
            {variant === "H2" && <h2 className="text-2xl font-bold">{text}</h2>}
            {variant === "H3" && <h3 className="text-xl font-bold">{text}</h3>}
            {variant === "H4" && <h4 className="text-lg font-bold">{text}</h4>}
            {variant === "H5" && <h5 className="text-base font-bold">{text}</h5>}
            {variant === "H6" && <h6 className="text-sm font-bold">{text}</h6>}
        </div>
    )
}

export default Title;