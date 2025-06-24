function Campo({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-gray-600">{label}</label><br />
      <input
        className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-green-500 focus:outline-none rounded w-full"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Campo;