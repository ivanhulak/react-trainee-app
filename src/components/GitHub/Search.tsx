import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SearchPropsType = {
   searchValue: string
   onHandleSearch: (fixedValue: string) => void
}
export const Search: React.FC<SearchPropsType> = ({searchValue, onHandleSearch}) => {
   const [tempSearch, setTempSearch] = useState(searchValue)
   const {t} = useTranslation(['githubApi']);

   useEffect(() => {
      setTempSearch(searchValue)
   }, [searchValue])

   return (
      <div className="input-group">
         <input
            type="text"
            placeholder={`${t("placeholder_search")}`}
            className="form-control mx-2"
            style={{ maxWidth: "250px" }}
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
         />
         <button
            className="btn btn-dark mx-2"
            onClick={() => onHandleSearch(tempSearch)}
         >{t("find")}</button>
      </div>
   );
}