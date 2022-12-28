import axios from "axios"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Preloader } from "../Preloader/Preloader"
import { ActiveUserType, UserType } from "./GitHub"
import { Timer } from "./Timer"

type UserDetailsPropsType = {
   user: UserType | null
}
export const UserDetails: React.FC<UserDetailsPropsType> = ({ user }) => {
   const initialTimeValue = 10
   const [activeUser, setActiveUser] = useState<ActiveUserType | null>(null)
   const [seconds, setSeconds] = useState(initialTimeValue)
   const [isFetching, setIsFetching] = useState(false)
   const {t} = useTranslation(['githubApi']);

   useEffect(() => {
      if (seconds < 1) {
         setActiveUser(null)
      }
   }, [seconds])

   useEffect(() => {
      if (!!user) {
         setIsFetching(true)
         axios.get<ActiveUserType>(`https://api.github.com/users/${user.login}`).then(response => {
            setSeconds(initialTimeValue)
            setIsFetching(false)
            return setActiveUser(response.data)
         })
      }
   }, [user])

   return (
      <>
         <div style={{ fontSize: "20px" }}>
            {activeUser && <>
               {isFetching ? <Preloader /> :
                  <div>
                     <Timer seconds={seconds} timerKey={activeUser.id.toString()} onSecondsChange={setSeconds} />
                     <img
                        style={{ borderRadius: "50%", maxWidth: "200px", marginBottom: "10px" }}
                        src={activeUser.avatar_url} alt=""
                     />
                     <div><b>{t("username")}:</b> {activeUser.login}</div>
                     <div><b>{t("followers")}:</b> {activeUser.followers}</div>
                  </div>
               }
            </>}
         </div>
      </>
   );
}