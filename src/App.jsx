import React, { Component } from 'react'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import { GrDocumentVerified, GrUpdate } from 'react-icons/gr'
import './App.css'
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
    // console.log(val)
    this.setState({ value: val })
  }

  submit = () => {
    if (this.state.value == '') {
      alert('Add Todo First...!')
    }
    else {
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
    }
  }

  deletefunc = (e) => {
    this.state.todo.splice(e, 1)
    localStorage.setItem("Todos", JSON.stringify(this.state.todo))
    window.location.reload()
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

// this.GetStart()
  }

  GetStart = () => {
    document.getElementsByClassName("container")[0].classList.add('active')
    document.getElementsByClassName("getStart")[0].style.display = 'none'
    document.getElementById("mainDiv").style.display = 'block'
  
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="getStart">
            <button onClick={this.GetStart}>
              Let's Start
            </button>
          </div>
          {                           /* Main Div  */}
          <div id='mainDiv' >
            <h1>Todo list</h1>
            <input type="text" name="" id="AddTodo" onChange={(e) => this.handle(e.target.value)} />
            <button id='submit' onClick={() => this.submit()} >
              <HiOutlineViewGridAdd />
            </button>
            <ol>
              {
                this.state.todo == '' ? <div id='noData'><h3>
                  No Data to Show</h3></div> :
                  this.state.todo.map((v, i) => {
                    return (
                      v.todo_state === 0 ?
                        <>
                          <li key={i}>
                            {v.title}
                            <div className="btn">
                              <button className='btns' onClick={() => this.update(i)}>
                                <GrUpdate />
                              </button>
                              <button className='btns' id='deleteBtn' onClick={() => this.deletefunc(i)}>
                                <AiFillDelete size={20} />
                              </button>
                            </div>
                          </li>
                        </>
                        :
                        <li key={i}>
                          <input type="text" name="" id="" value={v.title} onChange={(ch) => this.updateChange(ch, i)} />
                          <div className="btn" style={{ 'margin-top': '-0.5rem' }}>
                            <button id='saveBtn' className='btns' onClick={() => this.save(i)}>Save </button>
                          </div>
                        </li>
                    )
                  })
              }
            </ol>
          </div>
        </div>
      </>
    )
  }
}