const hashCode = function (s) {
  let h = 0, i = s.length;
  while (i > 0) {
    h = (h << 5) - h + s.charCodeAt(--i) | 0;
  }
  return h;
};

const Item = (props) => <li>{props.text}</li>

const Box = (props) => {
  const {val, funcOnChange, funcOnKey} = props
  return (<input type="text"
                 name="newItemValue"
                 value={val}
                 onChange={funcOnChange}
                 onKeyDown={funcOnKey}
  />)
}

class ToDoList extends React.Component {
  state = {
    toDoList: ["abc", "hemk", "woo"],
    newItemValue: ""
  }

  wrongEntryWarning = "Wrong Entry"

  handleInputChange = (event) => {
    this.setState({newItemValue: event.target.value})
  }

  handleKey = (event) => {
    if (event.code === "Enter") {
      if (this.state.toDoList.includes(this.state.newItemValue))
        this.setState({
          showWarning: true
        })
      else
        this.setState({
          toDoList: this.state.toDoList.concat(this.state.newItemValue),
          newItemValue: "",
          showWarning: false
        })
    } else
      this.setState({
        showWarning: false
      })
  }

  render() {
    const listToRender = this.state.toDoList.map(it => (
      <Item key={hashCode(it)} text={it}/>
    ))
    return (
      <>
        <h1>{this.props.hello}</h1>
        <Box
          val={this.state.newItemValue}
          funcOnChange={this.handleInputChange}
          funcOnKey={this.handleKey}
        />
        {this.state.showWarning && <h2 style={{color: "red"}}>{this.wrongEntryWarning}</h2>}
        <ul>
          {listToRender}
        </ul>
      </>
    );
  }

}

ReactDOM.render(
  <ToDoList hello="Henlo"/>,
  document.getElementById('root')
);