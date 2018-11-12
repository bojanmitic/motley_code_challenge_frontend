Coding challenge for Motley - frontend:

    Installed modules:
        1.redux,
        2.react-redux,
        3.redux-thunk

    actions:

        - RepoLIst.test.js:
            1.Configured (set up body and headers) for fetchMock to reply with mock data for        queries to github endpoint,
            2.Finished test for 'successful fetch sets nextPage to Link header value'

        - index.js:
            1.Set up url, and other parameters for github API
            2.Handled pagination 
            3.Implemented action creator for 'FETCH_SUCCESS' action type

    components/RepoList:

        - RepoList.test.js:
            1.Finished test for title,
            2.Finished test for repo name,
            3.Implemented test for renders repo names as a link,
            4. Implemented test for load more button not to be rendered if there is nothing to      load

        - index.js:
            1.Implemented style component for language color 'LangCol',
            2.Implemented RepoLIst component according the layout

    containers/RepoList:

        1.Implemented mapStateToProps function to get necessary from redux store,
        2.I'm passing to "fetchUserRepos" function nextPage as a second argument here,

    reducers/RepoList:

        RepoList.test.js:
            1.Implemented test for initial state,
            2.Implemented test for setting "isLastPage" to true if "nextPage" is null

        index.js:
            1.Implemented case for "FETCH_SUCCESS" action

    App.js:
        1.Set up redux store with thunk middleware
        2.Set up redux developer tools