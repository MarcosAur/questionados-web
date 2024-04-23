import axios from 'axios'

const questionService = {
  index: async function (){
    const response = await axios.get('http://localhost:8080/questions/find-all', {
      headers: {
        Accept: 'application/json',
      }
    })

    return response.data;
  }
}

export default questionService;