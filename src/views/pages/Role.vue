<template>
  <div>
    <div style="margin: 10px">
      <el-input style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入角色名" v-model="roleName"/>
      <el-button class="m-2" type="primary" @click="this.loadData">搜索</el-button>
    </div>
    <div style="margin: 10px;text-align: left">
      <el-button type="primary" plain @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <!--      <el-upload style="display: inline-block"-->
      <!--                 class="upload-demo ml-5 mr-5"-->
      <!--                 action="http://127.0.0.1:8088/role/import"-->
      <!--                 multiple-->
      <!--                 accept="xlsx"-->
      <!--                 :on-success="handleUpSuccess"-->
      <!--                 :on-error="handleUpError"-->
      <!--                 :show-file-list="false"-->
      <!--                 :limit="1">-->
      <!--        <el-button type="primary" plain>导入 <i class="el-icon-bottom"></i></el-button>-->
      <!--      </el-upload>-->
      <!--      <el-button type="primary" plain @click="exportExcel">导出 <i class="el-icon-top"></i></el-button>-->
      <el-popconfirm title="确定删除吗？" @confirm="handleDeleteBatch" class="ml-5">
        <el-button type="danger" plain slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="headClass" :cell-style="cellClass" height="650px"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="140"></el-table-column>
      <el-table-column prop="name" label="角色名" width="120"></el-table-column>
      <el-table-column prop="type" label="角色类型"></el-table-column>
      <el-table-column prop="status" label="角色状态"></el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
          <el-button type="info" plain slot="reference" @click="handleMenu(scope.row)">权限设置 <i class="el-icon-menu"></i>
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

    <!--    添加或编辑 角色弹窗-->
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" :inline="true" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <!--    设置 权限弹窗-->
    <el-dialog title=权限设置 :visible.sync="dialogMenuVisible" width="30%">
      <el-tree
          :props="props"
          :data="rightData"
          show-checkbox
          getCheckedNodes="getCheckedNodes"
          node-key="id"
          ref="tree"
          @check-change="handleCheckChange">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRight()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  name: "Role",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      roleName: "",
      roleType: "",
      roleStatus: "",
      dialogFormVisible: false,
      form: {},
      isEditPassword: true,
      rawId: [],
      right: [],
      dialogMenuVisible: false,

      //  权限树
      rightData: [],
      props: {
        label: 'name',
      },
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
      this.$axios.post("/role/add", this.form).then(res => {
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
      this.$axios.delete("/role/delete/" + row.id).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("删除成功")
          this.loadData()
        }
      })
    },
    // 批量删除
    handleDeleteBatch() {
      this.$axios.post("/role/delete/batch/", this.rawId).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("删除成功")
          this.loadData()
        }
      })
    },
    // 编辑角色
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
      // console.log(this.rawId)
    },
    //加载数据
    loadData() {
      this.$axios.get("/role/list", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          roleName: this.roleName,
          roleType: this.roleType,
          roleStatus: this.roleStatus
        }
      }).then(res => {
            let data = res.data.data;
            this.tableData = data.records;
            this.total = data.total;
          }
      )
    },

    //  加载权限菜单
    handleMenu(row) {
      this.roleId = row.id;
      this.dialogMenuVisible = true
      // 查询已有权限
      this.$axios.get("/roleRight/checkedRight/" + row.id).then(res => {
        this.$refs.tree.setCheckedKeys(res.data.data)
      })
      this.$axios.get("/right/all").then(res => {
        this.rightData = res.data.data;
      })

    },
    // 添加权限事件
    handleRight() {
      let roleRight = {};
      roleRight.roleId = this.roleId;
      roleRight.rightIds = this.$refs.tree.getCheckedKeys();
      this.$axios.post("/roleRight/setRoleRight", roleRight).then(res => {
        if (res.data.code === 200) {
          ElementUI.Message.success(res.data.msg);
          this.dialogMenuVisible = false;
        }
      })
    },
    //权限树变化时触发
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
  }
};
</script>

<style>
</style>