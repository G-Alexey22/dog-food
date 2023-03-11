import { ListFavorites } from "../Components/ListFavorites/ListFavorites";
import{Animation} from "../HOCs/Animation"

export function Favorites() {
  const Animate = Animation(() => {
    return <ListFavorites />;
  });
  return <Animate />;
}
