var u = require("./util");
var adx = require("./adx");

module.exports = function (role) {
  u.until_find_image("./assets/main/菜单入口.png", { click: true });
  u.until_find_image("./assets/main/切换角色.png", { click: true });
  console.log("will select role", role.roleImage);
  u.until_find_image(role.roleImage, { click: true });
  sleep(500);
  //   u.until_find_image("./assets/角色/确认切换.png", { click: true });
  if (!u.find_image("./assets/角色/确认切换.png", { click: true })) {
    toastLog("无法切换角色", role.name, "可能为当前角色，即将取消");
    u.find_image("./assets/角色/取消切换.png", { click: true });
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
    sleep(1000);
  } else {
    toastLog("已经切换到角色", role.name);
  }

  // 确认切换完成，并处于首页情况
  u.until_find_image("./assets/main/菜单入口.png", { click: false });
  toastLog("等待5秒钟，清除广告");
  sleep(5000);

  adx.exec();
  u.clear_bag();
  u.add_auto_fight_time();
};
