import React from 'react'
import UpcomingTrips from '../../UpcomingTrips'

describe('<UpcomingTrips />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UpcomingTrips />)
  })
})