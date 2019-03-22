import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ text, action }) => <button onClick={action}>{text}</button>

const Anecdote = ({ path }) => {
    if (path === 'ANECDOTES') {
        return (
            <div className="anecdote-container">
            <p className="header"><i>{path}</i></p>
        </div>
        )
    }
    return (
        <div className="anecdote-container">
            <p><i>"{path}"</i></p>
        </div>
    )
}
const MostLiked = ({ path, text }) => {
    if (path.reduce((a, b) => a + b) === 0) {
        return null
    }
    return (
        <div className="anecdote-container">
            <p><i>{text}</i></p>
            <p><i>{anecdotes[path.indexOf(Math.max(...path))]}</i></p>
        </div>
    )
}
const LikeCount = ({ path }) => {
    if (path === undefined) {
        return <p className="likes"><i>PRESS NEXT FOR AN ANECDOTE</i></p>
    }
    return <p className="likes"><i>{path} LIKES</i></p>
}

const App = () => {
    const [selected, setSelected] = useState({
        current: 'ANECDOTES',
        votes: Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
    })

    const likes = Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
    const randomIndex = (arr) => Math.floor(Math.random() * arr.length)
    const setAnecdote = (anecdote) => {
        setSelected( {...selected, current: anecdote} )
    }
    const setlike = () => {
        likes[anecdotes.indexOf(selected.current)] += 1
        setSelected( {...selected, votes: selected.votes.map((like, i) => like + likes[i])} )
    }

    console.log(selected)

    return (
        <div className="container">
            <Anecdote path={selected.current} />
            <LikeCount path={selected.votes[anecdotes.indexOf(selected.current)]} />
            <Button text="NEXT" action={() => setAnecdote(anecdotes[randomIndex(anecdotes)])} />
            <Button text="LIKE" action={() => setlike()} />
            <MostLiked path={selected.votes} text="Most Popular" />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App />, document.getElementById('root'));
