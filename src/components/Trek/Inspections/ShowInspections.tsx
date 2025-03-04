'use client'

import InspectionsTable from "./InspectionsTable";
import SavingsBreakdown from "../SavingsBreakdown.tsx";

const ShowInspections = () => {
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <InspectionsTable />
        </div>
        <SavingsBreakdown />
      </main>
    </div>
  )
}

export default ShowInspections