import React from 'react';
import styled from 'styled-components';
import { number, string, shape, arrayOf, func, bool } from 'prop-types';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  shell: '#89e051',
  other: '#949494',
};

const LangCol = styled.span`
   {
    width: 15px;
    height: 15px;
    background-color: ${props => props.color};
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;
  }
`;
const RepoList = props => {
  const { username, data, fetchMore, isLastPage } = props;

  const repositoryItem = data.map(repo => (
    <div key={repo.id}>
      <h2>
        <a href={repo.html_url}>{repo.name}</a>
      </h2>
      <p>{repo.description}</p>
      <p>
        <span>
          <LangCol
            color={
              languageColors[repo.language]
                ? languageColors[repo.language]
                : '#949494'
            }
          />
        </span>
        {repo.language}
      </p>
    </div>
  ));
  return (
    <div style={{ padding: '100px 200px' }}>
      <h1>{username} - repos</h1>
      {repositoryItem}
      {!isLastPage && <button onClick={fetchMore}>Load more</button>}
    </div>
  );
};

RepoList.propTypes = {
  username: string.isRequired,
  data: arrayOf(
    shape({
      id: number,
      name: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default RepoList;
