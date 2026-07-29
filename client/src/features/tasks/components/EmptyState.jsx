export default function EmptyState({ message }) {
  return (
    <div className="rounded-[14px] border border-dashed border-[#d1d5db] bg-white/70 px-4 py-8 text-center">
      <p className="text-[13px] font-medium text-[#9ca3af]">{message}</p>
    </div>
  );
}