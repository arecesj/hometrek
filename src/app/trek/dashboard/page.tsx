import PageFoundation from "@/components/PageFoundation"
import { routeNames } from "@/constants/routes";

const DashboardPage = () => {
  return (
    <PageFoundation routeName={routeNames.DASHBOARD}>
    Dashboard Page!
    </PageFoundation>
  )
}


export default DashboardPage;