var u = require("./util");

var fuben_helper = {};

fuben_helper.enter = (imageName) => {
  var clickOptions = { delay: 1000, click: true };

  // 进入工会页面逻辑
  u.until_find_image("./assets/main/菜单入口.png", clickOptions);
  sleep(300);
  u.until_find_image("./assets/main/快速地城.png", clickOptions);
  sleep(300);
  u.until_find_image(imageName, clickOptions);
  sleep(3000);
};

module.exports = fuben_helper;
