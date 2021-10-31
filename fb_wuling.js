var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = () => {
  fuben_helper.enter("./assets/main/武陵道场.png");
  // 54, 688, 563, 390 => x = 336, y = 1078

  u.find_image("./assets/wuling/领取武陵币.png", { click: true });
  // 在入场画面
  u.until_find_image("./assets/wuling/入场.png");
  // 判断是否已经通关
  if (
    u.find_image("./assets/wuling/标识_已通关.png", {
      region: {
        x: 286,
        y: 1291,
        w: 611,
        h: 124,
      },
    })
  ) {
    // 已经通关，离开道场
    u.until_find_image("./assets/meiri/关闭.png", { click: true });
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
  } else {
    // 未通关，准备入场
    u.find_image("./assets/wuling/按钮_准备入场.png", { click: true });
    sleep(500);
    u.until_find_image("./assets/wuling/按钮_门票_max.png", { click: true });
    sleep(500);
    u.find_image("./assets/wuling/按钮_入场.png", { click: true });
    sleep(500);
    // 通/关奖0{?[]|励，离开道场
    u.until_find_image("./assets/wuling/离开.png", { click: true });
  }
};
