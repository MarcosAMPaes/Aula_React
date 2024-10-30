import React from 'react'
import TableUsersLine from './TableUsersLine'

const TableUsers = ( {items, handleDeleteUser }) => {
  return (
    <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id do Usuario</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {items.map(p => <TableUsersLine item={p} key={p.id} handleDeleteUser={handleDeleteUser} />)}
            </tbody>
        </table>
  )
}

export default TableUsers