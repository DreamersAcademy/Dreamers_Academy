import { Skeleton } from "./skeleton";

export function Loader({ className }) {
  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-purple-600 ${className || "w-6 h-6"}`}></div>
    </div>
  );
}

export function ButtonLoader() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader className="w-4 h-4" />
      <span>Processing...</span>
    </div>
  );
}
