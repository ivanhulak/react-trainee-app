import axios from "axios"
import { useEffect, useState } from "react"
import { SearchResult, UserType } from "./GitHub"

type UsersListPropsType = {
   search: string
   selectedUser: UserType | null
   onSelectedUser: (u: UserType) => void
}
export const UsersList: React.FC<UsersListPropsType> = ({search, selectedUser, onSelectedUser}) => {
   const [users, setUsers] = useState<UserType[]>([])

   useEffect(() => {
      axios.get<SearchResult>(`https://api.github.com/search/users?q=${search}&per_page=10`).then(response => {
         return setUsers(response.data.items)
      })
   }, [search])

   return (
      <div className="ml-3" style={{ width: "300px", color: "#fff", marginRight: "20px" }}>
         {users.map((u: UserType) => {
            return (
               <div
                  key={u.id}
                  className={selectedUser === u ? "bg-secondary mb-2 p-1" : "bg-primary mb-2 p-1"}
                  onClick={() => onSelectedUser(u)}
               >
                  {u.login}
               </div>)
         })}
      </div>
   );
}