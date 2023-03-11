import { BasketTable } from "../Components/BasketTable/BasketTable";
import{Animation} from "../HOCs/Animation"

export function Basket() {
  const Animate = Animation(()=>{
    return(<BasketTable />)
  })
  return <Animate/> ;
}
