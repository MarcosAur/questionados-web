import axios from 'axios'

const rankService = {
  saveNewRank: async function(totalPoints){
    const response = await axios.post("http://localhost:8080/ranks/save", {
      points: totalPoints,
      name: 'Alunos teste alpha',
    }, {
      headers: {
        Accept: "application/json",
      }
    }
    )

    return response.data;
  },

  getPosition: async function (rankId){
    const response = await axios.get("http://localhost:8080/ranks/find-position-in-rank/", {
      params: {
        id: rankId
      },
      headers: {
        Accept: "application/json"
      }
    });

    return response.data;
  }
};

export default rankService;