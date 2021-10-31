var changeRole = require("./role_change_helper");

var r = require("./role_list");
var gonghui = require("./fb_gonghui");
var meiri = require("./fb_meiri");
var wuling = require("./fb_wuling");
var u = require("./util");

var roles = r.setRoles();

// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

for (let index = 0; index < roles.length; index++) {
  var aRole = roles[index];
  changeRole(aRole);

  // u.until_find_image("./assets/main/菜单入口.png", { click: true });

  sleep(2000);
  if (aRole.prepareAttactMode != null) {
    aRole.prepareAttactMode();
  }

  if (aRole.attactBoss != null) {
    aRole.attactBoss();
  }

  if (aRole.gild) {
    gonghui();
    sleep(2000);
  }

  if (aRole.meiri) {
    meiri(aRole.preferedMeiriIndex);
    sleep(2000);
  }

  if (aRole.wuling) {
    wuling();
    sleep(2000);
  }

//   u.get_mission_bonus();
}
