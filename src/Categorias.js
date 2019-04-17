import React, {Component} from 'react'
import Axios from 'axios';

class Categorias extends Component {

    constructor(props){
        super(props)
        this.state = {
            produtos: []
        }

        this.setProdutoList = this.setProdutoList.bind(this)
        this.updateProdutos = this.updateProdutos.bind(this)
    }
    
    componentWillReceiveProps(p){
        this.updateProdutos(p.match.params.catId)
    }

    componentDidMount(){
        this.updateProdutos(this.props.match.params.catId)
    }

    updateProdutos(id){
        Axios.get(`http://localhost:3001/produtos?categoria=${id}`)
        .then((response) => this.setProdutoList(response.data))
    }

    setProdutoList(list){
        this.setState({
            produtos: list
        })
    }

    render() {
        return (
            <div>
                {this.state.produtos.map((p) => <p key={p.id}>{p.descricao}</p>)}
            </div>
        )
    }
}

export default Categorias