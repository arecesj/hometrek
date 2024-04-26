import PageFoundation from "@/components/PageFoundation"
import Title from "@/components/Title";
import { trekRouteName } from "@/constants/routes";

const TitlePage = () => {
  return (
    <PageFoundation routeName={trekRouteName.TITLE}>
      <Title />
    </PageFoundation>
  )
}


export default TitlePage;