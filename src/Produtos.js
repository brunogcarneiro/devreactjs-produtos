import React from 'react'

import {
    Route,
    Link
} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categorias from './Categorias'
import DisplayCategoria from './DisplayCategoria'
import EditCategoria from './EditCategoria'
import ProdutosNovo from './ProdutosNovo'

class Produtos extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            editingCategory : '',
            produtos: []
        }

        this.keyUpHandler = this.keyUpHandler.bind(this)
        this.setEditingCategory = this.setEditingCategory.bind(this)
        this.loadProdutos = this.loadProdutos.bind(this)
    }

    keyUpHandler(event){
        const ENTER = 13
        if(event.keyCode === ENTER){
            this.props.createCategorias(this.refs.categoria.value)
            this.refs.categoria.value = ''
        }
    }

    setEditingCategory(id){
        this.setState({
            editingCategory: id
        })
    }

    componentDidMount(){
        const url = this.props.match.url;

        this.props.loadCategorias()
    }

    loadProdutos(cat){
        console.log(cat)
        this.props.loadProdutos(cat)
            .then((res) => {
                this.setState({produtos: res.data})
            })
    }

    render(){
        const url = this.props.match.url;
        const {deleteCategorias} = this.props
        return (
            <div className='container'>
                <div className='col-md-2'>
                    <ul className='nav'>
                        {this.props.categorias.map(cat => {
                            const isEditingCategory = cat.id === this.state.editingCategory;
                            return (
                                <li key={cat.id}>
                                    {
                                        (isEditingCategory)
                                            ? <EditCategoria cat={cat} editCategoria={this.props.editCategoria} setEditingCategory={this.setEditingCategory}/>
                                            : <DisplayCategoria cat={cat} deleteCategorias={this.props.deleteCategorias} setEditingCategory={this.setEditingCategory}/>
                                    }
                                </li>
                            )
                        })}
                    </ul>
                    <div className='well well-sm'>
                        <input className='form-control' type='text' placeholder='Nova Categoria' ref='categoria' onKeyUp={this.keyUpHandler}></input>
                    </div>
                    <Link to={`/produtos/novo`}>Novo Produto</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={url} component={ProdutosHome} />
                    <Route 
                        exact 
                        path={url+'/novo'} 
                        render={(props) => 
                          { return (
                            <ProdutosNovo
                                {...props}
                                createProdutos={this.props.createProdutos}
                                categorias={this.props.categorias}
                            />
                          )}
                        } />
                    <Route 
                        path={url+'/categorias/:catId'} 
                        render={ (props) => {
                            return (
                                <Categorias
                                    {...props}
                                    produtos={this.state.produtos}
                                    loadProdutos={this.loadProdutos}
                                />
                            )
                        }} />
                </div>
            </div>
        )
    }
}

export default Produtos;