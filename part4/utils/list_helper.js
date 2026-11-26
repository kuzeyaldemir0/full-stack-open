const totalLikes = (blogs) => {
  const initialValue = 0
  return blogs.reduce(
    (accumulator, currentBlog) => accumulator + currentBlog.likes, initialValue
  )
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, currentBlog) => currentBlog.likes > max.likes ? currentBlog : max
  )
}

const mostBlogs = (blogs) => {
  // Count how many blogs each author has
  blog_counts = {}
  blogs.forEach(blog => {
    if (blog.author in blog_counts) {
      blog_counts[blog.author] += 1
    }
    else {
      blog_counts[blog.author] = 1
    }
  })
  
  // Find the author with the most blogs
  let maxCount = -1
  let maxAuthor = ''
  
  for (author in blog_counts) {
    if (blog_counts[author] > maxCount) {
      maxCount = blog_counts[author]
      maxAuthor = author
    }
  }

  return { author: maxAuthor, blogs: maxCount }
}

const mostLikes = (blogs) => {
  likeCounts = {}
  blogs.forEach(blog => {
    if (blog.author in likeCounts) {
      likeCounts[blog.author] += blog.likes
    }
    else {
      likeCounts[blog.author] = blog.likes
    }
  })

  // Find the author with the most likes
  let maxLikes = -1
  let mostLiked = ''
  
  for (author in likeCounts) {
    if (likeCounts[author] > maxLikes) {
      maxLikes = likeCounts[author]
      mostLiked = author
    }
  }

  return { author: mostLiked, likes: maxLikes}
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }