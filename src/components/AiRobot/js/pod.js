import axios from 'axios';

export default {
  getPods() {
    return new Promise(function (resolve, rejcet) {
      const data = { pageNum: 1, pageSize: 10, total: 0, isDelete: 0 };

      const headers = {
        'content-type': 'application/json',
      };

      let api = 'https://inscode-api.csdn.net/api/v2/resource/pagekey/ipod/kppod_self';

      axios
        .post(api, data, { headers })
        .then(response => {
          debugger;
          if (response.status === 200 && response?.data?.images) {
            const image = response?.data?.images[0];
            resolve('data:image/png;base64,' + image);
          }
        })
        .catch(err => {
          rejcet(err);
        });
    });
  },
};
