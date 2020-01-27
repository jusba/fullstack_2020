import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
        <h1>{props.title}</h1>
        </>
    )
}


const Statistics = (props) => {
    
    if (props.good + props.neutral + props.bad === 0){
        return(
            <p>No feedback given</p>
        )
    }
 
    
    return (
        <table>
            <tbody>
            
                <StatisticLine text="good" value ={props.good} />
                <StatisticLine text="neutral" value ={props.neutral} />
                <StatisticLine text="bad" value ={props.bad} />    
                <StatisticLine text="all" value ={props.good + props.neutral+props.bad} />       
                <StatisticLine text="average" value ={(props.good+props.neutral+props.bad)/3} />        
                <StatisticLine text="positive" value ={(props.good/(props.good+props.neutral+props.bad))*100} />       
            </tbody>


            
            
        </table>
            
           
            
            
               
           
        

    )
}

const StatisticLine = (props) => {
    if (props.text === "positive"){
        return(
            <tr>
                <td>
                    {props.text} 
                </td>
            
            
                <td>
                    {props.value} %
                </td> 
            </tr>   
        )
    }
    return(
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    )
}
const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const header = "give feedback"
    const secondHeader = "statistics"
    const types = ["good", "neutral","bad"]
    
    const handleGoodClick = () => {
        setGood(good +1)
    } 
    const handleNeutralClick = () => {
        setNeutral(neutral +1)
    } 
    const handleBadClick = () => {
        setBad(bad +1)
    } 
    

    return (
        <div>
        <Header title={header} />
        <Button onClick={handleGoodClick} text = {types[0]}/>
        <Button onClick={handleNeutralClick} text ={types[1]}/>
        <Button onClick={handleBadClick} text ={types[2]}/>
        <Header title={secondHeader}/>
        <Statistics good = {good} neutral = {neutral} bad = {bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
