import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function useApi(endpoint) {


    function getallBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/${endpoint}`)
    }

    let response = useQuery({
        queryKey: [endpoint],
        queryFn: getallBrands
    })


    return response
}
