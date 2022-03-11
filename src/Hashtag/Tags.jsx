import { useEffect,useState } from "react"
import HOST from "../Hosts"

function Tags() {
    const [hashtags, setHashtags] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch(`${HOST}/hashtag/tag/`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
      })
      .then(resp => resp.json())
      .then(resp => setHashtags(resp))
      .catch(error => console.log(error))
    },[])

    return hashtags
        // <div>   

        //     {hashtags.map((tag)=><h1>{tag.name}</h1>)}
        // </div>
    
}

export default Tags;