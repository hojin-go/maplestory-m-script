var fuben_helper = require("./fb_helper");
var u = require("./util");

module.exports = (times) => {
  if (times == null || times == 0) {
    times = 4;
  }

  fuben_helper.enter("./assets/main/奈特金字塔.png");
  u.until_find_image("./assets/jinzita/加入队伍按钮.png", { click: true });

  var count = 0;
  while (count < times) {
    u.until_find_image("./assets/jinzita/再次挑战.png", { click: true });

    sleep(2000);
    if (u.find_image("./assets/jinzita/再次挑战.png")) {
      u.find_image("./assets/jinzita/退出金字塔.png", { click: true });
      sleep(2000);
      break;
    }

    count++;
  }
};
