import React, { FC, useEffect, useState } from 'react'
import { Box, Modal, Paper, Stack, Typography } from '@mui/material'
import CCTable from '../../atoms/CCTable'
import { pathNames } from '../../routes/pathNames'
import CCTableSkeleton from '../../atoms/CCTableSkeleton'
import NoData from '../../atoms/NoData/NoData'
import TabSelector from '../../atoms/TabSelector/TabSelector'
import LimitedText from '../../atoms/LimitedText/LimitedText'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useVerifierDashboardTable } from '../../hooks/useVerifierDashboardTable'
import {
  setVerifierAcceptedProjects,
  setVerifierNewProjects,
  setVerifierRegisteredProjects,
  setVerifierRejectedProjects,
} from '../../redux/Slices/Dashboard/dashboardSlice'
import CCButton from '../../atoms/CCButton'
import {
  setVerifierTableNewTabModal,
  setVerifierTableNewTabModalActionData,
  setVerifierTableNewTabModalMsg,
} from '../../redux/Slices/verifierSlice'
import { setRetryFunction } from '../../redux/Slices/blockchainStatusModalSlice'

interface ListOfProjectsProps {
  data?: any
}

let index = 0
const headingsNew = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]
const headingsAccepted = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="Action" />,
  <LimitedText key={index++} text="" />,
]
const headingsRegistered = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="" />,
]
const headingsRejected = [
  <LimitedText key={index++} text="Reference ID" />,
  <LimitedText key={index++} text="Recieved On" />,
  <LimitedText key={index++} text="Last Updated On" />,
  <LimitedText key={index++} text="Project Developer" />,
  <LimitedText key={index++} text="Project Name" />,
  <LimitedText key={index++} text="Location" />,
  <LimitedText key={index++} text="Project Status" widthLimit="250px" />,
  <LimitedText key={index++} text="" />,
]

