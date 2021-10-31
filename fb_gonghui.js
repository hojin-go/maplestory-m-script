var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = () => {
  fuben_helper.enter("./assets/main/工会.png");
  // 54, 688, 563, 390 => x = 336, y = 1078
  sleep(4000);

  u.find_image("./assets/工会/工会签到.png", { click: true });
  // 在入场画面
  u.find_image("./assets/工会/工会地城入口.png", { click: true });
  // 判断是否已经通关

  // 是否战斗过
  var hasFight = false;
  while (1) {
    if (
      !u.until_find_image("./assets/工会/工会地城进场.png", {
        click: true,
        timeout: 3000,
      })
    ) {
      toastLog("无法再次挑战工会地城");
      // 已经通关，离开道场
      u.until_find_image("./assets/工会/关闭按钮.png", { click: true });
      if (!hasFight) {
        u.until_find_image("./assets/main/关闭菜单.png", { click: true });
      }
      break;
    } else {
      hasFight = true;
      // 未通关，准备入场
      u.until_find_image("./assets/工会/经验返回按钮.png", {
        click: true,
        sleep: 2000,
      });
    }
  }
};
