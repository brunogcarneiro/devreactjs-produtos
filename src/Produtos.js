import React from 'react'
import Axios from 'axios'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categorias from './Categorias'

class Produtos extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          categorias: []
        }

        this.keyUpHandler = this.keyUpHandler.bind(this)
        this.updateCategorias = this.updateCategorias.bind(this)
        this.excluirCategoria = this.excluirCategoria.bind(this)
    }
    
    componentDidMount(){
        this.updateCategorias()
    }

    updateCategorias(){
        Axios
            .get(`http://localhost:3001/categorias`)
            .then((response) => this.setState({
                categorias: response.data
            }))
    }

    keyUpHandler(event){
        const ENTER = 13
        if(event.keyCode == ENTER){
            Axios
                .post(`http://localhost:3001/categorias`,
                {
                    'descricao': this.refs.categoria.value
                })
                .then(this.updateCategorias)
                .then(() => this.refs.categoria.value = '')
        }
    }

    excluirCategoria(id){
        Axios
            .delete(`http://localhost:3001/categorias/${id}`)
            .then(this.updateCategorias)
    }

    render(){
        const url = this.props.match.url;
        return (
            <div className='container'>
                <div className='col-md-2'>
                    <ul className='nav'>
                        {this.state.categorias.map(cat => {
                            return (
                                <li key={cat.id}>
                                    <button class='btn btn-sm' onClick={() => this.excluirCategoria(cat.id)}>
                                        <span class='glyphicon glyphicon-remove'></span>
                                    </button>
                                    <Link to={`/produtos/categorias/${cat.id}`}>{cat.descricao}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div class='well well-sm'>
                        <input class='form-control' type='text' placeholder='Nova Categoria' ref='categoria' onKeyUp={this.keyUpHandler}></input>
                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={url} component={ProdutosHome} />
                    <Route path={url+'/categorias/:catId'} component={Categorias} />
                </div>
            </div>
        )
    }
}

export default Produtos;