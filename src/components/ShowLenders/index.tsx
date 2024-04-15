'use client';

import { useSearchParams, redirect } from 'next/navigation'
import { useEffect, useState } from "react";
import Loading from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import { lenders } from "@/constants/lenders";
import { routeNames } from '@/constants/routes';
import PageFoundation from '../PageFoundation';
import PotentialSavings from './PotentialSavings';
import LenderTable from './LenderTable';
import SavingsBreakdown from '../SavingsBreakdown.tsx';

const ShowLenders = () => {
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState<boolean>(true);
  const date = new Date().toDateString();
  
  const userData: UserData = {
    name: searchParams.get("name"),
    state: searchParams.get("state"),
    downPayment: searchParams.get("downPayment")
  }

  const checkSearchParams = () => {
    for (const [key, value] of Object.entries(userData)) {
      if(!value) redirect('/')
    }
    setLoading(false);
  }
  
  
  useEffect(() => {
    checkSearchParams();
  }, [userData])  

  return (
    <>
    {isLoading ? (<Loading />) : (
      <PageFoundation>
          <Header routeName={routeNames.LENDERS} />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <PotentialSavings />
              <LenderTable userData={userData} lenders={lenders} date={date}/>
            </div>
            <SavingsBreakdown userData={userData} date={date}/>
          </main>
      </PageFoundation>
    )}
    </>
  )
}

export default ShowLenders;