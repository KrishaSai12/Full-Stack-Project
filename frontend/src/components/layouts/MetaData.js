// this file handles metaData information
// using Helmet component we changing the title tag from the index.html by taking a argument from the file
import { Helmet } from "react-helmet-async";

export default function MetaData ({title }){
    return(
        <Helmet>
            <title>{`${title} -SAICart`}</title>
        </Helmet>
    )

}