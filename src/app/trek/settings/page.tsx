import PageFoundation from "@/components/PageFoundation"
import { trekRouteName } from "@/constants/routes";

const SettingsPage = () => {
  return (
    <PageFoundation routeName={trekRouteName.SETTINGS}>
      Settings Page!
    </PageFoundation>
  )
}


export default SettingsPage;