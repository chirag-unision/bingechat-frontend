


// const PrimaryButton = ({ children, onClick,className }) => {
//     return (
//         <div className={`rounded-md border border-white text-center bg-primary px-2 text-white hover:bg-blue-400 cursor-pointer duration-100 ${className}`} onClick={onClick}>{children}</div >
//     );
// }

const SecondaryButton = ({ children, onClick,className }) => {
    return (
        <div className={className+" rounded-md text-center border text-black border-blue-500 px-2 hover:text-blue-600 cursor-pointer duration-100 "} onClick={onClick}>{children}</div >
    );
}

const GreenButton = ({ children, onClick,className }) => {
    return (
        <div className={`rounded-md text-center bg-[#0a0] px-2 text-white hover:bg-[#080] cursor-pointer duration-100 ${className}`} onClick={onClick}>{children}</div >
    );
}

const ThemeButton = ({ children, onClick,className }) => {
    return (
        <div className={"flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 "+className} onClick={onClick}>{children}</div >
    );
}

// const ThemeButton = ({ children, onClick,className }) => {
//     return (
//         <div className={"flex w-full justify-center border-b border-[#00aa00e6] bg-gradient-to-b from-[#00aa0030] p-2 backdrop-blur-2xl dark:border-[#00aa00d0] dark:bg-[#00aa0030] dark:from-inherit lg:static lg:w-80 rounded-xl lg:border lg:bg-[#00aa0030] lg:dark:bg-[#00aa0030] "+className} onClick={onClick}>{children}</div >
//     );
// }

const PrimaryButton = ({ children, onClick,className }) => {
    return (
        <div className={"flex justify-center border-b border-[#0577f1e6] bg-gradient-to-b from-[#0577f13c] p-2 backdrop-blur-2xl dark:border-[#0577f1e6] dark:bg-[#0577f13c] dark:from-inherit lg:static rounded-xl lg:border lg:bg-[#0577f13c] lg:dark:bg-[#0577f13c] "+className} onClick={onClick}>{children}</div >
    );
}

export { PrimaryButton, SecondaryButton, GreenButton, ThemeButton };