import {AccountIcon, Initials} from "../ResearcherItem/styles";
import {Skeleton, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useResearchers, useStudyDetails} from "@Utils/queries/studies";
import CarpErrorCardComponent from "@Components/CarpErrorCardComponent";
import {RightWrapper, Wrapper} from "../StudyData/styles";

const StudyOwner = () => {
    const {id: studyId} = useParams();
    const {
        data: researchers,
        isLoading: researchersLoading,
        error: researchersError,
    } = useResearchers(studyId);

    const {
        data: studyDetails,
        isLoading: studyDetailsLoading,
        error: studyDetailsError,
    } = useStudyDetails(studyId);

    if (researchersLoading || studyDetailsLoading) {
        return <Skeleton height="68px" width="220px" animation="wave"/>;
    }

    if (researchersError || studyDetailsError) {
        return (
            <CarpErrorCardComponent
                message="An error occurred while loading study owner details"
                error={researchersError ?? studyDetailsError}
            />
        );
    }

    const studyOwner = researchers.find(researcher => researcher.id == studyDetails.ownerId.stringRepresentation);

    return (
        <Wrapper>
            <AccountIcon>
                <Initials variant="h3">
                    {!studyOwner.firstName || !studyOwner.lastName
                        ? studyOwner.role[0]
                        : `${studyOwner.firstName[0]}${studyOwner.lastName[0]}`}
                </Initials>
            </AccountIcon>
            <RightWrapper>
                <Typography variant="h4" sx={{marginBottom: "8px"}}>
                    Study owner:
                </Typography>
                <Typography variant="h5" color={"textSecondary"}>
                    {studyOwner.firstName} {studyOwner.lastName}
                </Typography>
                <Typography variant="h5" color={"textSecondary"}>
                    {studyOwner.email}
                </Typography>
            </RightWrapper>
        </Wrapper>
    );
}

export default StudyOwner;