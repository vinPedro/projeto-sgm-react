function Campo({ label, type = "text", value, onChange, autoComplete }) {
  return (
    <>
      <label className="text-gray-600">{label}</label><br />
      <input className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"

        autoComplete={autoComplete}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Campo;