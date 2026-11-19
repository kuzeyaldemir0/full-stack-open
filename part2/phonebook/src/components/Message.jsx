const Message = ({ message }) => {
  const messageStyle = {
    color: 'green',
    fontStyle: 'italic'
  }  

  if (message === "") {
    return null
  }
  return (
    <div style={messageStyle}>
      <p> {message} </p>
    </div>
  )
}

export default Message
