export function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border border-black p-6 rounded-lg">
      <p className="text-xs font-bold uppercase">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}