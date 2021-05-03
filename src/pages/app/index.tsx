import React, { lazy, Suspense }  from 'react'
import { Router } from "@reach/router"
import { graphql } from 'gatsby'
import Content from 'src/components/common/layouts/content'
import { AccountContextProvider } from 'src/context/account-context-provider'
import { PrivateRoute } from 'src/components/common/private-route'
import Login from './login'
import Profile from './profile'
import Attest from './attest'

export default function Index({ data, location }: any) {
  const isBrowser = typeof window !== "undefined"

  return (
    <Content navigationData={data.navigationData} location={location}>
      {isBrowser && (
        <AccountContextProvider>
          <Suspense fallback={<div />}>
            <Router basepath="/app">
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/attest" component={Attest} />
              <Login path="/login" />
            </Router>
          </Suspense>
        </AccountContextProvider>
      )}
    </Content>
  )
}

export const query = graphql`
  query($language: String!) {
    ...NavigationData
    ...NewsData
  }
`
