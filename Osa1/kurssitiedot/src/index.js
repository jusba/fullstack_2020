import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
        <h1>{props.course}</h1>
        </>
    )
}
const Part = (props) => {
    return(
        <p>{props.osa1} {props.osa11}</p>    
    )
}
const Content = (props) => {
    
    return(
        <div> 
            <Part osa1 = {props.yks0} osa11 = {props.yks1} />
            <Part osa1 = {props.yks2} osa11 = {props.yks3} />
            <Part osa1 = {props.yks4} osa11 = {props.yks5} />   
        </div>       
        )
        
    
    
}
const Total = (props) => {
    return (
        <>
         <p>Number of exercises {props.amount}</p>
        </>
    )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const all = exercises1+exercises2+exercises3

  return (
    <div>
      <Header course={course} />
      <Content yks0={part1} yks1={exercises1} yks2 = {part2}yks3 = {exercises2} yks4 = {part3} yks5={exercises3}/>
      <Total amount = {all} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))