export default function LoadingSkeleton({ count = 1, className = '', height = 'h-32' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${height} ${className}`} />
      ))}
    </>
  );
}
