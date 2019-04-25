import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home.js'
import Sobre from './Sobre'
import Produtos from './Produtos'

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      'categorias' : []
    }

    this.loadCategorias = this.loadCategorias.bind(this)
    this.deleteCategorias = this.deleteCategorias.bind(this)
    this.createCategorias = this.createCategorias.bind(this)
  }

  loadCategorias(){
    this.props.api
      .loadCategorias()
      .then((response) => this.setState({'categorias': response.data}))
  }

  deleteCategorias(id){
    this.props.api
      .deleteCategorias(id)
      .then(this.loadCategorias)
  }

  createCategorias(desc){
    this.props.api
      .createCategorias(desc)
      .then(this.loadCategorias)
  }

  render() {
    const { categorias } = this.state

    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>
                  Gerenciador de Produtos
                </a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={
              (props) => {
                return (
                  <Produtos
                    {...props}
                    categorias={categorias}
                    createCategorias = {this.createCategorias}
                    deleteCategorias = {this.deleteCategorias}
                    loadCategorias = {this.loadCategorias}
                  />
                )
              }
            } />
          </div>
        </div>
      </Router>
    );
  }
}

export default App