import FindLenders from "@/components/FindLenders";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-beige">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-beige p-4 md:gap-8 md:p-10">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold tracking-tight">
          HomeTrek.ai
        </h1>
      </div>
        <div className="flex justify-center">
          <FindLenders />
        </div>
      </main>
    </div>
  );
}
