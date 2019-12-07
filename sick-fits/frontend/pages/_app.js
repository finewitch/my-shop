import React from 'react'
import App , {Container} from 'next/app'
import Page from '../components/Page'
import "../assets/sass/styles.scss"

import {ApolloProvider} from 'react-apollo'
import withData from '../lib/withData'

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    static async getInitialProps({Component, ctx}) {
      let pageProps = {};
      if(Component.getInitialProps){

         pageProps = await Component.getInitialProps(ctx);

      }
      pageProps.query = ctx.query;
      // calls page's `getInitialProps` and fills `appProps.pageProps`
      // console.log(pageProps.query, '<<<<<<<');
      return { pageProps }
    }
  
    render() {
      const { Component, pageProps, apollo} = this.props
      return (
          <Container>
            <ApolloProvider client={apollo}>
              <Page>
                  <Component {...pageProps} />
              </Page>
                <script
                src="https://code.jquery.com/jquery-3.4.1.slim.js"
                integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
                crossOrigin="anonymous"></script>
                <script type="text/javascript" src="../static/js/breakpoints.min.js"></script>
                <script type="text/javascript" src="../static/js/browser.min.js"></script>
                <script type="text/javascript" src="../static/js/main.js"></script>
                <script type="text/javascript" src="../static/js/util.js"></script>
              </ApolloProvider>
          </Container>

      )
    }
  }
  
  export default withData(MyApp)