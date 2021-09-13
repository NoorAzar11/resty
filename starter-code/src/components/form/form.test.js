import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './index';
import Results from '../results/index';


it('Testing fetching Data from URl resluts ', () => {
  const result = {
    "Headers": {
      "content-type": "string application/json"
    },
    "count": 2,
    "results": [
      {
        "name": "fake thing 1",
        "url": "http://fakethings.com/1"
      },
      {
        "name": "fake thing 2",
        "url": "http://fakethings.com/2"
      }
    ]
  };

  render(<Results data={result} />);

  const testingItems = screen.getByTestId('renderedData');

  expect(testingItems).toHaveTextContent('fake thing 1');
  expect(testingItems).toHaveTextContent('http://fakethings.com/2');
  expect(testingItems).toHaveTextContent('Headers');
});