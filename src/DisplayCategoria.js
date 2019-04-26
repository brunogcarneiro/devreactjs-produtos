import React from 'react'
import { Link } from 'react-router-dom'

const DisplayCategoria = (props) => {
    return (
        <div>
            <button className='btn btn-sm' onClick={() => props.deleteCategorias(props.cat.id)}>
                <span className='glyphicon glyphicon-remove'></span>
            </button>
            <button className='btn btn-sm' onClick={() => props.setEditingCategory(props.cat.id)}>
                <span className='glyphicon glyphicon-edit'></span>
            </button>
            <Link to={`/produtos/categorias/${props.cat.id}`}>{props.cat.descricao}</Link>
        </div>
    )
}

export default DisplayCategoria