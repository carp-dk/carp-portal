import GeneratedAccountLabel from '@Components/GeneratedAccountLabel';
import {
  useInviteParticipants,
  useParticipants,
} from '@Utils/queries/participants';
import { useStudyDetails } from '@Utils/queries/studies';
import { getRandomNumber } from '@Utils/utility';
import {
  EmailAccountIdentity,
  ParticipantAccountSummaryDto,
  ParticipantWithRoles,
  UsernameAccountIdentity,
} from '@carp-dk/client';
import {
  FormControl,
  MenuItem,
  Modal,
  SelectChangeEvent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  CancelButton,
  DoneButton,
  HeaderTableCell,
  HeaderText,
  Hint,
  ModalActions,
  ModalBox,
  ModalContent,
  ModalDescription,
  ModalTitle,
  PrimaryCellText,
  SecondaryCellText,
  StyledDivider,
  StyledList,
  StyledSelect,
  StyledTableContainer,
  StyledTableRow,
} from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  participantsToAdd: ParticipantAccountSummaryDto[];
};

const AddNewDeploymentModal = ({ open, onClose, participantsToAdd }: Props) => {
  const { id: studyId } = useParams();
  const inviteParticipants = useInviteParticipants(studyId);
  const { data: participants, isLoading: isParticipantsLoading } =
    useParticipants(studyId);
  const { data: studyDetails, isLoading: isStudyDetailsLoading } =
    useStudyDetails(studyId);
  const [participantDeviceRoleNames, setParticipantDeviceRoleNames] = useState(
    {},
  );
  const handleRoleChange = (participantId: string, assignedRoles: string[]) => {
    setParticipantDeviceRoleNames((prevState) => ({
      ...prevState,
      [participantId.toLocaleLowerCase()]: assignedRoles,
    }));
  };

  useEffect(() => {
    onClose();
  }, [inviteParticipants.isSuccess]);

  useEffect(() => {
    setParticipantDeviceRoleNames({});
  }, [open]);
  const createNewGroupHandler = () => {
    const participantIdentifiers = participantsToAdd.map((participant) =>
      participant.accountIdentity.toLocaleLowerCase(),
    );
    const participantsToAddRows = participants.filter((participant) =>
      participantIdentifiers.includes(
        (participant.accountIdentity instanceof EmailAccountIdentity &&
          participant.accountIdentity.emailAddress.address.toLowerCase()) ||
          (participant.accountIdentity instanceof UsernameAccountIdentity &&
            participant.accountIdentity.username.name.toLowerCase()),
      ),
    );
    const participantsWithRoles: ParticipantWithRoles[] =
      participantsToAddRows.map((participant) => {
        const identity =
          participant.accountIdentity instanceof EmailAccountIdentity
            ? participant.accountIdentity.emailAddress.address.toLowerCase()
            : (
                participant.accountIdentity as UsernameAccountIdentity
              ).username.name.toLowerCase();
        return {
          id: participant.id.stringRepresentation,
          assignedRoles: participantDeviceRoleNames[identity],
        };
      });
    inviteParticipants.mutate(participantsWithRoles);
  };
  if (isStudyDetailsLoading) return null;

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <ModalBox sx={{ boxShadow: 24 }}>
        <FormControl variant="outlined">
          <ModalTitle variant="h2" id="modal-modal-title">
            Add new deployment
          </ModalTitle>
          {studyDetails.protocolSnapshot?.participantRoles
            ?.toArray()
            .some((role) => !role.isOptional) && (
            <ModalDescription variant="h5" id="modal-modal-description">
              The following participant roles are required in the protocol:
            </ModalDescription>
          )}
          <StyledList>
            {studyDetails.protocolSnapshot?.participantRoles
              .toArray()
              .map((role) => {
                if (!role.isOptional) {
                  return <li key={role.role}>{role.role}</li>;
                }
                return null;
              })}
          </StyledList>
          {studyDetails.protocolSnapshot?.participantRoles
            ?.toArray()
            .some((role) => role.isOptional) && (
            <ModalDescription variant="h5" id="modal-modal-description">
              The following participant roles are optional in the protocol:
            </ModalDescription>
          )}
          <StyledList>
            {studyDetails.protocolSnapshot?.participantRoles
              .toArray()
              .map((role) => {
                if (role.isOptional) {
                  return <li key={role.role}>{role.role}</li>;
                }
                return null;
              })}
          </StyledList>

          <ModalContent>
            <StyledTableContainer>
              <Table
                style={{ tableLayout: 'fixed' }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <StyledTableRow>
                    <HeaderTableCell>
                      <HeaderText variant="h4">Indentifier</HeaderText>
                    </HeaderTableCell>
                    <HeaderTableCell>
                      <HeaderText variant="h4">Full name</HeaderText>
                    </HeaderTableCell>
                    <HeaderTableCell>
                      <HeaderText variant="h4">Participant role</HeaderText>
                    </HeaderTableCell>
                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {isParticipantsLoading || isStudyDetailsLoading
                    ? [1, 2, 3].map(() => (
                        <StyledTableRow key={uuidv4()}>
                          <TableCell>
                            <Skeleton
                              animation="wave"
                              width={`${getRandomNumber(40, 70)}%`}
                            />
                          </TableCell>
                          <TableCell>
                            <Skeleton
                              animation="wave"
                              width={`${getRandomNumber(40, 90)}%`}
                            />
                          </TableCell>
                        </StyledTableRow>
                      ))
                    : participantsToAdd.map((participant) => (
                        <StyledTableRow key={participant.accountIdentity}>
                          <TableCell>
                            <PrimaryCellText variant="h5">
                              {participant.accountIdentity}
                            </PrimaryCellText>
                          </TableCell>
                          <TableCell>
                            <PrimaryCellText variant="h5">
                              {/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                                participant.accountIdentity,
                              ) ? (
                                <GeneratedAccountLabel />
                              ) : (
                                `${participant.firstName ?? ''} ${participant.lastName ?? ''}`
                              )}
                            </PrimaryCellText>
                          </TableCell>
                          <TableCell sx={{ position: 'relative' }}>
                            <FormControl fullWidth>
                              <StyledSelect
                                labelId="role-select-label"
                                id="role-select"
                                value={
                                  participantDeviceRoleNames[
                                    participant.accountIdentity.toLowerCase()
                                  ] || ''
                                }
                                onChange={(event: SelectChangeEvent) =>
                                  handleRoleChange(
                                    participant.accountIdentity.toLowerCase(),
                                    [event.target.value],
                                  )
                                }
                              >
                                {studyDetails.protocolSnapshot.participantRoles
                                  .toArray()
                                  .map((participantRole) => (
                                    <MenuItem
                                      key={participantRole.role}
                                      value={participantRole.role}
                                    >
                                      <SecondaryCellText variant="h5">
                                        {participantRole.role}
                                      </SecondaryCellText>
                                    </MenuItem>
                                  ))}
                              </StyledSelect>
                            </FormControl>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
              <StyledDivider />
              <Hint variant="h6">
                Participants will be automatically invited to the study once you
                add them to a new deployment.
              </Hint>
            </StyledTableContainer>
          </ModalContent>
          <ModalActions>
            <CancelButton variant="text" onClick={onClose}>
              Cancel
            </CancelButton>
            <DoneButton
              variant="contained"
              sx={{ elevation: 0 }}
              onClick={createNewGroupHandler}
              disabled={
                Object.keys(participantDeviceRoleNames).length <
                participantsToAdd.length
              }
            >
              New deployment
            </DoneButton>
          </ModalActions>
        </FormControl>
      </ModalBox>
    </Modal>
  );
};

export default AddNewDeploymentModal;
