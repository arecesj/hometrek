import Link from "next/link";
import { X } from "lucide-react";
import { badgeVariants } from "@/components/ui/badge";

const ResetTag = () => {
  return (
    <Link
      className={badgeVariants({
        variant: "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/resources/blog`}
    >
      <div className="flex items-end space-x-0.5">
        <div>
          reset
        </div>
        <X className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}

export default ResetTag
