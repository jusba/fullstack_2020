import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams,
  useHistory
} from "react-router-dom"
import  { useField } from './hooks/index'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>


  )

}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const history = useHistory()

  //ei varmastikkaan siistein ratkaisu, mutta toimii :)
  const {...content1} = useField("text")
  const reset1 = content1["reset"]
  delete content1["reset"]
  const {...author1} = useField("content")
  const reset2 = author1["reset"]
  delete author1["reset"]
  const {...info1} = useField("content")
  const reset3 = info1["reset"]
  delete info1["reset"]

  

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content1.value,
      author: author1.value,
      info: info1.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification("")
    }, 10000)
    history.push('/')
  }
  const handleReset = () => {
    reset1()
    reset2()
    reset3()  
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content1} />
        </div>
        <div>
          author
          <input {...author1} />
        </div>
        <div>
          url for more info
          <input {...info1} />
        </div>
        <button>create</button><button type = {"button"} onClick = {handleReset}>reset</button>
      </form>
    </div>
  )

}
const Notification = ({text}) =>{
  
  if(text === ""){
    return(<div></div>)
  }
  const style = {
    border: 'solid',
    borderColor: 'red',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {text}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification text = {notification}/>
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} setNotification={setNotification} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
