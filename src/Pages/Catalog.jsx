
import { SearchMemo } from "../Components/Search/Search";
import{ListCard} from "../Components/ListCard/ListCard"
import {FooterMemo} from "../Components/Footer/Footer"

export function Catalog(props) {
 
  return (
    <>
    
      <SearchMemo />
      <ListCard/>
      <FooterMemo />
    </>
  );
}
