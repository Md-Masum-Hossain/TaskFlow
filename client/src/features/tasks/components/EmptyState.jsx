export default function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#d0d5dd] bg-[#f9fafb] px-4 py-8 text-center">
      <p className="text-sm font-medium text-[#667085]">{message}</p>
    </div>
  );
}