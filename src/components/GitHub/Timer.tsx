import { useEffect, useState } from "react";

type TimerPropsType = {
   seconds: number
   onSecondsChange: (actualSeconds: number) => void
   timerKey: string
}
export const Timer: React.FC<TimerPropsType> = (props) => {
   const [seconds, setSeconds] = useState(props.seconds)

   useEffect(() => {
      setSeconds(props.seconds)
   }, [props.seconds])

   useEffect(() => {
      const intervalId = setInterval(() => {
         setSeconds((prev) => prev - 1)
      }, 1000)

      return () => {
         clearInterval(intervalId)
      }
   }, [props.timerKey])

   useEffect(() => {
      props.onSecondsChange(seconds)
   }, [seconds])

   return (
      <div>{seconds}</div>
   );
}