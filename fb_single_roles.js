var changeRole = require("./role_change_helper");

var r = require("./role_list");

var fbOptions = ["boss", "进化", "迷你", "金字塔"];
var result = dialogs.select("请选择挑战副本", fbOptions);

// 副本选择
var fbSelection = fbOptions[result];

var timesOptions = ["不限", "1", "2", "3"];
result = dialogs.select("请选择挑战次数", timesOptions);

// 副本选择
var timesSelection = result;

var roles = r.setRoles();

// 请求截图
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}

sleep(1000);

const boss = require("./fb_boss");
const jinhua = require("./fb_jinhua");
const mini = require("./fb_mini");
const jzt = require("./fb_jinzita");
const uu = require("./user_util");

for (let index = 0; index < roles.length; index++) {
  var aRole = roles[index];
  changeRole(aRole);

  // u.until_find_image("./assets/main/菜单入口.png", { click: true });

  sleep(2000);
  if (aRole.prepareAttactMode != null) {
    aRole.prepareAttactMode();
  }

  if (fbSelection == "boss") {
    if (aRole.attactBoss != null) {
      aRole.attactBoss();
    }
    boss(aRole.boss, timesSelection);
    sleep(2000);
  }

  if (fbSelection == "进化") {
    jinhua(timesSelection);
    sleep(2000);
  }

  if (fbSelection == "迷你") {
    if (aRole.attactQuick != null) {
      aRole.attactQuick();
    }

    var times = timesSelection;
    if (times == 0) {
      times = aRole.miniTimes;
    }
    mini(times);
    sleep(2000);
  }

  if (fbSelection == "金字塔") {
    jzt(timesSelection);
    sleep(2000);
  }

  uu.get_mission_bonus();
  uu.receive_msg();
}
