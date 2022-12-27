import { useTranslation } from "react-i18next";

export const Home = () => {
   const {t} = useTranslation(['common']);
   return (
      <div className="text-center mt-5">
         <h1>{t("content")}</h1>
         <button className="btn btn-dark">{t("submit")}</button>
      </div>
   );
}