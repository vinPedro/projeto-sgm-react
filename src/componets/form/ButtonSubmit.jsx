function ButtonSubmit({ text, type = "submit" }) {
    return (
        <div className="text-center">
            <button type={type} className="bg-primaria w-[200px] rounded-[10px] p-[8px] mt-[10px] text-white hover:bg-secundaria">{text}</button>
        </div>
    );
}

export default ButtonSubmit