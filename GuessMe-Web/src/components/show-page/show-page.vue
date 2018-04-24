<template>
  <div class="show-page">
    
    <main class="container" id="room">
      <header class="header">
        <p class="header-title">
          <router-link to="/index-page">&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
        </p>
        <p class="header-state">正在游戏中....</p>
      </header>

      <nav class="nav">
        <div class="ownerSub" v-if="this.id==='owner'">
          <span class="owner-ans" v-text="ownerData"></span>
        </div>

        <div class="hostSub" v-else>
          <div class="host-bar">
            <input type="text" placeholder="输入答案" v-model="answer">
            <button v-on:click="checkAns">发送</button>
          </div>
          <span class="host-ans" v-text="hostData"></span>
        </div>
      </nav>

      <section class="paint" id="paint">
        <div class="paint-tools">
          <img src="./img/pointPencil.png"  ref="cursorPencil">
          <img src="./img/pointEraser.png"  ref="cursorEraser">
        </div>


        <div class="paint-board" ref="paintBoard">
          <section @mousemove.stop="mouseFollow">
            <paper-writter v-if="this.id==='owner'"
                           ref="paperWritter"
                           :width="paperWidth"
                           :height="paperHeight"
                           :type="drawType"
                           :pencilSize="pencilSize"
                           :eraserSize="eraserSize"
                           :color="drawColor"
                           @draw="sendDrawEvent2ServerUseSocket"
            ></paper-writter>
            <paper-reader v-if="this.id==='host'"
                          ref="paperReader"
                          :width="paperWidth"
                          :height="paperHeight"
            ></paper-reader>
          </section>
        </div>

        <aside class="paint-tool" v-if="this.id==='owner'">
        <!-- <aside class="paint-tool"> -->
          <ul>
            <li @click="adjust($event,'pencil')">
              <img class="paint-li" src="./img/pencil.png">
              <div class="slider-range pencil" :class="{active: pencilShow}">
                <input class="slider-vertical" type="range" min="1" max="6" v-model="pencilSize"/>
                <div class="colorpicker"></div>
              </div>
            </li>
            <li @click="adjust($event,'eraser')">
              <img class="paint-li" src="./img/eraser.png">
              <div class="slider-range eraser" :class="{active: eraserShow}">
                <input class="slider-vertical" type="range" min="1" max="6" v-model="eraserSize"/>
              </div>
            </li>
            <li @click="clearCanvas">
              <img id="paint-big" class="paint-li" src="./img/clean.png">
            </li>
          </ul>
        </aside>
      </section>
    </main>

  </div>
</template>

<style scoped>
  @import './css/show-page.css'
</style>

<script src="./js/show-page.js"></script>