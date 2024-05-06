import { FC } from "react";
import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "@/components/ui/badge";

type TagProps = {
  tag: string;
  current?: boolean;
  count?: number;
}
const Tag: FC<TagProps> = ({ tag, current, count }: TagProps) => {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/resources/blog/tags/${slug(tag)}`}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}

export default Tag
