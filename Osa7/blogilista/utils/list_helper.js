const _ = require("lodash")

const dummy = (blogs) => {
    
    return 1
  }

const totalLikes = (blogs) =>{
    
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0 
        : blogs.reduce(reducer, 0) 
}
const favoriteBlog = (blogs) => {

    const  reducer = (prev, curr) => {
      return prev.likes < curr.likes ? curr : prev
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer)   
}
const mostBlogs = (blogs) => {

    const howMany = (name) => {
      const amount = blogs.filter(blog =>  blog.author === name)
      return amount.length  
    }    
    const  reducer = (prev, curr) => {
      return howMany(prev.author) < howMany(curr.author) ? {author: curr.author, blogs: howMany(curr.author)} : {author: prev.author, blogs: howMany(prev.author)}
    }
    
    return blogs.length === 0
        ? 0
        : blogs.length === 1
        ? {author: blogs[0].author, blogs: 1} 
        : blogs.reduce(reducer)   
                
}
const mostLikes = (blogs) => {
  
  const howMany = (name) => {
    const amount = blogs.filter(blog =>  blog.author === name)
    const reducer = (prev, curr) => {
      return prev + curr.likes   
    }
    return amount.reduce(reducer, 0) 
  }    
  const  reducer = (prev, curr) => {
    return howMany(prev.author) < howMany(curr.author) ? {author: curr.author, likes: howMany(curr.author)} : {author: prev.author, likes: howMany(prev.author)}
  }
  
  return blogs.length === 0
      ? 0
      : blogs.length === 1
      ? {author: blogs[0].author, likes: blogs[0].likes} 
      : blogs.reduce(reducer)  
  

}


  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }