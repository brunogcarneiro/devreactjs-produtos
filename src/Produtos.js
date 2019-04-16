import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categorias from './Categorias'

const Produtos = (props) => {
    return (
        <div className='container'>
            <div className='col-md-2'>
                <ul className='nav'>
                    <li><Link to='/produtos/categorias/1'>Categoria 1</Link></li>
                    <li><Link to='/produtos/categorias/2'>Categoria 2</Link></li>
                </ul>
            </div>
            <div className='col-md-10'>
                <h1>Produtos</h1>
                {props.match.url+'/categorias/:catId'}
                <Route exact path={props.match.url} component={ProdutosHome} />
                <Route path={props.match.url+'/categorias/:catId'} component={Categorias} />
            </div>
        </div>
    )
}

export default Produtos;