const ListOfProjects: FC<ListOfProjectsProps> = (props) => {
  const dispatch = useAppDispatch()
  const [tabIndex, setTabIndex] = useState(1)

  const cachedVerifierDashboardProjects = useAppSelector(
    ({ caching }) => caching.cachedVerifierDashboardProjects,
    shallowEqual
  )
  const verifierDashboardTableLoading = useAppSelector(
    ({ verifier }) => verifier.verifierDashboardTableLoading,
    shallowEqual
  )

  const verifierTableNewTabModal = useAppSelector(
    ({ verifier }) => verifier.verifierTableNewTabModal
  )
  const verifierTableNewTabModalMsg = useAppSelector(
    ({ verifier }) => verifier.verifierTableNewTabModalMsg
  )
  const verifierTableNewTabModalActionData = useAppSelector(
    ({ verifier }) => verifier.verifierTableNewTabModalActionData
  )

  const verifierNewProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierNewProjects,
    shallowEqual
  )
  const verifierAcceptedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierAcceptedProjects,
    shallowEqual
  )

  const verifierRegisteredProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRegisteredProjects,
    shallowEqual
  )

  const verifierRejectedProjects = useAppSelector(
    ({ dashboard }) => dashboard.verifierRejectedProjects,
    shallowEqual
  )

  console.log({
    verifierNewProjects,
    verifierAcceptedProjects,
    verifierRegisteredProjects,
    verifierRejectedProjects,
  })

  const { verifierTabWiseData, updateVerifierStatus } =
    useVerifierDashboardTable()

  useEffect(() => {
    if (
      cachedVerifierDashboardProjects &&
      cachedVerifierDashboardProjects.length
    ) {
      const { newData, acceptedData, registeredData, rejectedData } =
        verifierTabWiseData()

      console.log({ newData, acceptedData, registeredData, rejectedData })

      if (newData.length) {
        dispatch(setVerifierNewProjects(newData))
      } else {
        dispatch(setVerifierNewProjects([]))
      }

      if (registeredData.length) {
        dispatch(setVerifierRegisteredProjects(registeredData))
      } else {
        dispatch(setVerifierRegisteredProjects([]))
      }

      if (acceptedData.length) {
        dispatch(setVerifierAcceptedProjects(acceptedData))
      } else {
        dispatch(setVerifierAcceptedProjects([]))
      }
      if (rejectedData.length) {
        dispatch(setVerifierRejectedProjects(rejectedData))
      } else {
        dispatch(setVerifierRejectedProjects([]))
      }
    }
  }, [cachedVerifierDashboardProjects])

  const renderDashboardTableTabData = (selectedTab: any) => {
    let heading, row, projectType

    switch (selectedTab) {
      case 1: {
        heading = headingsNew
        row = verifierNewProjects
        projectType = 'New'
        break
      }
      case 2: {
        heading = headingsAccepted
        row = verifierAcceptedProjects
        projectType = 'Accepted'
        break
      }
      case 3: {
        heading = headingsRegistered
        row = verifierRegisteredProjects
        projectType = 'Registered'
        break
      }
      case 4: {
        heading = headingsRejected
        row = verifierRejectedProjects
        projectType = 'Rejected'
        break
      }
    }

    return row && row.length ? (
      <CCTable
        headings={heading}
        rows={row}
        hideScrollbar
        pagination={row.length > 4}
        rowsPerPageProp={5}
        stickyLastCol
        stickySecondLastCol={selectedTab === 3 ? false : true}
      />
    ) : (
      <NoData title={`No ${projectType} Projects Available`} />
    )
  }

  const handleApproveOrRejectCall = () => {
    dispatch(setVerifierTableNewTabModal(false))
    dispatch(setRetryFunction(handleApproveOrReject))
    handleApproveOrReject()
  }

  const handleApproveOrReject = () => {
    const { status, projectDetails } = verifierTableNewTabModalActionData
    updateVerifierStatus(status, projectDetails)
  }

  return (
    <>
      <Paper
        sx={{
          width: '100%',
          borderRadius: '8px',
          mt: 4,
          p: 2,
          minHeight: location.pathname.includes(pathNames.PROJECTS)
            ? '80vh'
            : '55vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            pr: 1,
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 400 }}>
            Projects
          </Typography>
        </Box>

        <TabSelector
          sx={{ marginTop: 0 }}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabArray={['New', 'Accepted', 'Registered', 'Rejected']}
        />

        {verifierDashboardTableLoading ? (
          <CCTableSkeleton sx={{ mt: 2 }} items={5} />
        ) : (
          renderDashboardTableTabData(tabIndex)
        )}
      </Paper>
      <Modal
        open={verifierTableNewTabModal}
        //onClose={() => setModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(56, 142, 129, 0.4)',
        }}
      >
        <Paper
          sx={{
            px: 10,
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            outline: 'none',
          }}
        >
          <>
            <Box>
              <Typography
                textAlign="center"
                sx={{ fontWeight: 500, fontSize: 20, pb: 5 }}
              >
                {`Are you sure you want to ${verifierTableNewTabModalMsg}?`}
              </Typography>
            </Box>
            <Stack direction="row" justifyContent={'space-between'}>
              <CCButton
                sx={{
                  minWidth: 0,
                  padding: '10px 47px',
                  borderRadius: 10,
                  mr: 3,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                onClick={() => {
                  dispatch(setVerifierTableNewTabModal(false))
                  dispatch(setVerifierTableNewTabModalMsg(''))
                  dispatch(setVerifierTableNewTabModalActionData(null))
                }}
              >
                No
              </CCButton>
              <CCButton
                onClick={handleApproveOrRejectCall}
                sx={{
                  minWidth: 0,
                  //mr: 3,
                  padding: '10px 47px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Yes
              </CCButton>
            </Stack>
          </>
        </Paper>
      </Modal>
    </>
  )
}

export default ListOfProjects
