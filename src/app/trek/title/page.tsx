import PageFoundation from "@/components/PageFoundation"
import { routeNames } from "@/constants/routes";

const TitlePage = () => {
  return (
    <PageFoundation routeName={routeNames.TITLE}>
      Title Page!
    </PageFoundation>
  )
}


export default TitlePage;