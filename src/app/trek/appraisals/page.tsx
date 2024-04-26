import Appraisals from "@/components/Appraisals";
import PageFoundation from "@/components/PageFoundation"
import { trekRouteName } from "@/constants/routes";

const AppraisalsPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.APPRAISALS}>
    <Appraisals />
    </PageFoundation>
  )
}


export default AppraisalsPage;