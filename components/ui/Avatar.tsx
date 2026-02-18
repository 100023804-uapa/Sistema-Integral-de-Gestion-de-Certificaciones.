import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  status?: "online" | "offline" | "busy";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={fallback}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 font-bold text-gray-600">
            {fallback.substring(0, 2).toUpperCase()}
          </div>
        )}
        
        {status && (
          <span className={cn(
            "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
            status === "online" ? "bg-green-500" : status === "busy" ? "bg-red-500" : "bg-gray-400"
          )} />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
