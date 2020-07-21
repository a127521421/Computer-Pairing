<template>
  <div id="administrator">
    <b-container>
    <h1 class="text-center">管理員</h1>
    <b-row>
      <b-col cols="6">
        <div id="card3">
          <h3>
            <b><i ></i>輪播圖</b>
          </h3>
          <div class="card">
            <b-link to='/'>輪播圖</b-link>
              <ul>
                <li>管理輪播圖
                </li>
              </ul>
          </div>
        </div>
      </b-col>
      <b-col cols="6">
        <div id="card4">
          <h3>
            <b><i ></i>商品資料</b>
          </h3>
          <div class="card">
            <b-link to='/changepassword'>商品資料</b-link>
            <ul>
              <li>管理商品資料
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
    </b-container>
    <footer id="administratorfooter">
      <span>Computer pairing 版權所有 © All Rights Reserved.</span>
    </footer>
  </div>
</template>

<style>
#administratorfooter {
  text-align: center;
  color: black;
  font-size: 2rem;
  font-family: '微軟正黑體';
  position: absolute;
  bottom: 0;
  left:50%;
  transform: translate(-50%);
}
</style>
