import { useParams } from "react-router-dom";
import CustomerDetails from "./CustomerDetails";

function CustomerDetailsWrapper() {

    console.log("wrapper rendered ")
    const params = useParams(); 
    console.log("params", params); 

    const { id } = useParams();  
    // console.log("CustomerDetailsWrapper - id:", id); 

    // Why isn't id getting passed to customer details

    return <CustomerDetails customerId={id} />;
}

export default CustomerDetailsWrapper;


