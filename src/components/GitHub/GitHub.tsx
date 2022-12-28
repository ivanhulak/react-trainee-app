import { useEffect, useState } from "react";
import { Search } from "./Search";
import { UsersList } from "./UsersList";
import { UserDetails } from "./UserDetails";
import { useTranslation } from "react-i18next";

export type ActiveUserType = {
   id: number
   login: string
   avatar_url: string
   followers: number
}
export type UserType = {
   id: number
   login: string
}
export type SearchResult = {
   items: UserType[]
}
export const GitHub = () => {
   const initialSearchValue = 'ivan';
   const [search, setSearch] = useState<string>(initialSearchValue)
   const [selected, setSelected] = useState<null | UserType>(null)
   const {t} = useTranslation(['githubApi']);

   useEffect(() => {
      if (!!selected) {
         document.title = selected.login
      }
   }, [selected])

   const onReset = () => {
      setSearch(initialSearchValue)
   }
   return (
      <div className="container-fluid mt-5">
         <Search 
            searchValue={search} 
            onHandleSearch={(value) => setSearch(value)}
         />
         <button className="btn btn-secondary mt-2" onClick={onReset}>{t("resset")}</button>
         <div className="d-flex mt-3">
            <UsersList 
               search={search} 
               selectedUser={selected}
               onSelectedUser={setSelected}
            />
            <UserDetails user={selected}/>
         </div>
      </div>
   );
}