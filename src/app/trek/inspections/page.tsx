import PageFoundation from "@/components/PageFoundation";
import Inspections from "@/components/Inspections";
import { trekRouteName } from "@/constants/routes";

const InspectionsPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.INSPECTIONS}>
      <Inspections />
    </PageFoundation>
  )
}


export default InspectionsPage;