export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const variantClasses = {
    primary: 'bg-[#2563eb] text-white border-[#2563eb]',
    secondary: 'bg-white text-[#344054] border-[#d0d5dd]',
    danger: 'bg-[#d92d20] text-white border-[#d92d20]',
  };

  return (
    <button
      type={type}
      className={`inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
