import { StartPage } from "../Components/StartPage/StartPage";
import{Animation} from "../HOCs/Animation"

export function First() {
    const Animate = Animation(()=>{
        return(<StartPage/>)
      })
    return ( 
        <Animate/>
     );
}

