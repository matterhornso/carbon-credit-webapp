import React, { FC } from 'react'
import TitleValue from './TitleValue'
import TransactionHash from './TransactionHash'
import moment from 'moment'

interface CreateProjectProps {
  tabData?: any
}

const CreateProject: FC<CreateProjectProps> = (props: any) => {
  return (
    <>
      {props?.tabData?.transactionId ? (
        <TransactionHash txID={props?.tabData?.transactionId} />
      ) : (
        ''
      )}
      <TitleValue
        title="Project Developer"
        value={props?.tabData?.createProjectData?.user_id?.fullName}
      />
      <TitleValue
        title="Project Name"
        value={props?.tabData?.data?.area + ' Sq.Km.'}
      />
      <TitleValue
        title="Project Start Date"
        value={moment(props?.tabData?.data?.start_date).format('ll')}
      />
      <TitleValue
        title="Project Duration"
        value={props?.tabData?.data?.duration + ' Year(s)'}
      />
    </>
  )
}
export default CreateProject
