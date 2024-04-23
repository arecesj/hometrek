import Insurance from "@/components/Insurance";
import PageFoundation from "@/components/PageFoundation"
import { routeNames } from "@/constants/routes";

const InsurancePage = () => {
  return (
    <PageFoundation routeName={routeNames.INSURANCE}>
      <Insurance />
    </PageFoundation>
  )
}


export default InsurancePage;