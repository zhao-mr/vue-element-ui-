<template>
  <div class="etosdw">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>资源管理</h2>
        <div>
          <el-row>
            <el-button type="primary" @click="tijiaobut">上传</el-button>
          </el-row>
        </div>
      </div>
      <div class="souyin">
        <div class="aoute">
          <el-row>
            <el-button type="info" plain><label>一级索引:</label></el-button>
          </el-row>
        </div>
        <div class="teoe">
          <el-select
            v-model="primaryvalue1"
            placeholder="请选择一级索引"
            @change="currentSel"
          >
            <el-option
              v-for="item in primary1"
              :key="item.primaryTitleId"
              :label="item.primaryTitleName"
              :value="item.primaryTitleId"
            >
            </el-option>
          </el-select>
        </div>

        <div class="aoute">
          <el-row>
            <el-button type="info" plain><label>二级索引:</label></el-button>
          </el-row>
        </div>

        <div class="teoe">
          <el-select
            v-model="Secondvalue1"
            placeholder="请选择二级索引"
            @change="currentSeleao"
          >
            <el-option
              v-for="item in Second1"
              :key="item.secondaryTitleId"
              :label="item.secondaryTitleName"
              :value="item.secondaryTitleId"
            >
            </el-option>
          </el-select>
        </div>

        <div class="aoute">
          <el-row>
            <el-button type="primary" icon="el-icon-search" @click="search"
              >筛选</el-button
            >
          </el-row>
        </div>
        <div class="aoute">
          <el-row>
            <el-button icon="el-icon-refresh-right" @click="Reset"
              >重置</el-button
            >
          </el-row>
        </div>
      </div>
      <div class="boscone1" v-show="leishow">
        <!-- 列表 -->
        <div class="leibiao" id="Boslei1">
          <el-table :data="listPicture" border style="width: 100%">
            <!-- <el-table-column prop="date" label="日期" width="180">
          </el-table-column> -->
            <el-table-column prop="picturePathId" label="资源编号" width="100">
            </el-table-column>
            <el-table-column prop="pictureName" label="资源名称" width="">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="缩略图">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.pictureTargetPath"
                    :preview-src-list="[scope.row.picturePath]"
                  >
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    size="small"
                    @click="modify(scope.row.picturePathId)"
                    >修改</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="Remove(scope.row.picturePathId)"
                    >删除</el-button
                  >
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-size="this.pageSize"
            layout=" prev, pager, next"
            :page-count="this.pages"
          >
          </el-pagination>
        </div>
      </div>

      <div class="boscone1" v-show="isShow">
        <!-- 列表 -->
        <div class="leibiao" id="Boslei1">
          <el-table :data="listPicture2" border style="width: 100%">
            <!-- <el-table-column prop="date" label="日期" width="180">
          </el-table-column> -->
            <el-table-column prop="picturePathId" label="资源编号" width="100">
            </el-table-column>
            <el-table-column prop="pictureName" label="资源名称" width="">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="缩略图">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.pictureTargetPath"
                    :preview-src-list="[scope.row.picturePath]"
                  >
                  </el-image>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    size="small"
                    @click="modify(scope.row.picturePathId)"
                    >修改</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="Remove(scope.row.picturePathId)"
                    >删除</el-button
                  >
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="1"
            :page-size="this.pageSize1"
            layout=" prev, pager, next"
            :page-count="this.pages1"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!-- 上传内容 -->
    <el-dialog
      title="信息填写"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="centerDialogtop">
        <div class="DialogLfent">
          <el-row>
            <el-button type="info" plain><label>一级索引:</label></el-button>
          </el-row>
        </div>
        <div class="DialogRinge">
          <el-select
            v-model="primaryvalue2"
            placeholder="请选择一级索引"
            @change="currentSel"
          >
            <el-option
              v-for="item in primary2"
              :key="item.primaryTitleId"
              :label="item.primaryTitleName"
              :value="item.primaryTitleId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="centerDialogtop">
        <div class="DialogLfent">
          <el-row>
            <el-button type="info" plain><label>二级索引:</label></el-button>
          </el-row>
        </div>
        <div class="DialogRinge">
          <el-select v-model="Secondvalue2" placeholder="请选择二级索引">
            <el-option
              v-for="item in Second2"
              :key="item.secondaryTitleId"
              :label="item.secondaryTitleName"
              :value="item.secondaryTitleId"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="Boss">
        <div class="centeraotu">
          <p>输入新的资源名</p>

          <el-input v-model="input" placeholder="输入新的资源名"></el-input>
        </div>

        <div class="centerImg">
          <p>选择图片</p>
          <p>
            注：图片长、宽需为2的n次幂像素值；例：256、512、1024、2048
          </p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改内容 -->
    <el-dialog
      title="信息填写"
      :visible.sync="centerDialogVisible2"
      width="30%"
      center
    >
      <div class="centerDialogtop">
        <div class="DialogLfent">
          <el-row>
            <el-button type="info" plain><label>一级索引:</label></el-button>
          </el-row>
        </div>
        <div class="DialogRinge">
          <el-select
            v-model="primaryvalue2"
            placeholder="请选择一级索引"
            @change="currentSel"
          >
            <el-option
              v-for="item in primary2"
              :key="item.primaryTitleId"
              :label="item.primaryTitleName"
              :value="item.primaryTitleId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="centerDialogtop">
        <div class="DialogLfent">
          <el-row>
            <el-button type="info" plain><label>二级索引:</label></el-button>
          </el-row>
        </div>
        <div class="DialogRinge">
          <el-select v-model="Secondvalue2" placeholder="请选择二级索引">
            <el-option
              v-for="item in Second2"
              :key="item.secondaryTitleId"
              :label="item.secondaryTitleName"
              :value="item.secondaryTitleId"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="Boss">
        <div class="centeraotu">
          <p>输入新的资源名</p>

          <el-input v-model="input" placeholder="输入新的资源名"></el-input>
        </div>

        <div class="centerImg">
          <p>选择图片</p>
          <p>
            注：图片长、宽需为2的n次幂像素值；例：256、512、1024、2048
          </p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleChange"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="upload2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import api from "../api/api";

