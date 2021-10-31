var fuben_helper = require("./fb_helper");
var u = require("./util");

var options = [
  // 粉色
  { x: 43, y: 291, w: 461, h: 182 },
  // 蓝色
  { x: 541, y: 293, w: 464, h: 182 },
  // 绿色
  { x: 1051, y: 293, w: 461, h: 182 },
  // 黄色
  { x: 1544, y: 291, w: 461, h: 182 },
  // 紫色
  { x: 2048, y: 291, w: 461, h: 182 },
];

module.exports = (preferedIndex) => {
  toastLog("每日任务：" + preferedIndex);
  fuben_helper.enter("./assets/main/宝石任务.png");

  // 判断已经进入每日任务页面
  u.until_find_image("./assets/meiri/入场按钮.png", { click: false });
  sleep(500);

  // 选择怪物
  var beijingDate = new Date().getTime();
  var koreaDate = new Date(beijingDate + 1 * 60 * 60 * 1000);
  var dayInWeek = koreaDate.getDay();
  if (dayInWeek == 0 || dayInWeek == 6) {
    // 当前是周六或周日
    if (preferedIndex != null) {
      u.clickWithRect(options[preferedIndex], 500);
    }
  }

  u.find_image("./assets/meiri/入场按钮.png", { click: true });
  u.until_find_image("./assets/meiri/确认入场.png");

  var img = images.captureScreen();
  u.find_image("./assets/meiri/增加次数.png", {
    click: true,
    times: 4,
    image: img,
  });
  sleep(200);
  u.find_image("./assets/meiri/确认入场.png", { click: true, image: img });
  sleep(3000);

  if (u.find_image("./assets/meiri/确认入场.png")) {
    // 没有门票时，点击确认入场会无法进入
    // 再次检测一下，是否仍停留在 确认入场 画面
    u.find_image("./assets/meiri/取消入场.png", { click: true });
    sleep(500);

    u.until_find_image("./assets/meiri/关闭.png", { click: true });
    u.until_find_image("./assets/main/关闭菜单.png", { click: true });
    sleep(200);
  } else {
    u.until_find_image("./assets/meiri/离开按钮.png", { click: true });
    sleep(500);
  }
};
