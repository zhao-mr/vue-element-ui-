<template>
  <div class="etosdw">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>标签管理</h2>
      </div>
      <!-- 1级索引 -->
      <div class="Bosconer">
        <div class="Bosconertop">
          <el-row>
            <el-button type="primary" size="small">一级索引列表</el-button>
            <!-- 
            <el-button
              size="small"
              icon="el-icon-edit"
              @click="openxiygai(primaryValue)"
              >编辑索引</el-button
            > -->
          </el-row>
        </div>
        <div class="Bosconermulu">
          <!-- <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
            {{ tag.name }}
          </el-tag> -->
          <el-row>
            <el-button
              type="info"
              size="small"
              plain
              v-for="tag in primary"
              :key="(tag.primaryTitleName, tag.primaryTitleId)"
              :class="tag.primaryTitleId == primaryValue ? 'active' : ''"
              @click="ehyde(tag.primaryTitleId)"
            >
              {{ tag.primaryTitleName }}
              <!-- <i class="el-icon-close" @click="shanchu(tag.primaryTitleId)"></i> -->
            </el-button>
            <el-button size="small" icon="el-icon-plus" @click="opeClickn"
              >添加一级索引</el-button
            >
          </el-row>
        </div>
      </div>

      <!-- 2级目录 -->
      <div class="Bosconer">
        <div class="Bosconertop">
          <el-row>
            <el-button type="primary" size="small">二级索引列表</el-button>
            <!-- <el-button
              size="small"
              icon="el-icon-edit"
              @click="openSecond(eirteValue)"
              >编辑索引</el-button
            > -->
          </el-row>
        </div>
        <div class="Bosconermulu">
          <el-row>
            <el-button
              type="info"
              size="small"
              plain
              v-for="Second in Second"
              :key="Second.secondaryTitleName"
              :class="Second.secondaryTitleId == eirteValue ? 'active' : ''"
              @click="eirte(Second.secondaryTitleId)"
            >
              {{ Second.secondaryTitleName }}
              <!-- <i
                class="el-icon-close"
                @click="shanchuClickn(Second.secondaryTitleId)"
              ></i> -->
            </el-button>
            <el-button size="small" icon="el-icon-plus" @click="SecClickn"
              >添加二级索引</el-button
            >
          </el-row>
        </div>
      </div>
      <!-- {{ explorationCenterId }} -->
      <!-- {{ eirteValue }} -->
      <!-- {{ primaryTitleId }} -->
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import api from "../api/api";
export default {
  data() {
    return {
      primary: [], //一级数据
      primaryValue: "",
      eirteValue: "",
      Second: [], //二级目录
      shwe: "",
      explorationCenterId: "" //id值
      // primaryTitleId: "", //一级选中的值
      // secondaryTitleId: "" //二级选中的值
    };
  },
  computed: {
    id() {
      return this.$store.state.name;
    }
  },
  watch: {
    primaryValue: function(e) {
      // alert(e);
      this.primaryTitleId = e;
      // this.dierji();
      // console.info(this.primaryValue);
    },
    eirteValue: function(e) {
      // alert(e);
      this.secondaryTitleId = e;
    },
    id: function() {
      this.explorationCenterId = this.$store.state.name;
      //请求一级目录
      // this.sajdkwj();
      // console.info("name:", this.$store.state.name);
    },
    explorationCenterId: function() {
      this.sajdkwj();
    }
  },
  methods: {
    // 点击增加一级目录
    opeClickn() {
      this.$prompt("请输入需要添加的一级索引名", "添加一级索引", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          if (value == "" || value == null) {
            this.$message({
              type: "error",
              message: "添加一级索引失败：未输入名称"
            });
          } else {
            //一级增加
            var shure = this.explorationCenterId;
            axios
              .post(api.addpotList, {
                explorationCenterId: shure,
                primaryTitleName: value
              })
              .then(data => {
                if (data.data.status == 0) {
                  this.$message({
                    type: "success",
                    message: data.data.msg
                  });
                  this.sajdkwj(); //再次请求一级，数据刷新
                } else if (data.data.status == 1) {
                  this.$message({
                    type: "info",
                    message: data.data.msg
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(() => {});
    },

    //请求一级目录
    sajdkwj() {
      var shue = this.explorationCenterId;
      // console.log(shue);
      axios
        .post(api.potList, { explorationCenterId: shue })
        .then(data => {
          this.primary = data.data.data;
          if (this.primaryValue == "") {
            this.primaryValue = this.primary[0].primaryTitleId;
            this.ehyde(this.primaryValue);
          }
          // console.info(this.primaryValue);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //  删除一级目录
    // shanchu(e) {
    //   var zhi = e;
    //   this.$confirm("删除后不可恢复", "确定删除一级索引吗", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       axios
    //         .post(api.deletetList, { primaryTitleId: zhi })
    //         .then(data => {
    //           console.log(data);
    //           this.$message({
    //             type: "success",
    //             message: data.data.msg
    //           });
    //           this.sajdkwj(); //再次请求一级，数据刷新
    //         })
    //         .catch(function(error) {
    //           console.log(error);
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //修改一级目录
    // openxiygai(primaryValue) {
    //   console.log(primaryValue);
    //   if (
    //     primaryValue == "" ||
    //     primaryValue == null ||
    //     primaryValue == undefined
    //   ) {
    //     this.$alert("请选择索引", "", {
    //       confirmButtonText: "确定",
    //       callback: action => {
    //         // this.$message({
    //         //   type: "info",
    //         //   message: `action: ${action}`
    //         // });
    //       }
    //     });
    //   } else {
    //     this.$prompt("请输入新的一级索引名", "修改一级索引", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消"
    //     })
    //       .then(({ value }) => {
    //         if (value == "" || value == null) {
    //           this.$message({
    //             type: "error",
    //             message: "添加一级索引失败：未输入名称"
    //           });
    //         } else {
    //           //一级修改
    //           axios
    //             .post(api.updatepotList, {
    //               primaryTitleId: primaryValue,
    //               primaryTitleName: value
    //             })
    //             .then(data => {
    //               console.log(data);
    //               if (data.data.status == 0) {
    //                 this.$message({
    //                   type: "success",
    //                   message: data.data.msg
    //                 });
    //                 this.sajdkwj(); //再次请求一级，数据刷新
    //               } else if (data.data.status == 1) {
    //                 this.$message({
    //                   type: "info",
    //                   message: data.data.msg
    //                 });
    //               }
    //             })
    //             .catch(function(error) {
    //               console.log(error);
    //             });
    //         }
    //       })
    //       .catch(() => {
    //         // this.$message({
    //         //   type: "info",
    //         //   message: "取消输入"
    //         // });
    //       });
    //   }
    // },

    //获取二级目录
    ehyde(e) {
      this.shwe = e;
      this.primaryValue = e;
      this.dierji();
    },
    //获取二级目录
    dierji() {
      axios
        .post(api.Second, { primaryTitleId: this.shwe })
        .then(data => {
          this.Second = data.data.data;
          // console.log(this.eirteValue);
          // if (this.eirteValue == "") {
          //   // this.eirteValue = this.Second[0].secondaryTitleId;
          // }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //增加二级目录
    SecClickn() {
      this.$prompt("请输入需要添加的二级索引名", "添加二级索引", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          if (value == "" || value == null) {
            this.$message({
              type: "error",
              message: "添加二级索引失败：未输入名称"
            });
          } else {
            //二级增加
            axios
              .post(api.addSecond, {
                secondaryTitleName: value,
                primaryTitleId: this.shwe
              })
              .then(data => {
                console.log(data);
                if (data.data.status == 0) {
                  this.$message({
                    type: "success",
                    message: data.data.msg
                  });
                  this.dierji(); //再次请求一级，数据刷新
                } else if (data.data.status == 1) {
                  this.$message({
                    type: "info",
                    message: data.data.msg
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "取消输入"
          // });
        });
    },
    //删除二级目录
    // shanchuClickn(e) {
    //   var zhi = e;
    //   console.log(zhi);
    //   this.$confirm("删除后不可恢复", "确定删除一级索引吗", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       axios
    //         .post(api.deletSecond, { secondaryTitleId: zhi })
    //         .then(data => {
    //           console.log(data);
    //           this.$message({
    //             type: "success",
    //             message: data.data.msg
    //           });
    //           this.dierji(); //再次请求一级，数据刷新
    //         })
    //         .catch(function(error) {
    //           console.log(error);
    //         });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },
    //修改二级目录
    // openSecond(eirteValue) {
    //   console.log(eirteValue);
    //   if (eirteValue == "" || eirteValue == null || eirteValue == undefined) {
    //     this.$alert("请选择索引", "", {
    //       confirmButtonText: "确定",
    //       callback: action => {
    //         // this.$message({
    //         //   type: "info",
    //         //   message: `action: ${action}`
    //         // });
    //       }
    //     });
    //   } else {
    //     this.$prompt("请输入新的一级索引名", "修改一级索引", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消"
    //     })
    //       .then(({ value }) => {
    //         if (value == "" || value == null) {
    //           this.$message({
    //             type: "error",
    //             message: "添加一级索引失败：未输入名称"
    //           });
    //         } else {
    //           //一级修改
    //           axios
    //             .post(api.updateSecond, {
    //               secondaryTitleId: eirteValue,
    //               secondaryTitleName: value
    //             })
    //             .then(data => {
    //               console.log(data);
    //               if (data.data.status == 0) {
    //                 this.$message({
    //                   type: "success",
    //                   message: data.data.msg
    //                 });
    //                 this.dierji(); //再次请求一级，数据刷新
    //               } else if (data.data.status == 1) {
    //                 this.$message({
    //                   type: "info",
    //                   message: data.data.msg
    //                 });
    //               }
    //             })
    //             .catch(function(error) {
    //               console.log(error);
    //             });
    //         }
    //       })
    //       .catch(() => {
    //         // this.$message({
    //         //   type: "info",
    //         //   message: "取消输入"
    //         // });
    //       });
    //   }
    // },

    eirte(e) {
      this.eirteValue = e;
    }
  },
  mounted() {
    // console.info("state", this.$store.state.name);
    // this.explorationCenterId = localStorage.getItem("explorationCenterId");
    //请求一级目录
    this.explorationCenterId = this.$store.state.name;
    // this.sajdkwj();
  }
};
</script>
<style scoped>
.Bosconer {
  width: 100%;
  overflow: hidden;
  margin-bottom: 40px;
}
.Bosconer .Bosconertop {
  width: 100%;
  overflow: hidden;
  padding: 12px 0;
}
.Bosconer .Bosconermulu {
  width: 100%;
  overflow: hidden;
  padding: 12px 0;
  line-height: 3;
}
.Bosconermulu span {
  margin-right: 10px;
}
.Bosconermulu button {
  margin-right: 10px;
  margin-left: 0;
}
.active {
  background: #909399;
  color: #fff;
}
</style>
<style>
.el-button--info.is-plain:focus,
.el-button--info.is-plain:hover {
  background: #909399;
  color: #fff;
}
</style>
