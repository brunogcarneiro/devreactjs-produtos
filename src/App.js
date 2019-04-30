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
    this.editCategoria = this.editCategoria.bind(this)

    this.createProdutos = this.createProdutos.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
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

  editCategoria(id, desc){
    this.props.api
      .editCategoria(id, desc)
      .then(this.loadCategorias)
  }

  createProdutos(desc){
    return this.props.api
      .createProdutos(desc)
  }

  loadProdutos(cat){
    return this.props.api
      .loadProdutos(cat)
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
                    editCategoria = {this.editCategoria}
                    
                    createProdutos = {this.createProdutos}
                    loadProdutos = {this.loadProdutos}
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