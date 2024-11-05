import StudyPageLayout from "@Components/Layout/StudyPageLayout";
import StudyHeader from "@Components/StudyHeader";
import { useTranslation } from "react-i18next";
import BasicInfo from "./BasicInfo";
import Participants from "./Participants";
import InformedConsentCard from "./InformedConsentCard";
import Devices from "./Devices";

const Deployment = () => {
  const { t } = useTranslation();

  const sectionName = ["Deployments", "Deployment"];
  const description = t("deployment:page_description");

  return (
    <StudyPageLayout>
      <StudyHeader path={sectionName} description={description} />
      <BasicInfo />
      <Participants />
      <Devices />
      <InformedConsentCard />
    </StudyPageLayout>
  );
};

export default Deployment;
