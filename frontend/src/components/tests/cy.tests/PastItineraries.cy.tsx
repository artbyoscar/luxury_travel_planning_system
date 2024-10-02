import React from 'react'
import PastItineraries from '../../PastItineraries'

describe('<PastItineraries />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PastItineraries />)
  })
})