export default {
  data() {
    return {
      centerDialogVisible: false,
      centerDialogVisible2: false,
      primaryvalue1: "",
      primaryvalue2: "",
      value: "",
      input: "",
      listPicture: [], //列表
      listPicture2: [], //搜索列表
      imageUrl: "",
      explorationCenterId: "", //id值
      primary1: [], //一级数据
      primary2: [], //一级数据
      Second1: [], //二级数据
      Second2: [], //二级数据
      Secondvalue1: "",
      Secondvalue2: "",
      selVal: "", //搜索选中的值
      fileList: [],

      filterPicture: [], // 搜索出数据
      Visible2zhi: "",

      pages: 1, //页数
      pageSize: 10, //每页数量
      pageNum: 1, //每页数量

      isShow: false,
      leishow: true,

      pages1: 1, //搜索页数
      pageSize1: 10, //搜索每页数量
      pageNum1: 1 //搜索每页数量
    };
  },
  computed: {
    id() {
      return this.$store.state.name;
    }
  },
  watch: {
    id: function() {
      this.explorationCenterId = this.$store.state.name;
    },
    explorationCenterId: function() {
      this.sajdkwj();
      this.leisxin();
    }
  },
  methods: {
    //请求列表
    leisxin() {
      var shue = this.explorationCenterId;
      axios
        .post(api.listPicture, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          explorationCenterId: shue
        })
        .then(data => {
          // console.log(data.data.data.list);
          this.listPicture = data.data.data.list;
          this.pages = data.data.data.pages;
          this.pageSize = data.data.data.pageSize;
          this.pageNum = data.data.data.pageNum;
          // this.pageNum = data.data.data.pageNum;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleChange(file) {
      this.fileList = [file];
      this.imageUrl = URL.createObjectURL(file.raw);
      this.beforeAvatarUpload(file);
    },
    beforeAvatarUpload(file) {
      // 上传图片前处理函数
      const isJPG =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      // file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      let that = this;
      let isAllow = false;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png 格式!");
        this.imageUrl = "";
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.imageUrl = "";
        return false;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      let _this = this;
      reader.onload = function() {
        // console.info(reader.result);
        var img = new Image();
        img.src = reader.result;
        img.onload = function() {
          // console.log(img.width, img.height);
          var width = img.width;
          var height = img.height;
          // console.log(width, height);
          if (
            (height == 256 && width == 256) ||
            (height == 512 && width == 512) ||
            (height == 1024 && width == 1024) ||
            (height == 2048 && width == 2048)
          ) {
            // alert("正确");
            return true;
          } else {
            // this.imageUrl = "";
            // alert("请输入正确规定的图片宽高");
            // console.info()
            return false;
          }
        };
        setTimeout(function() {
          if (!img.onload()) {
            _this.imageUrl = "";
            _this.$message.error("请输入正确规定的图片宽高!");
          }
        }, 100);
      };
    },
    //请求一级目录
    sajdkwj() {
      var shue = this.explorationCenterId;
      // console.log(shue);
      axios
        .post(api.potList, { explorationCenterId: shue })
        .then(data => {
          this.primary1 = data.data.data;
          this.primary2 = data.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //一级选中
    currentSel(e) {
      // this.Secondvalue1 = "";
      // this.Secondvalue2 = "";
      //请求二级
      axios
        .post(api.Second, { primaryTitleId: e })
        .then(data => {
          this.Second1 = data.data.data;
          this.Second2 = data.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //二级选中
    currentSeleao(e) {
      this.selVal = e;
    },
    //筛选搜索
    search() {
      if (this.selVal == "") {
        this.$message.warning("请选择索引");
      } else {
        axios
          .post(api.filterPicture, {
            pageNum: this.pageNum1,
            pageSize: this.pageSize1,
            secondId: this.selVal
          })
          .then(data => {
            this.isShow = true;
            this.leishow = false;
            // console.log(data.data.data.list);
            // this.filterPicture = data.data.data.list;
            this.listPicture2 = data.data.data.list; //改变数据
            this.pages1 = data.data.data.pages;
            this.pageSize1 = data.data.data.pageSize;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    //重置
    Reset() {
      this.primaryvalue1 = "";
      this.Secondvalue1 = "";
      this.selVal = "";
      // this.leisxin();
      this.isShow = false;
      this.leishow = true;
    },

    //上传

    tijiaobut() {
      this.centerDialogVisible = true;
      this.primaryvalue2 = "";
      this.Secondvalue2 = "";
      this.input = "";
      this.imageUrl = "";
      this.Second2 = "";
    },

    upload() {
      if (
        this.primaryvalue2 == "" ||
        this.Secondvalue2 == "" ||
        this.input == "" ||
        this.imageUrl == ""
      ) {
        this.$message({
          showClose: true,
          message: "请填写完整信息!",
          type: "warning"
        });
      } else {
        const formData = new FormData();
        // 因为要传一个文件数组过去，所以要循环append
        this.fileList.forEach(file => {
          formData.append("file", file.raw);
        });
        formData.append("secondaryTitleId", this.Secondvalue2);
        formData.append("pictureName", this.input);
        // console.info(formData.getAll("key"));
        axios
          .post(api.imagesture, formData)
          .then(data => {
            // console.log(data);
            this.$message({
              showClose: true,
              message: data.data.msg,
              type: "success"
            });
            this.centerDialogVisible = false;
            this.isShow = false;
            this.leishow = true;
            this.leisxin();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //修改
    modify(picturePathId) {
      this.centerDialogVisible2 = true;

      this.Visible2zhi = picturePathId;
      axios
        .post(api.PicturePicture, {
          picturePathId: picturePathId
        })
        .then(data => {
          this.primaryvalue2 = data.data.data.primaryId;
          this.Secondvalue2 = data.data.data.secondId;
          this.input = data.data.data.pictureName;
          this.imageUrl = data.data.data.pictureTargetPath;
          this.currentSel(data.data.data.primaryId); //赋值一级的值
          // this.primaryvalue2 = this.
          // this.currentSel(e);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    upload2() {
      if (
        this.primaryvalue2 == "" ||
        this.Secondvalue2 == "" ||
        this.input == "" ||
        this.imageUrl == ""
      ) {
        this.$message({
          showClose: true,
          message: "请填写完整信息!",
          type: "warning"
        });
      } else {
        const formData = new FormData();
        // 因为要传一个文件数组过去，所以要循环append
        this.fileList.forEach(file => {
          formData.append("file", file.raw);
        });
        formData.append("picturePathId", this.Visible2zhi);
        formData.append("pictureName", this.input);
        formData.append("secondId", this.Secondvalue2);
        axios
          .post(api.compPicture, formData)
          .then(data => {
            // console.log(data);
            this.$message({
              showClose: true,
              message: data.data.msg,
              type: "success"
            });
            this.centerDialogVisible2 = false;
            this.isShow = false;
            this.leishow = true;
            this.leisxin();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    //删除
    Remove(picturePathId) {
      this.$confirm("删除后不可恢复", "确定删除一级索引吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post(api.deletePicture, {
              picturePathId: picturePathId
            })
            .then(data => {
              this.$message({
                showClose: true,
                message: data.data.msg,
                type: "success"
              });
              this.leisxin();
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val; //改变页数
      this.leisxin(); //再次获取
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange1(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum1 = val; //改变页数
      this.search(); //再次获取
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    }
  },
  mounted() {
    // 获取列表
    // this.leisxin();
    //请求一级目录
    this.explorationCenterId = this.$store.state.name;
    // this.sajdkwj();
  },
  created() {
    localStorage.setItem("page", "resourcemanage");
    // localStorage.setItem("page", JSON.stringify(info));
  }
};
</script>
<style scoped>
.souyin {
  display: flex;
  align-items: center;
}
.souyin .aoute {
  margin-right: 5px;
}
.souyin .teoe {
  margin-right: 15px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.leibiao {
  width: 100%;
  overflow: hidden;
  margin: 30px 0;
}
.centerDialogtop {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 20px 0;
}
.DialogLfent {
  margin-right: 15px;
}
/* .DialogRinge {
} */
.Boss {
  /* width: 100%; */
  overflow: hidden;
  padding: 0 50px;
}
.Boss .centeraotu {
  text-align: center;
  font-size: 15px;
  margin-bottom: 20px;
}
.Boss .centeraotu .el-input {
  margin-top: 8px;
}
.Boss .centerImg {
  text-align: center;
  font-size: 15px;
}
.Boss .centerImg p {
  margin-bottom: 8px;
}
.el-dialog__body {
  border-bottom: 1px solid #eee;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.etosdw .el-dialog__body {
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
</style>
