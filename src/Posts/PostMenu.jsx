import { AddMenu, Item } from "../components/MyNavbar"

function PostMenu(props){
    return(
      <AddMenu postlink={`/add/${props.id}`} post={props.id.charAt(0).toUpperCase()+props.id.slice(1)} />
    )
}

export default PostMenu