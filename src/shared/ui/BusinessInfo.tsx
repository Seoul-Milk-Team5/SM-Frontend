export default function BusinessInfo({ label, name }: { label: string; name: string }) {
  return(
    <div className="flex flex-col items-center">
      <span className="text-body-md text-gray-300">{label}</span>
      <div className="text-title-sm text-gray-800">{name}</div>
    </div>    
  );
};