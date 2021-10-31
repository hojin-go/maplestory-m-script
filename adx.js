var u = require("./util");
var adx = {};

adx.exec = () => {
  var img = images.captureScreen();
  var option = { image: img, noLog: true };
  var clickOption = { image: img, click: true, noLog: true };
  if (u.find_image("./assets/ads/exp_up/经验翻倍活动标识.png", option)) {
    u.find_image("./assets/ads/exp_up/关闭.png", clickOption);
    sleep(500);
  }

  if (u.find_image("./assets/ads/0722/广告_0722.png", option)) {
    u.find_image("./assets/ads/0722/今天不可见.png", clickOption);
    sleep(500);
    u.find_image("./assets/ads/0722/关闭.png", clickOption);
    sleep(500);
  }

  if (u.find_image("./assets/ads/0729/广告_0729.png", option)) {
    u.find_image("./assets/ads/0729/今天不可见.png", clickOption);
    sleep(500);
    u.find_image("./assets/ads/0729/关闭.png", clickOption);
    sleep(500);
  }

  if (u.find_image("./assets/ads/0803/广告_0803.png", option)) {
    u.find_image("./assets/ads/0803/今天不可见.png", clickOption);
    sleep(500);
    u.find_image("./assets/ads/0803/关闭.png", clickOption);
    sleep(500);
  }

  if (u.find_image("./assets/ads/0805/广告_0805.png", option)) {
    u.find_image("./assets/ads/0805/今天不可见.png", clickOption);
    sleep(500);
    u.find_image("./assets/ads/0805/关闭.png", clickOption);
    sleep(500);
  }
};

module.exports = adx;
