import {UserDetail} from "../Components/UserDetail/UserDetail"
import{Animation} from "../HOCs/Animation"

export function User() {
    const Animate = Animation(()=>{
        return(<UserDetail/>)
      })
    return ( <Animate/> );
}

