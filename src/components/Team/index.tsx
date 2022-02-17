import React from 'react'

import TeamData from '../../config/team.json'
import { useAvatarsContext } from '../../contexts/AvatarsContext'
import CanvasTeam from './Canvas'
import CardTeam from './Card'
import { Container } from './styles'

const Team: React.FC = () => {
  const {
    moving,
    activeGroup,
    onClickBack,
    onClickOperations,
    onClickTechProduct,
    onClickLeadership,
    onClickSalesMarketing,
    onClickAdvisors
  } = useAvatarsContext()

  const teams = [
    {
      group: 'leadership',
      members: TeamData.map((member, index) => ({ ...member, index })).filter(
        (member) => member.group === 'leadership'
      ),
      className: 'column-3'
    },
    {
      group: 'operations',
      members: TeamData.map((member, index) => ({ ...member, index })).filter(
        (member) => member.group === 'operations'
      ),
      className: 'column-3'
    },
    {
      group: 'techProduct',
      members: TeamData.map((member, index) => ({ ...member, index })).filter(
        (member) => member.group === 'techProduct'
      ),
      className: 'column-5'
    },
    {
      group: 'salesMarketing',
      members: TeamData.map((member, index) => ({ ...member, index })).filter(
        (member) => member.group === 'salesMarketing'
      ),
      className: 'column-5'
    },
    {
      group: 'advisors',
      members: TeamData.map((member, index) => ({ ...member, index })).filter(
        (member) => member.group === 'advisors'
      ),
      className: 'column-1'
    }
  ]

  return (
    <Container id='meet-the-team'>
      <div className='content'>
        <div className='ui'>
          <div className='header'>
            {activeGroup !== 'all' && (
              <button className='back' type='button' onClick={onClickBack}>
                <svg
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 1000 1000'
                  fill='currentColor'
                >
                  <path d='M943.1,451.9H176.5l254.4-254.4c18.3-18.3,18.3-48.1,0-66.4l-2.9-2.9c-18.3-18.3-48.1-18.3-66.4,0L27.7,462.2C16.9,470.8,10,484,10,498.8v4.6c0,17.8,9.9,33.2,24.4,41.2l327.2,327.2c18.3,18.3,48.1,18.3,66.4,0l2.9-2.9c18.3-18.3,18.3-48.1,0-66.4L178.7,550.3h764.3c25.9,0,46.9-21,46.9-46.9v-4.6C990,472.9,969,451.9,943.1,451.9z' />
                </svg>
              </button>
            )}
            <span>Meet our team</span>
          </div>
          <button
            type='button'
            onClick={onClickLeadership}
            disabled={moving || activeGroup === 'leadership'}
          >
            Leadership
          </button>
          <button
            type='button'
            onClick={onClickTechProduct}
            disabled={moving || activeGroup === 'techProduct'}
          >
            Technology & Product
          </button>
          <button
            type='button'
            onClick={onClickOperations}
            disabled={moving || activeGroup === 'operations'}
          >
            Operations
          </button>
          <button
            type='button'
            onClick={onClickSalesMarketing}
            disabled={moving || activeGroup === 'salesMarketing'}
          >
            Sales & Marketing
          </button>
          <button
            type='button'
            onClick={onClickAdvisors}
            disabled={moving || activeGroup === 'advisors'}
          >
            Advisors
          </button>
        </div>
        <div className='canvas'>
          {teams.map(({ members, group, className }) => (
            <div key={group} className={`wrapper ${className}`}>
              {members.map((data) => (
                <CardTeam {...data} key={data.name} />
              ))}
            </div>
          ))}
          <CanvasTeam />
        </div>
      </div>
    </Container>
  )
}

export default Team
