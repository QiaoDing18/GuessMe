<template>
  <main class="container">
    <header class="header">
      <section class="header-title">
        <p>GuessMe</p>
      </section>

      <section class="header-btn">
        <button @click.stop="createRoom">创建房间</button>
      </section>
    </header>

    <section class="room">
      <ul class="room-list">
        
        <li class="room-ele" v-for="room in roomList" @click.stop="enterRoom(room.token, room.id)">
          <div class="room-ele-logo">
            <img src="./img/room.png" alt="">
          </div>
          <div class="room-ele-title">
            <p>房间：{{ room.id }}</p>
          </div>
          <div class="room-ele-lock">
            <img src="./img/right.png" alt="">
          </div>
        </li>

      </ul>
    </section>
  </main>

</template>

<style scoped>
  @import './css/index-page.css'
</style>

<script src="./js/index-page.js"></script>
