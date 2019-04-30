import React from 'react'

const ProdutosNovo = (props) => {
    const refs = {}
    const bind = (ref) => (input) => refs[ref] = input

    const salvarClickHandler = () => {
        props.createProdutos(getNewProduto())
        clean()
    }

    const getNewProduto = () => {
        return {
            categoria: refs.select.value,
            descricao: refs.input.value
        }
    }

    const clean = () => {
        refs.select.value = 1
        refs.input.value = ''
    }
    
    return (
        <div>
            <h2>Novo Produto</h2>
            <select ref={bind('select')}>
                { props.categorias.map((cat) => {
                    return (
                        <option 
                            key={cat.id}
                            value={cat.id}>{cat.descricao}</option>
                    )
                  } )
                }
            </select>
            <input
                className="form-control"
                placeholder="Novo produto"
                ref={bind('input')}/>
            <button
                className="btn"
                onClick={salvarClickHandler}>Salvar</button>
        </div>
    )
}

export default ProdutosNovo