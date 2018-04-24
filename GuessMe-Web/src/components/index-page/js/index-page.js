import axios from 'axios';
import * as type from '@/store/mutation-types';
import serverPath from '@/server-path';

export default {
  name: 'index-page',
  data () {
    return {
      roomList: []
    }
  },

  mounted () {
    let url = serverPath + '/webSocket/getRooms';
    axios.get(url, {withCredentials:true}).then((res, req) => {
      console.log(res.data);
      if(res.data.errcode === 0){
        this.roomList = res.data.rooms;
      }
    });
  },


  methods: {
    changeID (newVal){
      this.$store.commit(type.CHANGE_ID, newVal);
    },
    changeToken (newVal){
      this.$store.commit(type.CHANGE_TOKEN, newVal);
    },
    createRoom (){
      let url = serverPath + '/token/create';
      this.changeID('owner');
      axios.get(url,{
        withCredentials: true
      }).then((res) => {
        console.log(res.data);
          this.changeToken(res.token);
          this.$router.push({
            path: '/show-page',
            query: {
              id: this.roomList.length + 1
            }
          });
      }).catch((error) => {
        console.log(error.config);
      });
    },
    enterRoom (token, id){
      let url = serverPath + '/webSocket/connect/' + token;

      this.changeID('host');
      axios.get(url, {withCredentials: true}).then((res, req) => {
        console.log(res.data);
        if(res.data.errcode === 0){
          this.$router.push({
            path: '/show-page',
            query: {id:id}
          });
        }
      }).catch((error) => {
        console.log(error.config);
      });
    }
  }
}