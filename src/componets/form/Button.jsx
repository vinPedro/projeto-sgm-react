function Button({ children, type = "submit", onClick, color }) { 

    return (
        <div className="text-center">
            <button 

                className={`shadow-xl w-[20vw] min-w-[100px] max-w-[150px] rounded-[10px] p-[8px] mt-[10px] m-[10px] text-white ${color ? 'hover:bg-gray-600' : 'hover:bg-secundaria'} ${color ? 'bg-gray-400' : 'bg-primaria'}`}
                type={type}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    );
}

export default Button