<template>
  <div class="user">
    <b-container>
      <h1 class="text-center">會員中心</h1>
      <b-row>
        <b-col cols="6">
          <div id="card1">
            <h3>
              <b><i ></i>願望清單</b>
            </h3>
            <div class="card">
              <b-link to='/'>願望清單</b-link>
              <ul>
                <li>查看你的願望清單
                </li>
              </ul>
            </div>
          </div>
        </b-col>
        <b-col cols="6">
          <div id="card2">
            <h3>
              <b><i ></i>修改密碼</b>
            </h3>
            <div class="card">
              <b-link to='/changepassword'>修改密碼</b-link>
              <ul>
                <li>修改您的會員登入密碼
                </li>
              </ul>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <footer id="userfooter">
      <span>Computer pairing 版權所有 © All Rights Reserved.</span>
    </footer>
  </div>
</template>

<style>
  #userfooter {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  text-align: center;
  color: black;
  font-size: 2rem;
  font-family: '微軟正黑體';
  position: absolute;
  bottom: 0;
  left:50%;
  transform: translate(-50%);
}
@media (max-width: 576px) {
  #userfooter {
    font-size:1rem;
  }
}
</style>
