var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = (times) => {
  fuben_helper.enter("./assets/main/进化地城.png");
  // 54, 688, 563, 390 => x = 336, y = 1078

  if (times == null || times == 0) {
    times = 3;
  }
  // 循环
  for (var i = 0; i < times; i++) {
    u.until_find_image("./assets/jinhua/入场按钮.png");
    // 选择 exp100
    u.find_image("./assets/jinhua/100_exp.png", { click: true });
    sleep(500);
    // 入场
    u.find_image("./assets/jinhua/入场按钮.png", { click: true });
    // 2s 确认是否已经入场
    sleep(2000);
    if (u.find_image("./assets/jinhua/入场按钮.png")) {
      break;
    }
    // 入场确认
    u.until_find_image("./assets/jinhua/入场确认.png", { click: true });
    // 等待通关奖励
    // 返回到菜单
    u.until_find_image("./assets/jinhua/奖励返回菜单.png", { click: true });
  }
  u.until_find_image("./assets/jinhua/关闭.png", { click: true });
};
