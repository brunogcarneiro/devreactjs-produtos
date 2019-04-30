import Axios from 'axios'

const api = Axios.create({
    baseURL: 'http://localhost:3001/'
})

const apis = {
    loadCategorias: () => api.get('categorias'),
    deleteCategorias: (id) => api.delete(`categorias/${id}`),
    createCategorias: (desc) => api.post(`categorias`, {'descricao': desc}),
    editCategoria: (id, desc) => api.put(`categorias/${id}`, {'descricao': desc}),
    
    createProdutos: (prod) => api.post(`produtos`, prod),
    loadProdutos: (cat) => api.get(`produtos?categoria=${cat}`)
}

export default apis