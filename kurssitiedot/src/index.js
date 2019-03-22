import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => {
    return (
        <div><h1>{title}</h1></div>
    )
}

// What each part/item will look like
const Part = ({ part, ex }) => {
    return (
        <p><b>{part}:</b> {ex}</p>
    )
}

// Content takes an array path and renders Part for each part/item in array.
// Suggestions for a better key? Add unique id to every part/item?
const Content = ({ path }) => {
    return (
        <div>
            {path.map(i => <Part key={i.name} part={i.name} ex={i.exercises} />)}
        </div>
    )
}

// Total takes path to get number of exercise from each part/item and sum them
const Total = ({ path }) => {
    let sum = path.map(i => i.exercises).reduce((a, b) => a + b)
    return (
        <p>Yhteensä <b>{sum}</b> tehtävää</p>
    )
}


const App = () => {
  const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
            name: 'Reactin perusteet',
            exercises: 10
        },
        {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
        },
        {
            name: 'Komponentin tila',
            exercises: 14
        }
      ]
  }

  return (
    <>
      <Header title={course.name} />
      <Content path={course.parts} />
      <Total path={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))