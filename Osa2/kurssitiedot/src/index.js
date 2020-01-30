import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {

    return (


        <>
            <h3>{course}</h3>
        </>
    )
}
const Part = (props) => {
    return (
        <>{props.osa1} {props.osa11}</>
    )
}
const Content = (props) => {


    return (

        <>
            {props.course.parts.map(course =>
                <p key={course.id}>
                    <Part osa1={course.name} osa11={course.exercises} osaId={course.id} />
                </p>
            )}
        </>
    )



}
const Total = (course) => {

    return (

        <b>Total of&nbsp;
                
            {course.course.parts.reduce(
                (sum, course) => sum = sum + course.exercises, 0)}
            &nbsp;exercises
        </b>

    )
}
const Course = (course) => {

    return (
        <div>
            <Header course={course.course.name} />
            <Content course={course.course} />
            <Total course={course.course} />
        </div>

    )

}


const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        courses.map(course =>
            <div key = {course.id}>
                <Course course={course} />
            </div>
        
        )
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'))