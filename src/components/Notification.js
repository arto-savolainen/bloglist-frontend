const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  let notificationStyle

  switch (style) {
    case 'notification':
      notificationStyle = {
        color: "green",
        fontStyle: "bold",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: "#008000",
        backgroundColor: "#ebfaeb",
        padding: 8,
        margin: 5
      }
      break
    case 'error':
      notificationStyle = {
        color: "red",
        fontStyle: "bold",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        borderColor: "#b30000",
        backgroundColor: "#ffcccc",
        padding: 8,
        margin: 5
      }
      break
    default:
      break
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification