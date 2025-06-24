function ButtonSubmit({ text, type = "submit" }) {
    return (
        <div className="text-center">
            <button type={type} className="bg-green-500 w-[200px] rounded-[10px] p-[8px] text-white hover:bg-green-600">{text}</button>
        </div>
    );
}

export default ButtonSubmit