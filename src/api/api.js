/**
 * api接口
 */
const url = 'http://106.14.183.14/' //线上
// const url = 'http://192.168.0.159:8866/' //本地
const api = {
  Center: url + 'picture/getCenter', // 角色1.2
  potList: url + 'picture/getPrimaryTitle', // 一级目录接口
  addpotList: url + 'picture/addPrimaryTitle', // 一级目录增加接口
  updatepotList: url + 'picture/updatePrimaryTitle', // 一级目录修改接口
  deletetList: url + 'picture/deletePrimaryTitle', // 一级目录删除接口
  Second: url + 'picture/getSecondTitle', // 二级目录接口
  addSecond: url + 'picture/addSecondTitle', // 二级目录增加接口
  updateSecond: url + 'picture/updateSecondTitle', // 二级目录修改接口
  deletSecond: url + 'picture/deleteSecondTitle', // 二级目录删除接口

  imagesture: url + 'picture/imagesUpload', // 上传
  listPicture: url + 'picture/getPicture', // 获取列表接口
  filterPicture: url + 'picture/filterPicture', // 列表筛选搜索接口
  compPicture: url + 'picture/compilePicturePath', // 修改接口
  deletePicture: url + 'picture/deletePicturePath', // 删除接口
  PicturePicture: url + 'picture/getPictureDetail' // 删除接口

}
module.exports = api
