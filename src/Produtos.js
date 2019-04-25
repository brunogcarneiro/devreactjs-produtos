import React from 'react'

import {
    Route,
    Link
} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categorias from './Categorias'

class Produtos extends React.Component{
    constructor(props){
        super(props)

        this.keyUpHandler = this.keyUpHandler.bind(this)
    }

    keyUpHandler(event){
        const ENTER = 13
        if(event.keyCode === ENTER){
            this.props.createCategorias(this.refs.categoria.value)
            this.refs.categoria.value = ''
        }
    }

    componentDidMount(){
        this.props.loadCategorias()
    }

    render(){
        const url = this.props.match.url;
        const {deleteCategorias} = this.props
        return (
            <div className='container'>
                <div className='col-md-2'>
                    <ul className='nav'>
                        {this.props.categorias.map(cat => {
                            return (
                                <li key={cat.id}>
                                    <button className='btn btn-sm' onClick={() => deleteCategorias(cat.id)}>
                                        <span className='glyphicon glyphicon-remove'></span>
                                    </button>
                                    <Link to={`/produtos/categorias/${cat.id}`}>{cat.descricao}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='well well-sm'>
                        <input className='form-control' type='text' placeholder='Nova Categoria' ref='categoria' onKeyUp={this.keyUpHandler}></input>
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