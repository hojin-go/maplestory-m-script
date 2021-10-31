var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = (bossImageName, times) => {
  if (times == 0 || times == null) {
    times = 4;
  }
  // 进入boss 画面
  fuben_helper.enter("./assets/main/精英地城.png");
  // 循环 times 次
  for (var i = 0; i < times; i++) {
    // 选择怪物
    u.until_find_image(bossImageName, { click: true, delay: 2000 });
    sleep(300);
    // 选择 hard
    u.find_image("./assets/boss/按钮/难度_难.png", { click: true });
    sleep(300);
    //创建房间
    u.find_image("./assets/boss/按钮/创建房间.png", { click: true });
    // 等待2s，再次判断是否已经进入
    sleep(2000);
    if (u.find_image("./assets/boss/按钮/创建房间.png")) {
      break;
    } else {
      // 确认入场
      u.until_find_image("./assets/boss/按钮/开始进入.png", { click: true });
      sleep(300);
      // 通关奖励
      // 选择返回到菜单
      u.until_find_image("./assets/boss/按钮/返回到菜单按钮.png", {
        click: true,
      });
      sleep(300);
    }
  }
  // 退出
  u.until_find_image("./assets/meiri/关闭.png", { click: true });
};
