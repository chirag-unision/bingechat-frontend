


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

// const GreenButton = ({ children, onClick,className }) => {
//     return (
//         <div className={`rounded-md text-center bg-[#0a0] px-2 text-white hover:bg-[#080] cursor-pointer duration-100 ${className}`} onClick={onClick}>{children}</div >
//     );
// }

const ThemeButton = ({ disabled=false, type= "button", children, onClick,className }) => {
    return (
        <button disabled={disabled} type={type} className={"flex justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 "+className} onClick={onClick}>{children}</button >
    );
}

const GreenButton = ({ disabled=false, type= "button", children, onClick,className }) => {
    return (
        <button disabled={disabled} type={type} className={"flex justify-center border-b border-[#0c900ce6] bg-gradient-to-b from-[#00aa0021] p-2 backdrop-blur-2xl dark:border-[#0c900ce6] dark:bg-[#00aa0021] dark:from-inherit lg:static rounded-xl lg:border lg:bg-[#00aa0021] lg:dark:bg-[#00aa0021] "+className} onClick={onClick}>{children}</button >
    );
}

const RedButton = ({ disabled=false, type= "button", children, onClick,className }) => {
    return (
        <button disabled={disabled} type={type} className={"flex justify-center border-b border-[#900c0ce6] bg-gradient-to-b from-[#aa000021] p-2 backdrop-blur-2xl dark:border-[#900c0ce6] dark:bg-[#aa000021] dark:from-inherit lg:static rounded-xl lg:border lg:bg-[#aa000021] lg:dark:bg-[#aa000021] "+className} onClick={onClick}>{children}</button >
    );
}

const PrimaryButton = ({ disabled=false, type= "button", children, onClick,className }) => {
    return (
        <button disabled={disabled} type={type} className={"flex justify-center border-b border-[#0577f1e6] bg-gradient-to-b from-[#0577f13c] p-2 backdrop-blur-2xl dark:border-[#0577f1e6] dark:bg-[#0577f13c] dark:from-inherit lg:static rounded-xl lg:border lg:bg-[#0577f13c] lg:dark:bg-[#0577f13c] "+className} onClick={onClick}>{children}</button >
    );
}

export { PrimaryButton, SecondaryButton, GreenButton, RedButton, ThemeButton };