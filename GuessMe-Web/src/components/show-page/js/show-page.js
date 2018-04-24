import { mapState } from 'vuex'
import axios from 'axios'
import * as type from '@/store/mutation-types'
import PaperWritter from '../../paper/paper-writter.vue';
import PaperReader from '../../paper/paper-reader.vue';
import serverPath from '@/server-path';
export default {
  name: 'show-page',
  data () {
    return {
      socket: '',
      reader: '',
      pencilShow: false,
      eraserShow: false,
      circleShow: false,
      rectangleShow: false,
      widthDiff: '',
      pencilSize: 4,
      eraserSize: 4,
      drawType: 'pen',
      drawColor: null,
      roomId: 0,
      ownerData: '',
      hostData: '',
      answer: '',
      paperHeight: 0,
      paperWidth: 0
    }
  },
  mounted () {
    this.roomId = this.$route.query.id;
    this.initPaperBoard();
    this.$nextTick(() => {
      // 等待vuex数据更新
      let time = setInterval(() => {
        if (this.id !== '') {
          clearInterval(time);
          this.justify();
          this.initColorBoard();
        } 
      }, 200)
    })
  },
  watch: {
    // 改变笔刷大小
    pencilSize (newValue) {
      this.$refs['cursorPencil'].style.height = `${newValue * 10}px`;
      this.$refs['cursorPencil'].style.width = `${newValue * 10}px`;
    },
    // 改变橡皮大小
    eraserSize (newValue) {
      this.$refs['cursorEraser'].style.height = `${newValue * 10}px`;
      this.$refs['cursorEraser'].style.width = `${newValue * 10}px`;
    }
  },
  computed: {
    ...mapState({
      id: (state) => state.id,
      token: (state) => state.token
    })
  },
  methods: {
    clearCanvas () {
      this.$refs.paperWritter.clear();
    },
    // 初始化画板
    initColorBoard () {
      for (let em of $('.colorpicker')) {
        $(em).ClassyColor({
          color: '#A98C61',
          colorSpace: 'rgb',
          labels: true,
          staticComponents: true,
          displayColor: 'css',
        }).on('newcolor',(event,data)=>{
          this.drawColor = data.toString();
        });
      }
    },
    initPaperBoard () {
      let screenHeight = window.innerHeight;
      let screenWidth = window.innerWidth;
      this.paperHeight = 0.8 * screenHeight;
      this.paperWidth = 0.9 * screenWidth;
    },
    // 调整画笔和橡皮大小事件
    adjust (event, name) {
      let elt = event.target;
      while(elt.tagName.toLowerCase() !== 'body'){
        if(elt.className.indexOf('slider-range') !== -1){
          return;
        };
        elt = elt.parentNode;
      }
      switch (name) {
        case 'pencil':
          this.drawType = 'pen';
          this.pencilShow = !this.pencilShow;
          this.eraserShow = false;
          this.circleShow = false;
          this.rectangleShow = false;
          this.paint = true;
          break;
        case 'eraser':
          this.drawType = 'eraser';
          this.eraserShow = !this.eraserShow;
          this.pencilShow = false;
          this.circleShow = false;
          this.rectangleShow = false;
          this.paint = false;
          break;
      }
    },
    //鼠标跟随移动
    mouseFollow (event) {
      event.preventDefault();
      event.stopPropagation();
      this.widthDiff = (window.innerWidth - this.$refs['paint'].offsetWidth) / 2;
      if (this.widthDiff < 0) {
        this.widthDiff = 0;
      }
      let topX = event.clientY - 125;
      let leftX = event.clientX - this.widthDiff;
      if (this.drawType == 'pen' && this.id !== 'host') {
        let penHeight = this.$refs['cursorPencil'].height;
        this.$refs['cursorEraser'].style.display = 'none';
        this.$refs['cursorPencil'].style.display = 'block';
        this.$refs['cursorPencil'].style.top = `${topX - penHeight - 1}px`;
        this.$refs['cursorPencil'].style.left = `${leftX}px`;
        this.$refs['paintBoard'].style.cursor = 'none';
      } else if (this.drawType == 'eraser' && this.id !== 'host') {
        let eraHeight = this.$refs['cursorEraser'].height;
        this.$refs['cursorEraser'].style.display = 'block';
        this.$refs['cursorPencil'].style.display = 'none';
        this.$refs['cursorEraser'].style.top = `${topX - eraHeight - 2}px`;
        this.$refs['cursorEraser'].style.left = `${leftX}px`;
        this.$refs['paintBoard'].style.cursor = 'none';
      } else if(this.id !== 'host'){
        this.$refs['paintBoard'].style.cursor = 'pointer';
        this.$refs['cursorEraser'].style.display = 'none';
        this.$refs['cursorPencil'].style.display = 'none';
      }
    },
    // 向服务器发送数据
    sendDrawEvent2ServerUseSocket () {
      this.socket.emit('message',...arguments);
      console.log(...arguments);
    },
    // 判断房主还是宾客
    justify () {
      let url = serverPath;;
      let socket = io.connect(url);
      this.socket = socket;
      if (this.id === 'owner') {
        //如果是房主就申请题目放到global.data里并且返回题目
        this.setSubject();
        socket.on('checkmsg', (data) => {
          if (data === 'success') {
            console.log('有人答对了！');
            this.setSubject();
          } else{
            console.log('有人答错了！');
          }
        });
      } else if (this.id === 'host') {
        this.getSubject();
        this.$refs['cursorEraser'].style.display = 'none';
        this.$refs['cursorPencil'].style.display = 'none';
        let that = this;
        socket.on('message', (data) => {
          if(that.$refs.paperReader) {
            that.$refs.paperReader.dispatch(data);
          }
        });
        socket.on('checkmsg', (data) => {
          if(data === 'success') {
            setTimeout(() => {
              this.getSubject();
            },1000);
          }
        })
      }
    },
    getSubject () {
      let url = serverPath + '/subject/get/' + this.roomId;
      axios.get(url,{withCredentials:true}).then((res, req) => {
        console.log(res.data);
        if (res.data.errcode === 0) {
            this.hostData = res.data.des;
        } else {
          console.log('error');
        }
      });
    },
    setSubject () {
      let url = serverPath + '/subject/set/' + this.roomId;
      axios.get(url,{withCredentials:true}).then((res, req) => {
        console.log(res.data);
        console.log(res.data.ans);
        if (res.data.errcode === 0) {
          this.ownerData = res.data.des + ":" + res.data.ans;
        } else {
          console.log('error');
        }
      });
    },
    checkAns () {
      let url = serverPath + '/subject/check/' + this.answer +"/" + this.roomId;
      axios.get(url,{withCredentials:true}).then((res, req) => {
        if (res.data.errcode === 0) {
          this.socket.emit('checkmsg',{'msg': 'success','token': document.cookie});
          this.answer = '';
          alert("你答对了哦");          
        } else {
          this.socket.emit('checkmsg',{'msg': 'error','token': document.cookie});
          alert ("你答错了哦");
          this.answer = '';
        }
      });
    }
  },
  components:{
    'paper-reader':PaperReader,
    'paper-writter':PaperWritter,
  }
}