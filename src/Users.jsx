import React from 'react'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState(0);

    const loadUsers = () => {
        setLoading(true);
        const usersEndpoint = "obter_usuarios/";
        api.get(usersEndpoint)
            .then((response) => {
                setUsers(response.data);
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
        const modal = new bootstrap.Modal(document.getElementById('modalCancelOrder'));

    useEffect(() => {
        loadUsers();
    }, []);
  return (
    <div>Users</div>
  )
}

export default Users