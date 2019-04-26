import React from 'react'

const ENTER = 13

const EditCategoria = (props) => {
    const keyUpHandler = (event) => {
        if (event.keyCode === ENTER){
            props.editCategoria(props.cat.id, event.target.value)
        } 
    }

    return (
        <div>
            <button className='btn btn-sm' onClick={() => props.setEditingCategory('')}>
                <span>Cancel</span>
            </button>
            <input type="text" defaultValue={props.cat.descricao} onKeyUp={keyUpHandler}></input>
        </div>
    )
}

export default EditCategoria