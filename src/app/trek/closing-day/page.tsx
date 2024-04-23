import ClosingDay from "@/components/ClosingDay";
import PageFoundation from "@/components/PageFoundation"
import { routeNames } from "@/constants/routes";

const ClosingDayPage = () => {
  return (
    <PageFoundation routeName={routeNames.CLOSINGDAY}>
      <ClosingDay />
    </PageFoundation>
  )
}


export default ClosingDayPage;