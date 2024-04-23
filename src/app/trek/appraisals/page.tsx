import Appraisals from "@/components/Appraisals";
import PageFoundation from "@/components/PageFoundation"
import { routeNames } from "@/constants/routes";

const AppraisalsPage = () => {
  return (
    <PageFoundation routeName={routeNames.APPRAISALS}>
    <Appraisals />
    </PageFoundation>
  )
}


export default AppraisalsPage;