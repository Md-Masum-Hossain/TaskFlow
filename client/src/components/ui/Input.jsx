export default function Input({ label, id, className = '', ...props }) {
  return (
    <div>
      {label ? (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#344054]">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`h-11 w-full rounded-xl border border-[#d0d5dd] bg-white px-3 text-sm text-[#101828] outline-none placeholder:text-[#98a2b3] focus:border-[#2563eb] ${className}`}
        {...props}
      />
    </div>
  );
}
