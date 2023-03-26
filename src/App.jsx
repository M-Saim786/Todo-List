import React, { Component } from 'react'
import { BiCommentAdd } from 'react-icons/bi'
// idhr component 'extends' k zariye sa React(class) k ander se components k attributes lekr ai ga or App.jsx mein rkh de ga 
export default class App extends Component {
  // 
  constructor() {
    super()
    this.state = {
      value: '',
      todo: [],
      inp_width: 0

    }
  }
  handle = (val) => {
    //  console.log('click')
    // console.log(val)
    this.setState({ value: val })
    // console.log(this.state.value)
  }

  submit = () => {
    let obj = {
      title: this.state.value,
      todo_state: 0
    }
    // here we use spread operator 
    this.state.todo = [...this.state.todo, obj]

    localStorage.setItem("Todos", JSON.stringify(this.state.todo))
    this.setState({
      value: ''
    })
    // console.log(this.state.todo)
    // console.log(this.state.todo.length)
  }
  deletefunc = (e) => {

    // console.log(e)
    // console.log(this.state.todo)
    this.state.todo.splice(e, 1)

    localStorage.setItem("Todos", JSON.stringify(this.state.todo))
    window.location.reload()

    // this.setState({
    // })
  }

  update = (e) => {
    console.log(e)
    for (let i = 0; i < this.state.todo.length; i++) {
      this.state.todo[i].todo_state = 0
    }

    this.state.todo[e].todo_state = 1
    this.setState({})
    console.log(this.state.todo[e])
  }

  updateChange = (ch, ind) => {
    console.log(ch.target.value)
    console.log(ind)
    this.state.todo[ind].title = ch.target.value
    this.setState({})

  }
  save = (index) => {
    console.log('save')
    this.state.todo[index].todo_state = 0
    localStorage.setItem("Todos", JSON.stringify(this.state.todo))
    this.setState({})

  }


  componentDidMount() {

    let get_data = localStorage.getItem("Todos")
    get_data == null ? this.state.todo = [] : this.state.todo = JSON.parse(get_data)
    this.setState({})

  }
  render() {
    return (
      <>
        <h2>todo list</h2>

        <input type="text" name="" id="" onChange={(e) => this.handle(e.target.value)} />

        <button onClick={() => this.submit()}>
          <BiCommentAdd size={20} />
        </button>
        <ol>
          {
            this.state.todo == '' ? <li>No Data to Show</li> :
              this.state.todo.map((v, i) => {
                return (
                  v.todo_state === 0 ?
                    <>
                      <li key={i}>
                        {v.title}

                        <button onClick={() => this.deletefunc(i)}>
                          Delete
                        </button>
                        <button onClick={() => this.update(i)}>
                          Update
                        </button>
                      </li>
                    </>
                    :
                    <li key={i}>
                      <input type="text" name="" id="" value={v.title} onChange={(ch) => this.updateChange(ch, i)} />
                      <button onClick={() => this.save(i)}>Save </button>
                    </li>

                )

              })
          }
        </ol>
      </>
    )
  }

}