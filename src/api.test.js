// // A simplified fetchWeather function
// async function fetchWeather(city) {
//   // Simulating API response
//   if (city === 'London') {
//     return {
//       temperature: 20,
//       description: 'Cloudy',
//     };
//   } else {
//     throw new Error('City not found');
//   }
// }

// module.exports = { fetchWeather };

import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error404 from  "./components/Error404";

afterEach(() => {
  cleanup();
})

test("should render error404 component", () =>{
  render(<Error404/>);
  var textElem = screen.getByTestId("error-message");

  expect(textElem).toBeInTheDocument();
})
