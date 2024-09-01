


const PrimaryButton = ({ children, onClick,className }) => {
    return (
        <div className={`rounded-md border border-white text-center bg-primary px-2 text-white hover:bg-blue-400 cursor-pointer duration-100 ${className}`} onClick={onClick}>{children}</div >
    );
}

const SecondaryButton = ({ children, onClick,className }) => {
    return (
        <div className={className+" rounded-md text-center border text-black border-blue-500 px-2 hover:text-blue-600 cursor-pointer duration-100 "} onClick={onClick}>{children}</div >
    );
}

const ThemeButton = ({ children, onClick,className }) => {
    return (
        <div className={"flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80 rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 "+className} onClick={onClick}>{children}</div >
    );
}

export { PrimaryButton, SecondaryButton, ThemeButton };