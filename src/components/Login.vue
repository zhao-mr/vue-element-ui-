<template>
  <div class="BosLog">
    <div class="Coard">
      <el-row>
        <el-card class="box-card">
          <h2 style="text-align: center;">欢 迎 登 录</h2>
          <br />
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号：" prop="account">
              <el-input
                v-model="ruleForm.account"
                autocomplete="off"
                clearable
                placeholder="请输入账号"
              >
              </el-input>
            </el-form-item>
            <br />
            <el-form-item label="密码：" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                show-password
                clearable
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" class="check" checked
                >记住密码</el-checkbox
              >
            </el-form-item>
          </el-form>

          <div class="Bottombut">
            <el-row>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登 陆</el-button
              >
            </el-row>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      formName: "formName",
      checked: true,
      ruleForm: {
        account: "admin",
        password: "123456"
      },
      rules: {
        account: [
          {
            validator: validateAccount,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.ruleForm.account != "admin" ||
            this.ruleForm.password != "123456"
          ) {
            //只是为了做登录效果，所以账号密码写的固定的。
            this.$message.error("账号密码不正确");
            return false;
          } else {
            this.$message({
              showClose: true,
              message: "登陆成功",
              type: "success"
            });
            const self = this;
            if (self.checked == true) {
              // console.log("记住");
              that.setCookie(this.ruleForm.account, this.ruleForm.password, 7); //保存到cookie
            } else {
              console.log("清空Cookie");
              //清空Cookie
              self.clearCookie();
            }
            this.$router.push({ path: "/Index" }); //登录成功跳转
          }
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },

    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  mounted() {
    this.getCookie();
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        return false;
      }
    };
  }
};
</script>

<style scoped>
.BosLog {
  position: fixed;
  top: 0px;
  left: 0px;

  right: 0px;

  bottom: 0px;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: lightskyblue;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.Coard {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.Coard h2 {
  text-align: center;
  margin: 20px 0;
}
.Coard .Inputzhi {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.Coard .Inputzhi label {
  width: 20%;
}
.Coard .JIzhu {
  margin: 20px 0;
}
.Coard .Bottombut {
  text-align: center;
}
</style>
