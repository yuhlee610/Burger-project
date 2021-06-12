import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-545ae-default-rtdb.firebaseio.com/'    
})

export default instance