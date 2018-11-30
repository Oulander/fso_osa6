import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Menu, Button, Icon, Form, Input, Alert, Row, Col, Layout, List } from 'antd'

const { Footer, Content } = Layout

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <List
      size="small"
      bordered
      dataSource= {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired
}

const Anecdote = ({anecdote}) => (
  <div>
    <h2>{anecdote.content}</h2>
    <div>{`has ${anecdote.votes} votes`}</div>
    <div>for info, see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

const About = () => (
  <div>
    <Row gutter={16}>
      <Col span={12}>
        <div>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is &quot;a story with a point.&quot;</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </div>
      </Col>
      <Col span={4}>
        <img src='https://fullstackopen.github.io/assets/teht/48.png' width='400px'/>
      </Col>
    </Row>
  </div>
)

const FooterContent = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.setNotification(`A new Anecdote "${this.state.content}" created!`, 10)
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 14 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 8 }
      }
    }
    const { TextArea } = Input
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit} layout='vertical'>
          <Form.Item {...formItemLayout}>
            <TextArea
              name='content'
              placeholder='Content'
              value={this.state.content}
              onChange={this.handleChange}
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Input
              prefix={<Icon type="user" />}
              name='author'
              placeholder='Author'
              value={this.state.author}
              onChange={this.handleChange} />
          </Form.Item>
          <Form.Item {...formItemLayout}>
            <Input
              prefix={<Icon type="link" />}
              name='info'
              placeholder='Url for more info'
              value={this.state.info}
              onChange={this.handleChange} />
          </Form.Item>
          <Button htmlType='submit'>Create</Button>
        </Form>
      </div>
    )

  }
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired
}


Notification.propTypes = {
  notification: PropTypes.string
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
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
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  findAnecdoteById = (id) => {
    const anecdote = this.state.anecdotes.find(a => a.id === id)
    return anecdote
  }

  setNotification = (text, seconds) => {
    this.setState({notification: text})
    setTimeout(() => {
      this.setState({notification: ''})
    }, seconds * 1000)

  }

  render() {
    const AlertWrapper = () => {
      if (this.state.notification.length > 0){
        return(<Alert message={this.state.notification} type='success'/>)
      }
      return null
    }
    return (
      <div>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu mode="horizontal">
              <Menu.Item key="anecdotes">
                <NavLink exact to="/"><Icon type="smile" />anecdotes</NavLink>
              </Menu.Item>
              <Menu.Item key="app">
                <NavLink to="/new"><Icon type="plus" />create new</NavLink>
              </Menu.Item>
              <Menu.Item key="about">
                <NavLink to="/about"><Icon type="info" />about</NavLink>
              </Menu.Item>
            </Menu>
            <Layout>
              <Content style={{ padding: '50px' }}>
                <AlertWrapper />
                <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
                <Route path="/about" render={() => <About />} />
                <Route path="/new" render={({history}) =>
                  <CreateNew
                    history={history}
                    addNew={this.addNew}
                    setNotification={this.setNotification}
                  />
                }/>
                <Route exact path ="/anecdotes/:id" render={({match}) =>
                  <Anecdote
                    anecdote={this.findAnecdoteById(match.params.id)}/>
                }/>
              </Content>
              <Footer style={{ background: 'white', textAlign: 'center' }}><FooterContent /></Footer>
            </Layout>
          </div>
        </Router>
      </div>
    )
  }
}


export default App
