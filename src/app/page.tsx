import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FindLenders from "@/components/FindLenders";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-beige">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-beige p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <FindLenders />
        </div>
      </main>
    </div>
  );
}
