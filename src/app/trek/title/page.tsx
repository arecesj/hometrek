import PageFoundation from "@/components/PageFoundation"
import Title from "@/components/Title";
import { routeNames } from "@/constants/routes";

const TitlePage = () => {
  return (
    <PageFoundation routeName={routeNames.TITLE}>
      <Title />
    </PageFoundation>
  )
}


export default TitlePage;