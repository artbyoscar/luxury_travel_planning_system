import React from 'react'
import Itinerary from '../../Itinerary'

describe('<Itinerary />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Itinerary />)
  })
})