import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Assigning header component
const Header = ({ title }) => <h1>{title}</h1>

// Making buttons for every voting option. onClick will count each votes
const Button = ({ path, action }) => {
    return (
        <div>
            {Object.keys(path).map((item, i) => <button key={i} onClick={() => action(path, item)}>{item}</button> )}
        </div>
    )
}

// We create a component for our stats. Check object stats in const App
// We render results for every voting option and all available stats
const Statistic = ({ description, func }) => <tr><th>{description}:</th><td>{func}</td></tr>
const Statistics = ({ path, stats }) => {
    if (stats.Yhteensä === 0) {
        return (
            <div>
                <Header title="Statistiikka" />
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    return (
        <div>
            <Header title="Statistiikka" />
            <table>
                <tbody>
                        {Object.keys(path).map((item, i) => <tr key={i}><th key={i}>{item}:</th><td>{path[item]}</td></tr> )}
                        {Object.keys(stats).map((stat, i) => <Statistic key={i} description={stat} func={stats[stat]} /> )}
                </tbody>
            </table>
        </div>
    )
}

// All comes together here
const App = (props) => {
    const [votes, setVotes] = useState({
        Hyvä: 0, Neutraali: 0, Huono: 0
    })
    const voteCounter = (path, item) => setVotes( {...path, [item]: path[item] + 1} )
    const totalVotes = Object.keys(votes).map(item => votes[item]).reduce((a, b) => a + b)
    // If another voting option is added, consider adding a multiplier here to the end of the array/list
    const averageScore = (totalVotes) => {
        if (totalVotes === 0) {
            return 0
        }
        const multipliers = [1, 0, -1]
        const score = Object.keys(votes).map((item, i) => votes[item] * multipliers[i]).reduce((a, b) => a + b) / totalVotes
        if (score < 0) {
            return 0
        }
        return score.toFixed(2)
    }
    const positives = (totalVotes) => {
        if (totalVotes === 0) {
            return 0 + '%'
        }
        return (votes[Object.keys(votes)[0]] / totalVotes * 100).toFixed(2) + '%'
    }

    // Add whatever statistic calculation to the stats object
    const stats = {
        Yhteensä: totalVotes,
        Keskiarvo: averageScore(totalVotes),
        Positiivisia: positives(totalVotes)
    }
    
    // Check outcome
    console.log(stats)

    return (
        <div>
            <Header title="Anna palautetta" />
            <Button path={votes} action={voteCounter} />
            <Statistics path={votes} stats={stats} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
