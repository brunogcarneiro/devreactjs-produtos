import React, {Component} from 'react'
import Axios from 'axios';

class Categorias extends Component {

    constructor(props){
        super(props)
        this.state = {
            produtos: []
        }
    }
    
    componentWillReceiveProps(p){
        this.props.loadProdutos(p.match.params.catId)
    }

    componentDidMount(){
        this.props.loadProdutos(this.props.match.params.catId)
    }

    render() {
        return (
            <div>
                {this.props.produtos.map((p) => <p key={p.id}>{p.descricao}</p>)}
            </div>
        )
    }
}

export default Categorias