import axios from "axios";

const endPoints = (req, res) => {
    const url = "http://localhost:8000";
    let resp;

    switch(req) {
        case "getList": {
            console.log("here!");
            try {
                axios({
                    method: 'get',
                    url: '/getList',
                    responseType: 'stream'
                  }).then(res => {
                    // setList(JSON.parse(res.data).data)
                    resp = JSON.parse(res.data).data
                  })
            } catch(err) {
                console.error(err);
            }
        }; break;
        case "add": {
            try {
                axios({
                    method: 'post',
                    url: '/add',
                    data: res
                })
            } catch(err) {
                console.error(err);
            }
        }; break;
    }
    return resp;
}

export default endPoints;