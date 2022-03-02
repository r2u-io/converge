import React from 'react'

import { useTranslation } from 'react-i18next'

import TeamData from '../../config/team.json'
import { useAvatarsContext } from '../../contexts/AvatarsContext'
import Footer from '../Footer'
import CanvasTeam from './Canvas'
import CardTeam from './Card'
import { Container } from './styles'

const Team: React.FC = () => {
  const { t } = useTranslation()

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
                  viewBox='0 0 100 100'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='10'
                  strokeLinecap='round'
                >
                  <path d='M95,50 h-90 M5,50 l30,-30 M5,50 l30,30' />
                </svg>
              </button>
            )}
            <span>{t('team.title')}</span>
          </div>
          <button
            type='button'
            onClick={onClickLeadership}
            disabled={moving || activeGroup === 'leadership'}
          >
            {t('team.leadership')}
          </button>
          <button
            type='button'
            onClick={onClickTechProduct}
            disabled={moving || activeGroup === 'techProduct'}
          >
            {t('team.techProduct')}
          </button>
          <button
            type='button'
            onClick={onClickOperations}
            disabled={moving || activeGroup === 'operations'}
          >
            {t('team.operations')}
          </button>
          <button
            type='button'
            onClick={onClickSalesMarketing}
            disabled={moving || activeGroup === 'salesMarketing'}
          >
            {t('team.salesMarketing')}
          </button>
          <button
            type='button'
            onClick={onClickAdvisors}
            disabled={moving || activeGroup === 'advisors'}
          >
            {t('team.advisors')}
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
      <Footer />
    </Container>
  )
}

export default Team
