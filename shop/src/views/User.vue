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
  </div>
</template>
