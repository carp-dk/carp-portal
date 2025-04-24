import React from 'react';
import {StyledContainer, StyledTitle} from "./styles";
import {useParams} from "react-router-dom";
import StackedBarChartWrapper, {StackedBarChartWrapperProps} from "@Components/StackedBarChartWrapper";
import {Box} from '@mui/system';

const chartConfigs: Partial<StackedBarChartWrapperProps>[] = [
    {
        title: "Survey",
        subtitle: "Number of Survey tasks done by this participant.",
        type: "survey",
        headingColor: '#3A82F7'
    },
    {
        title: "Cognitive",
        subtitle: "Number of Cognitive tasks done by this participant.",
        type: "cognition",
        headingColor: '#B25FEA'
    },
    {
        title: "Health",
        subtitle: "Number of Health tasks done by this participant.",
        type: "health",
        headingColor: '#EB4B62'
    },
    {
        title: "Audio",
        subtitle: "Number of Audio tasks done by this participant.",
        type: "audio",
        headingColor: '#67CE67'
    },
    {
        title: "Image/Video",
        subtitle: "Number of Image/Video tasks done by this participant.",
        type: "image",
        headingColor: '#228B89'
    },
    {
        title: "Informed Consent",
        subtitle: "Number of Informed Consent tasks done by this participant.",
        type: "informed_consent",
        headingColor: '#b111ff'
    },
    {
        title: "Sensing",
        subtitle: "Number of Sensing tasks done by this participant.",
        type: "sensing",
        headingColor: '#186537'
    },
]

const DataVisualizationForParticipant = () => {
    const {id: studyId, deploymentId, participantId} = useParams();

    return (
        <StyledContainer>
            <StyledTitle variant="h2">
                Tasks
            </StyledTitle>
            {chartConfigs.map(
                (cfg, index) => (
                    <React.Fragment key={cfg.type}>
                        <StackedBarChartWrapper
                            studyId={studyId}
                            deploymentId={deploymentId}
                            participantId={participantId}
                            type={cfg.type}
                            title={cfg.title}
                            subtitle={cfg.subtitle}
                            headingColor={cfg.headingColor}
                            scope={'participant'}
                        />
                        <Box sx={{p: 2.5}}/>
                    </React.Fragment>
                ))
            }
            <Box sx={{p: 2.5}}/>
        </StyledContainer>
    );
}

export default DataVisualizationForParticipant;