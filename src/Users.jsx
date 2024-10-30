import { useEffect, useState } from "react";
import TableUsers from './TableUsers';
import Loading from "./Loading";
import api from "./axiosApi";
import ModalConfirm from "./ModalConfirm";
import NoProducts from "./NoProducts";
import SearchBar from './SearchBar';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);

    const loadUsers = () => {
        setLoading(true);
        const usersEndpoint = "obter_usuarios/";
        api.get(usersEndpoint)
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteUser = (userId) => {
        setLoading(true);
        api.post("excluir_usuario", {"id_usuario": userId})
            .then(response => {
                if (response.status === 204)
                    loadUsers();
            })
            .catch(error => {
                console.error('Erro ao excluir o usuário:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteUser = (userId) => {
        setSelectedUserId(userId);
        const modal = new bootstrap.Modal(document.getElementById('modalDeleteuser'));
        modal.show();
    }

    const handleSearch = (searchTerm) => {
        const filtered = users.filter((user) =>
            user.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        loadUsers();
    }, []);


  return (
        <>
            <SearchBar onSearch={handleSearch} title="Usuários" />
            {filteredUsers.length > 0 ?
            <>
                <ModalConfirm modalId="modalDeleteuser" question="Deseja realmente excluir este usúario?" confirmAction={() => deleteUser(selectedUserId)}/>
                <TableUsers items={filteredUsers} handleDeleteUser={handleDeleteUser}/>
            </>:
                (!loading && <NoProducts />)}
            {loading && <Loading />}
        </>
    );
}

export default Users