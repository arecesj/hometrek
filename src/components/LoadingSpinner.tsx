'use client';

import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <LoaderCircle className="my-28 h-16 w-16 text-primary/60 animate-spin"/>
    </div>
  )
}
export default Loading;