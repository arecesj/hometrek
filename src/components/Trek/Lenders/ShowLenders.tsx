'use client'

import LendersTable from './LendersTable';
import { useAppContext } from '@/context';
import { lenders as lendersConst } from '@/constants/lenders';
import SavingsBreakdown from '../SavingsBreakdown.tsx';


const ShowLenders = () => {
  const { trekContext: { user, lenders } } = useAppContext();
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start md:gap-8 lg:col-span-2">
          <LendersTable user={user} lenders={lenders} fakeLenders={lendersConst} />
        </div>
        <SavingsBreakdown />
      </main>
    </>
  )
}

export default ShowLenders;