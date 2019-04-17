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
    }
    
    componentDidMount(){
        Axios
            .get(`http://localhost:3001/categorias`)
            .then((response) => this.setState({
                categorias: response.data
            }))
    }

    render(){
        const url = this.props.match.url;
        return (
            <div className='container'>
                <div className='col-md-2'>
                    <ul className='nav'>
                        {this.state.categorias.map(cat => {
                            return (
                                <li key={cat.id}><Link to={`/produtos/categorias/${cat.id}`}>{cat.descricao}</Link></li>
                            )
                        })}
                    </ul>
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