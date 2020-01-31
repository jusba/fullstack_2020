import React from 'react'



const Header = ({ course }) => {

    return (
        <h3>{course}</h3>
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
export default Course
