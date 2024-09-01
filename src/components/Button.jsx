


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

export { PrimaryButton, SecondaryButton };