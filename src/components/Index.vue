<template>
  <el-container>
    <el-header
      height="72px"
      style="padding-left: 240px;border-bottom: 1px solid #ccc;"
    >
      <div class="Bostop">
        <div class="Bosidex">
          <el-link
            v-for="Bosidex in Center"
            :key="(Bosidex.explorationCenterName, Bosidex.explorationCenterId)"
            :class="Bosidex.explorationCenterId == expValue ? 'active' : ''"
            @click="xuanxiang(Bosidex.explorationCenterId)"
          >
            <h2>{{ Bosidex.explorationCenterName }}</h2>
          </el-link>
        </div>

        <div class="tuichu">
          <el-row>
            <el-button @click="tuichu">退出</el-button>
          </el-row>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside width="240px">
        <el-menu
          :default-active="activeIndex"
          background-color
          @open="handleOpen"
          class="el-menu-vertical-demo"
        >
          <router-link :to="{ path: 'tagmanage' }" class="quchu">
            <el-menu-item index="tagmanage">
              <i class="el-icon-menu"></i>
              <span slot="title">标签管理</span>
            </el-menu-item>
          </router-link>
          <router-link :to="{ path: 'resourcemanage' }" class="quchu">
            <el-menu-item index="resourcemanage">
              <i class="el-icon-document"></i>
              <span slot="title">资源管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- {{ Center }} -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import axios from "axios";
import api from "../api/api";
export default {
  data() {
    return {
      Center: [],
      expValue: "",
      activeIndex: "tagmanage"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    tuichu() {
      this.$router.push({ path: "/" }); //退出登录页面
    },

    //点击选择
    xuanxiang(e) {
      this.expValue = e;
      this.$store.commit("setName", this.expValue);
    }
  },
  mounted() {
    // console.log(window.location.href.split("/")[3]);
    // this.activeIndex = window.location.href.split("/")[3];
    //获取信息
    axios
      .get(api.Center)
      .then(data => {
        // console.log(data);
        this.Center = data.data.data;
        if (this.expValue == "") {
          this.expValue = this.Center[0].explorationCenterId;
          this.xuanxiang(this.expValue); //默认第一个
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 70px;
  background-color: #fff;
  /* border-bottom: 1px solid #ccc; */
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 240px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
  bottom: 0;
}
.el-header {
  padding: 0;
  z-index: 1000;
}

/* // header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>) */
.el-header .fr {
  float: right;
}
.el-header .el-menu {
  border-bottom: none;
}
.el-aside,
.el-main {
  padding-top: 100px;
}
/* .el-aside {
  background: #545c64;
} */
.el-aside .el-menu {
  border-right: none;
}
.Bosidex {
  float: left;
  padding: 0 20px;
}
.tuichu {
  float: right;
  padding-right: 20px;
}
.quchu {
  text-decoration: none;
}
.Bostop {
  width: 100%;
  overflow: hidden;
}

/* 子页面公用 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
}
.etosdw {
  margin-top: 30px;
}
.Bosidex .el-link {
  margin-right: 45px;
}
.active {
  color: #409eff;
  border-bottom: 1px solid #409eff;
}
</style>
