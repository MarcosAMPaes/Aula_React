import React, { useEffect, useState } from 'react';
import api from './axiosApi';
import ModalConfirm from './ModalConfirm';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Carregar categorias
  const loadCategories = () => {
    setLoading(true);
    api.get('admin/obter_categorias')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  // Excluir categoria
  const deleteCategory = () => {
    setLoading(true);
    api.postForm('admin/excluir_categoria', { id_categoria: selectedCategoryId })
      .then(response => {
        if (response.status === 204) {
          loadCategories();
        }
      })
      .catch(error => console.error('Erro ao excluir categoria:', error))
      .finally(() => setLoading(false));
  };

  // Mostrar modal de confirmação de exclusão
  const handleDeleteCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const modal = new bootstrap.Modal(document.getElementById('modalDeleteCategory'));
    modal.show();
  };

  // Carregar categorias ao iniciar a página
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Gerenciar Categorias</h3>
      <div className="mb-3">
        <Link to="/categories/create" className="btn btn-primary">Nova Categoria</Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.nome}</td>
                  <td>{category.descricao}</td>
                  <td>
                    <Link to={`/categories/edit/${category.id}`} className="btn btn-outline-primary btn-sm">
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhuma categoria encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal de confirmação de exclusão */}
      <ModalConfirm
        modalId="modalDeleteCategory"
        question="Deseja realmente excluir esta categoria?"
        confirmAction={deleteCategory}
      />
    </div>
  );
};

export default CategoriesList;
