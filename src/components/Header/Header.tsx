import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { GlobeIcon } from "./GlobeIcon";
import coockies from 'js-cookie';
import { useEffect, useState } from "react";

type LanguageType = {
   code: string
   name: string
   country_code: string
}
const languages: LanguageType[] = [
   {
      code: 'ukr',
      name: 'Українська',
      country_code: 'ua'
   },
   {
      code: 'en',
      name: 'English',
      country_code: 'gb'
   },
   {
      code: 'ru',
      name: 'Русский',
      country_code: 'ru'
   }
]
export const Header = () => {
   const { t } = useTranslation(['common']);
   const [languageCode, setLanguageCode] = useState(coockies.get("i18next") || '')
   console.log(languageCode)

   useEffect(() => {
      if(languageCode === ''){
         coockies.set('i18next', 'en')
      }
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      coockies.set('i18next', languageCode)
   }, [languageCode])

   return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark p-lg-3">
         <div className="container-fluid">
            <Link to='/' className="navbar-brand">{t("logo")}</Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarToggleExternalContent"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
               <ul className="navbar-nav">
                  <li className="nav-item ml-2">
                     <Link to='/home' className="nav-link">{t("home")}</Link>
                  </li>
                  <li className="nav-item">
                     <Link to='/todo-list' className="nav-link">Todo List</Link>
                  </li>
                  <li className="nav-item">
                     <Link to='/github-api' className="nav-link">GitHub API</Link>
                  </li>
                  <li className="nav-item">
                     <div className="dropdown">
                        <button
                           className="btn btn-link dropdown-toggle"
                           style={{ color: '#fff' }}
                           type="button"
                           id="dropdownMenuButton1"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                        >
                           <GlobeIcon />
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           {languages.map((language: LanguageType) => {
                              return <li key={language.country_code}>
                                 <button
                                    className="dropdown-item"
                                    onClick={() => {
                                       setLanguageCode(language.code)
                                       return i18next.changeLanguage(language.code)
                                    }}
                                 >
                                    <span className={`fi fi-${language.country_code} mx-2`}></span>
                                    {language.name}
                                 </button>
                              </li>
                           })}
                        </ul>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}