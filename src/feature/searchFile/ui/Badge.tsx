type BadgeProps = {
    status: "승인" | "반려" | "미승인";
  };
  
const Badge = ({ status }: BadgeProps) => {
  const statusStyles = {
    승인: "bg-green-100 text-green-700",
    반려: "bg-red-100 text-red-700",
    미승인: "bg-gray-100 text-gray-700",
  };
  
  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded ${statusStyles[status]}`}>
      {status}
    </span>
  );
};
  
export default Badge;
