import React from 'react';
import { mount } from 'enzyme';
import RepoList from './';

const data = [
  {
    id: 1,
    name: 'Test',
    html_url: 'https://github.com/motleyagency/test',
    language: 'JavaScript',
  },
  {
    id: 2,
    name: 'Test 2',
    html_url: 'https://github.com/motleyagency/test2',
    language: 'Ocaml',
  },
];

let Elem = null;

beforeEach(() => {
  Elem = mount(
    <RepoList
      data={data}
      username="petetnt"
      fetchMore={jest.fn()}
      isLastPage={false}
    />,
  );
});

it('renders a title', () => {
  const title = Elem.find('h1');

  expect(title.text()).toEqual('petetnt - repos');
});

it('renders a repo names', () => {
  const names = Elem.find('h2').find('a');

  expect(names.length).toEqual(2);
  expect(names.at(0).text()).toEqual('Test');
  expect(names.at(1).text()).toEqual('Test 2');
});

it('renders repo names as a link', () => {
  const links = Elem.find('h2').find('a');

  expect(links.length).toEqual(2);
  expect(links.at(0).prop('href')).toEqual(data[0].html_url);
  expect(links.at(1).prop('href')).toEqual(data[1].html_url);
});

it('renders load more button if there is more to load', () => {
  const button = Elem.find('button');

  expect(button.length).toEqual(1);
});

it('does not renders load more button if there is nothing to load', () => {
  const newElem = mount(
    <RepoList
      data={data}
      username="petetnt"
      fetchMore={jest.fn()}
      isLastPage
    />,
  );
  const button = newElem.find('button');

  expect(button.length).toEqual(0);
});
