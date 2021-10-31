var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = (times) => {
  fuben_helper.enter("./assets/main/迷你地城.png");
  // 54, 688, 563, 390 => x = 336, y = 1078

  var maxTimes = Math.min(times, 3);
  for (var round = 0; round < maxTimes; round++) {
    // 确认在选择怪物页面, 滚动怪物
    // round 通常取值为 0、1、2
    u.until_find_image("./assets/mini/入场按钮.png");
    sleep(1000);
    for (var i = 2 - round; i > 0; i--) {
      // 一次滚动两格怪物
      swipe(336, 1078, 336, 688, 500);
      sleep(500);
    }

    // 选择15分钟
    u.find_image("./assets/mini/15_minites.png", { click: true });
    sleep(300);

    // 入场
    u.find_image("./assets/mini/入场按钮.png", { click: true });
    sleep(2000);
    // 等待2s，确认是否已经入场
    if (u.find_image("./assets/mini/入场按钮.png")) {
      break;
    } else {
      // 确认进入
      u.until_find_image("./assets/mini/入场确认.png", { click: true });
      // 确认进入战斗状态
      u.until_find_image("./assets/mini/战斗中标识.png");
      sleep(2000);
      // 开启自动战斗
      u.clickR(787, 1412, 116, 116, 1000);
      // 领取2小时免费
      u.until_find_image("./assets/mini/自动战斗确认.png");

      // 确认开启自动战斗
      u.find_image("./assets/mini/自动战斗确认.png", { click: true });
      // 等待奖励，返回菜单
      u.until_find_image("./assets/mini/通关奖励返回菜单.png", {
        click: true,
      });
    }
  }
  u.until_find_image("./assets/meiri/关闭.png", { click: true });
};
