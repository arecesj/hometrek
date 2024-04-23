import { routeNames } from "@/constants/routes";
import PageFoundation from "@/components/PageFoundation";
import Inspections from "@/components/Inspections";

const InspectionsPage = () => {
  return (
    <PageFoundation routeName={routeNames.INSPECTIONS}>
      <Inspections />
    </PageFoundation>
  )
}


export default InspectionsPage;