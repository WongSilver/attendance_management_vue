<template>
  <div>
    <div style="margin: 10px">
      <el-input style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="userName"/>
      <el-input style="width: 200px" suffix-icon="el-icon-message" placeholder="请输入邮箱" class="m-2"
                v-model="userMail"/>
      <el-input style="width: 200px" suffix-icon="el-icon-user" placeholder="请输入班级" class="m-2"
                v-model="userGroup"/>
      <el-button class="m-2" type="primary" @click="this.loadData">搜索</el-button>
    </div>
    <div style="margin: 10px;text-align: left">
      <el-button type="primary" plain @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-upload style="display: inline-block"
                 class="upload-demo ml-5 mr-5"
                 action="http://127.0.0.1:8088/user/import"
                 multiple
                 accept="xlsx"
                 :on-success="handleUpSuccess"
                 :on-error="handleUpError"
                 :show-file-list="false"
                 :limit="1">
        <el-button type="primary" plain>导入 <i class="el-icon-bottom"></i></el-button>
      </el-upload>
      <el-button type="primary" plain @click="exportExcel">导出 <i class="el-icon-top"></i></el-button>
      <el-popconfirm title="确定删除吗？" @confirm="handleDeleteBatch" class="ml-5">
        <el-button type="danger" plain slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="headClass"
              :cell-style="cellClass" height="650px"
              @selection-change="handleSelectionChange"
              row-key="id"
              default-expand-all>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="telephone" label="手机号"></el-table-column>
      <el-table-column prop="mail" label="邮箱"></el-table-column>
      <el-table-column prop="groupId" label="班级"></el-table-column>
      <el-table-column prop="status" label="是否注销"></el-table-column>
      <el-table-column prop="lastTime" label="上次登录时间"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="option" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="info" plain slot="reference" @click="handleMenu(scope.row)">角色设置 <i class="el-icon-menu"></i>
          </el-button>
          <el-button type="warning" plain @click="handleEdit(scope.$index, scope.row)" class="m-2">编辑 <i
              class="el-icon-edit"></i></el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.$index, scope.row)" class="m-2">
            <el-button type="danger" plain slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0;vertical-align:bottom;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <!--    添加或编辑 用户信息弹窗-->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :inline="true" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-show="isEditPassword">
          <el-input v-model="form.password" v-show="isEditPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.groupId">
            <el-option label="暂未分配班级" value="0"></el-option>
            <el-option label="测试1班" value="1"></el-option>
            <el-option label="测试2班" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <!--    设置 角色弹窗-->
    <el-dialog title=角色设置 :visible.sync="dialogMenuVisible" width="30%">
      <el-form :model="form" :inline="true">
        <el-form-item label="角色">
          <el-select v-model="role.name" @change="getRoleID">
            <el-option v-for="item in role" v-bind:key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  name: "User",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      userName: "",
      userMail: "",
      userGroup: "",
      form: {},
      dialogFormVisible: false,
      dialogMenuVisible: false,
      isEditPassword: true,
      rawId: [],
      role: [],
      userId: "",
      roleId: "",
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    //设置表头
    headClass() {
      return 'background:#E6F1FF;color:#368CFF;font-size:13px;text-align: center;'
    },
    //设置表样式
    cellClass() {
      return 'text-align: center;'
    },
    //改变显示条数时调用
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loadData()
    },
    // 改变页码时调用
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.loadData()
    },
    //添加用户
    save() {
      console.log(this.form)
      this.$axios.post("/user/add", this.form).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("操作成功")
          this.dialogFormVisible = false;
          this.isEditPassword = true
          this.loadData()
        }
      })
    },
    // 添加用户
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      this.isEditPassword = true
    },
    // 删除用户
    handleDelete(index, row) {
      this.$axios.delete("/user/delete/" + row.id).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("删除成功")
          this.loadData()
        }
      })
    },
    // 批量删除
    handleDeleteBatch() {
      this.$axios.post("/user/delete/batch/", this.rawId).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("删除成功")
          this.loadData()
        }
      })
    },
    // 编辑用户
    handleEdit(index, row) {
      this.isEditPassword = false
      this.dialogFormVisible = true
      this.form = row
    },
    //多选框事件
    handleSelectionChange(raw) {
      this.rawId = []
      for (let i = 0; i < raw.length; i++) {
        this.rawId.push(raw[i].id);
      }
      console.log(this.rawId)
    },
    //导出数据
    exportExcel() {
      window.open("http://127.0.0.1:8088/user/export")
    },
    //加载数据
    loadData() {
      this.$axios.get("/user/list", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          userName: this.userName,
          userMail: this.userMail,
          userGroup: this.userGroup
        }
      }).then(res => {
            let data = res.data.data;
            this.tableData = data.records;
            this.total = data.total;
          }
      )
    },
    handleUpSuccess() {
      ElementUI.Message.success("导入成功")
      this.loadData()
    },
    handleUpError() {
      ElementUI.Message.success("导入失败")
      this.loadData()
    },
    //加载角色菜单
    handleMenu(row) {
      this.dialogMenuVisible = true
      this.userId = row.id
      this.$axios.get("/role/all").then(res => {
        this.role = res.data.data;
      })
    },
    //把用户和角色绑定
    handleRole() {
      let role = {}
      role.userId = this.userId
      role.roleId = this.roleId
      this.$axios.post("/userRole/setRole", role).then(res => {
        if (res.data.code === 200) {
          ElementUI.Message.success(res.data.msg);
          this.dialogMenuVisible = false;
        }
      })
    },
    //获取角色ID
    getRoleID(id) {
      this.roleId = id
    }
  }
};
</script>

<style>
</style>