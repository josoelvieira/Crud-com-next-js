interface BotaoProps {
    cor?: "blue" | "red" | "green" 
    children: any 
    onClick?: () => void
}

export default function Botao(props: BotaoProps) {
    return (
        <button onClick={props.onClick} className="bg-gradient-to-r from-blue-400 to-blue-700 rounded-full px-4 py-2 my-2">
            {props.children}
        </button>
    )
}