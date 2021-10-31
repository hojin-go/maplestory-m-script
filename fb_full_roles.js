var changeRole = require("./role_change_helper");

var r = require("./role_list");

var roles = r.setRoles();

// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

const gonghui = require("./fuben/gonghui");
const meiri = require("./fuben/meiri");
const wuling = require("./fuben/wuling");
const boss = require("./fuben/boss");
const jinhua = require("./fuben/jinhua");
const mini = require("./fuben/mini");

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
    meiri();
    sleep(2000);
  }

  if (aRole.wuling) {
    wuling();
    sleep(2000);
  }

  if (aRole.boss != null) {
    boss(aRole.boss, 4);
    sleep(2000);
  }

  if (aRole.jinhua) {
    jinhua(4);
    sleep(2000);
  }

  if (aRole.mini) {
    if (aRole.attactQuick != null) {
      aRole.attactQuick();
    }
    mini(aRole.miniTimes);
    sleep(2000);
  }
}
