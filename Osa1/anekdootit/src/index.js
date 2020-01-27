import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => {
    return(
      <button onClick={onClick}>
      {text}
      </button>
    )  
}
const Header = (props) => {
  return (
      <>
      <h1>{props.title}</h1>
      </>
  )
}
const Anecdote = (props) => {
  
  return(
    <div>
    <p>{props.anecdote} </p>
    <p>has {props.votes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([0,0,0,0,0,0])
  const header = "Anecdote of the day"
  const header2 = "Anecdote with most votes"
  const [mostVotes, setMostVotes] = useState(0)
  const [most, setMost] =useState(0)
  
  const handleClick = () => {
    console.log("click")
    while(true){
      let rdm = Math.floor(Math.random() * 6)
      if (rdm !== selected){
        setSelected(rdm)
        break
      }
      
    }
  } 
  
  const handleVote = () => {
    console.log("vote")
    const clone = [...votes]
    clone[selected] ++ 
    setVote(clone)
    setMostVotes(Math.max(...clone))
    setMost(clone.indexOf(Math.max(...clone)))
  }
  return (
      <div>
        <Header title={header} />
        <Anecdote votes = {votes[selected]} anecdote = {props.anecdotes[selected]}/>
        <p>
          <Button onClick={handleVote} text= {"vote"}/>
          <Button onClick={handleClick} text= {"next anecdote"}/>
        </p>
        <Header title={header2} />
        <Anecdote votes = {mostVotes} anecdote = {props.anecdotes[most]}/>
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
