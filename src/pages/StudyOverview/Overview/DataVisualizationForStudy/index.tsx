import React from 'react';
import {StyledContainer, StyledTitle} from "./styles";
import {useParams} from "react-router-dom";
import StackedBarChartWrapper from "@Components/StackedBarChartWrapper";
import {Box} from '@mui/system';

const chartConfigs = [
    {
        title: "Survey",
        subtitle: "Number of Survey tasks done by this participant.",
        type: "survey"
    },
    {
        title: "Cognitive",
        subtitle: "Number of Cognitive tasks done by this participant.",
        type: "cognitive"
    },
    {
        title: "Health",
        subtitle: "Number of Health tasks done by this participant.",
        type: "health"
    },
    {
        title: "Audio",
        subtitle: "Number of Audio tasks done by this participant.",
        type: "audio"
    },
    {
        title: "Image",
        subtitle: "Number of Image tasks done by this participant.",
        type: "image"
    },
    {
        title: "Video",
        subtitle: "Number of Video tasks done by this participant.",
        type: "video"
    },
    {
        title: "Informed Consent",
        subtitle: "Number of Informed Consent tasks done by this participant.",
        type: "informed_consent"
    },
    {
        title: "Sensing",
        subtitle: "Number of Sensing tasks done by this participant.",
        type: "sensing"
    }
]

const DataVisualizationForStudy = () => {
    const {id: studyId} = useParams();

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
                            type={cfg.type}
                            title={cfg.title}
                            subtitle={cfg.subtitle}
                        />
                        <Box sx={{p: 2.5}}/>
                    </React.Fragment>
                ))
            }
            <StackedBarChartWrapper
                title={"Survey"}
                subtitle={"Number of Survey tasks done by this participant."}
                type={"survey"}
                studyId={studyId}
            />
            <Box sx={{p: 2.5}}/>
        </StyledContainer>
    );
}

export default DataVisualizationForStudy;