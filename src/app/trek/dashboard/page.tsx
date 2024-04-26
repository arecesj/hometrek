import PageFoundation from "@/components/PageFoundation"
import { trekRouteName } from "@/constants/routes";

const DashboardPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.DASHBOARD}>
    Dashboard Page!
    </PageFoundation>
  )
}


export default DashboardPage;