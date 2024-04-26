import ClosingDay from "@/components/Trek/ClosingDay";
import PageFoundation from "@/components/PageFoundation"
import { trekRouteName } from "@/constants/routes";

const ClosingDayPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.CLOSINGDAY}>
      <ClosingDay />
    </PageFoundation>
  )
}


export default ClosingDayPage;