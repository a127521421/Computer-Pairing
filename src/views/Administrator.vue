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
            <b-link to='/managecarousels'>輪播圖</b-link>
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
            <b-link to='/managegoods'>商品資料</b-link>
            <ul>
              <li>管理商品資料
              </li>
            </ul>
          </div>
        </div>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>
