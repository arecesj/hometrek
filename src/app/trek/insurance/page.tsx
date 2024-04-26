import Insurance from "@/components/Trek/Insurance";
import PageFoundation from "@/components/PageFoundation"
import { trekRouteName } from "@/constants/routes";

const InsurancePage = () => {
  return (
    <PageFoundation routeName={trekRouteName.INSURANCE}>
      <Insurance />
    </PageFoundation>
  )
}


export default InsurancePage;