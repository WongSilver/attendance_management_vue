<template>
  <div>
    <div style="margin: 10px">
      <el-input style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入名称" v-model="rightName"/>
      <el-button class="m-2" type="primary" @click="this.loadData">搜索</el-button>
    </div>
    <div style="margin: 10px;text-align: left">
      <el-button type="primary" plain @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
      <el-popconfirm title="确定删除吗？" @confirm="handleDeleteBatch" class="ml-5">
        <el-button type="danger" plain slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData" border stripe :header-cell-style="headClass"
              :cell-style="cellClass" height="650px"
              @selection-change="handleSelectionChange"
              row-key="id"
              children>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="140"></el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="url" label="可操作地址"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="option" label="操作">
        <template slot-scope="scope">
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
    <el-dialog title="权限信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-width="100px" :inline="true" label-position="left">
        <el-form-item label="权限名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可访问地址">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限状态">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from "element-ui";

export default {
  name: "Right",
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      rightName: "",
      form: {},
      dialogFormVisible: false,
      isEditPassword: true,
      rawId: [],
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
    //添加权限
    save() {
      this.$axios.post("/right/add", this.form).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("操作成功")
          this.dialogFormVisible = false;
          this.isEditPassword = true
          this.loadData()
        }
      })
    },
    // 添加权限
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
      this.isEditPassword = true
    },
    // 删除用户
    handleDelete(index, row) {
      this.$axios.delete("/right/delete/" + row.id).then(res => {
        let data = res.data;
        if (data.code === 200) {
          ElementUI.Message.success("删除成功")
          this.loadData()
        }
      })
    },
    // 批量删除
    handleDeleteBatch() {
      this.$axios.post("/right/delete/batch/", this.rawId).then(res => {
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

    //加载数据
    loadData() {
      this.$axios.get("/right/list", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          rightName: this.rightName,
        }
      }).then(res => {
            let data = res.data.data;
            this.tableData = data.records;
            this.total = data.total;
          }
      )
    },
  }
};
</script>

<style>
</style>