import React from 'react'
import PreferencesForm from '../../PreferencesForm'

describe('<PreferencesForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PreferencesForm />)
  })
})