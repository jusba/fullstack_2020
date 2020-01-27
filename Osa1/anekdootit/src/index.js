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
const MostVoted = (props) => {
  console.log("vittu",props.votes)
  
  let zero = 0
  let one = 0
  let two = 0
  let three = 0
  let four = 0
  let five = 0
  
  console.log("pääsee tänne?")
  console.log("pituus=", props.votes.lenght)
  props.votes.forEach(value => {
    if(value === 0){
      zero ++;
    }
    if(value === 1){
      one ++;
    }
    if(value === 2){
      two ++;
    }
    if(value === 3){
      three ++;
    }
    if(value === 4){
      four ++;
    }
    if(value === 5){
      five ++;
    }  
  })
  
 
  const values = [zero,one,two,three,four,five]
  console.log("arvot",values)
  let most = zero
  let numbr = 0
  let i = 0
  console.log("isoin",most)
  values.forEach(value => {
    console.log("nyt",i,numbr,value, most)
    if(value > most){
      most = value
      numbr = i
    }
    i++
  })
  return(
    <p>
      {props.anecdotes[most]}
    </p>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([])
  const header = "Anecdote of the day"
  const header2 = "Anecdote with most votes"
  
  const handleClick = () => {
    
    while(true){
      let rdm = Math.floor(Math.random() * 6)
      if (rdm !== selected){
        setSelected(rdm)
        break
      }
      
    }
  } 
  const handleVote = () => {
    console.log("tääl",votes)
    setVote(votes.concat(selected))
    console.log("taastääl",votes)
     
    
  }
  
  return (

      <div>
        <Header title={header} />
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        <Button onClick={handleVote} text= {"vote"}/>
        <Button onClick={handleClick} text= {"next anecdote"}/>
      </p>
      
        <Header title={header2} />
      
      
        <MostVoted votes = {votes} anecdotes = {props.anecdotes}/>
      

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
