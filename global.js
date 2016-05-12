import Storage from 'react-native-storage' ;
import Toast from 'react-native-root-toast' ;
import LoginPage from './account/LoginPage' ;
import DeviceInfo from 'react-native-device-info' ;
import { Navigation } from 'react-native-navigation';


global.getUploadURL = (path)=>{
  if(path.indexOf('http') == 0) return path ;
  return 'http://img.lmjx.net/iupload/' + path ;
}

global.storage = new Storage({
  size: 3000,
  defaultExpires: 1000 * 3600 * 24,
}) ;

global.getOnline = (callback)=>{
  if(global.online) return global.online ;

  global.v2iapi('online',{},{
    succ:(js) => {
      global.online = js ;
      if(callback) callback() ;
    },
    fail:() => {
      global.online = {} ;
      if(callback) callback() ;
    },
    ever:()=>{
    }
  }) ;
  return {} ;
} ;


global.v2iapi = (urlPath,post,handle) => {
  var url = ['http://v2i.api.lmjx.net',urlPath] ;
  url = url.join('/') ;

  if(!post) post = {} ;
  post.appid = '220002' ;
  post.time = Date.parse(new Date())/1000 ;

  post.uuid = DeviceInfo.getUniqueID() ;
  post.ua = DeviceInfo.getUserAgent() ;

  if(global.onlineKey) post.onlinekey = global.onlineKey ;

  if(!handle) handle = {} ;
  if(!handle.fail){
    handle.fail = (code,msg) => {
      return global.tip(msg) ;
    }
  }

  console.log(url);

  var fn = ()=>{
    var postData = new FormData();
    Object.keys(post).map(k=>{
      postData.append(k,post[k]) ;
    }) ;

    console.log(post);

    fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        },
        body: postData,
      })
      .then(response=>response.json())
      .then(json=>{
        console.log('url:'+url);
        console.log(json);
        if(!json) json = {} ;
        if(handle.ever) handle.ever(json) ;
        if(!json.code || json.code != '200'){
          return handle.fail(json.code,json.msg ? json.msg : '网络错误，请重试！') ;
        }
        if(!json.data) json.data = {} ;
        if(handle.succ) handle.succ(json.data) ;
      })
      .catch(error=>{
        console.log(error);
        if(handle.ever) handle.ever() ;
        return handle.fail('503','网络错误!') ;
      }) ;
  }

  var SignCreate = require('react-native').NativeModules.SignCreate;
  SignCreate.getSign(post,(error,sign)=>{
    if (error) {
      console.log("Got error when trying to get post sign from Native side");
      return ;
    }
    post.sign = sign ;
    fn() ;
  }) ;

} ;

global.toLogin = (props)=>{
  Navigation.showModal({
    screen: 'account.LoginPage',
    title: '登录到机友会',
    passProps: props,
    navigatorStyle: {
      tabBarHidden: true,
      navBarBackgroundColor: '#f9f9f9',
      navBarBackgroundColor: '#f9f9f9',
      navBarButtonColor: '#555',
    },
    animationType: 'slide-up'
  });
} ;

global.tip = (msg,handle) => {
  if(global.tip.xing) Toast.hide(global.tip.obj) ;
  if(!handle) handle = {} ;

  global.tip.xing = true ;
  global.tip.obj = Toast.show(msg,
    {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      onHidden:() => {
        if(handle.hidden) handle.hidden() ;
        global.tip.xing=false;
       }
    }
  ) ;

  return global.tip.obj;
}


global.getEmotionContents = (content) => {
  let es = [] ;
  let emtioncs = {"\u5fae\u7b11":"5c\/huanglianwx_org","\u563b\u563b":"0b\/tootha_org","\u54c8\u54c8":"6a\/laugh","\u53ef\u7231":"14\/tza_org","\u53ef\u601c":"af\/kl_org","\u6316\u9f3b":"0b\/wabi_org","\u5403\u60ca":"f4\/cj_org","\u5bb3\u7f9e":"6e\/shamea_org","\u6324\u773c":"c3\/zy_org","\u95ed\u5634":"29\/bz_org","\u9119\u89c6":"71\/bs2_org","\u7231\u4f60":"6d\/lovea_org","\u6cea":"9d\/sada_org","\u5077\u7b11":"19\/heia_org","\u4eb2\u4eb2":"8f\/qq_org","\u751f\u75c5":"b6\/sb_org","\u592a\u5f00\u5fc3":"58\/mb_org","\u767d\u773c":"d9\/landeln_org","\u53f3\u54fc\u54fc":"98\/yhh_org","\u5de6\u54fc\u54fc":"6d\/zhh_org","\u5618":"a6\/x_org","\u8870":"af\/cry","\u59d4\u5c48":"73\/wq_org","\u5410":"9e\/t_org","\u54c8\u6b20":"cc\/haqianv2_org","\u62b1\u62b1":"27\/bba_org","\u6012":"7c\/angrya_org","\u7591\u95ee":"5c\/yw_org","\u998b\u5634":"a5\/cza_org","\u62dc\u62dc":"70\/88_org","\u601d\u8003":"e9\/sk_org","\u6c57":"24\/sweata_org","\u56f0":"40\/kunv2_org","\u7761":"96\/huangliansj_org","\u94b1":"90\/money_org","\u5931\u671b":"0c\/sw_org","\u9177":"40\/cool_org","\u8272":"20\/huanglianse_org","\u54fc":"49\/hatea_org","\u9f13\u638c":"36\/gza_org","\u6655":"d9\/dizzya_org","\u60b2\u4f24":"1a\/bs_org","\u6293\u72c2":"62\/crazya_org","\u9ed1\u7ebf":"91\/h_org","\u9634\u9669":"6d\/yx_org","\u6012\u9a82":"60\/numav2_org","\u4e92\u7c89":"89\/hufen_org","\u5fc3":"40\/hearta_org","\u4f24\u5fc3":"ea\/unheart","\u732a\u5934":"58\/pig","\u718a\u732b":"6e\/panda_org","\u5154\u5b50":"81\/rabbit_org","ok":"d6\/ok_org","\u8036":"d9\/ye_org","good":"d8\/good_org","NO":"ae\/buyao_org","\u8d5e":"d0\/z2_org","\u6765":"40\/come_org","\u5f31":"d8\/sad_org","\u8349\u6ce5\u9a6c":"7a\/shenshou_org","\u795e\u9a6c":"60\/horse2_org","\u56e7":"15\/j_org","\u6d6e\u4e91":"bc\/fuyun_org","\u7ed9\u529b":"1e\/geiliv2_org","\u56f4\u89c2":"f2\/wg_org","\u5a01\u6b66":"70\/vw_org","\u5965\u7279\u66fc":"bc\/otm_org","\u793c\u7269":"c4\/liwu_org","\u949f":"d3\/clock_org","\u8bdd\u7b52":"9f\/huatongv2_org","\u8721\u70db":"d9\/lazhuv2_org","\u86cb\u7cd5":"3a\/cakev2_thumb","\u53d1\u7ea2\u5305":"ca\/fahongbao_org","\u53bb\u65c5\u884c":"7e\/qlx_org","\u6b6a\u679c\u4ec1\u590f\u514b\u7acb":"9c\/bbqnxiakeli_org","\u6700\u53f3":"c8\/lxhzuiyou_org","\u6cea\u6d41\u6ee1\u9762":"64\/lxhtongku_org","\u6c5f\u5357style":"67\/gangnamstyle_org","\u5077\u4e50":"fa\/lxhtouxiao_org","doge":"b6\/doge_org","\u55b5\u55b5":"4a\/mm_org","\u7b11cry":"34\/xiaoku_org","xkl\u8f6c\u5708":"f4\/xklzhuanquan_org","\u52a0\u6cb9\u554a":"03\/lxhjiayou_org","\u897f\u74dc":"6b\/watermelon","\u8db3\u7403":"c0\/football","\u6bcd\u4eb2\u8282":"36\/carnation_org","\u80a5\u7682":"e5\/soap_org","\u6709\u94b1":"e6\/youqian_org","\u5730\u7403\u4e00\u5c0f\u65f6":"dc\/earth1r_org","\u56fd\u65d7":"dc\/flag_org","\u8bb8\u613f":"87\/lxhxuyuan_org","\u98ce\u6247":"92\/fan","\u96ea":"00\/snow_org","\u8ba9\u7ea2\u5305\u98de":"0b\/hongbaofei2014_org","ali\u505a\u9b3c\u8138":"20\/alizuoguiliannew_org","ali\u54c7":"de\/aliwanew_org","\u9177\u5e93\u718a\u987d\u76ae":"46\/kxwanpi_org","bm\u53ef\u7231":"95\/bmkeai_org","BOBO\u7231\u4f60":"74\/boaini_org","\u8f6c\u53d1":"02\/lxhzhuanfa_org","\u5f97\u610f\u5730\u7b11":"d4\/lxhdeyidixiao_org","ppb\u9f13\u638c":"7e\/ppbguzhang_org","din\u63a8\u649e":"dd\/dintuizhuang_org","moc\u8f6c\u53d1":"cb\/moczhuanfa_org","lt\u5207\u514b\u95f9":"73\/ltqiekenao_org","\u7b11\u54c8\u54c8":"32\/lxhwahaha_org"} ;

  let cs = content.split(/[\[\]]/) ;
  for(var i=0;i<cs.length;i++){
    var acs = cs[i] ;
    if(acs === '') continue ;
    if(acs.length > 10 || !emtioncs[acs]){
        es.push({component:'Text',content:acs}) ;
        continue ;
    }
    es.push({
      component:'Image',
      content:'http://img.lmjx.net/i/jiyouhui/emotion/em/'+ emtioncs[acs] +'.gif',
    }) ;
  }

  return es ;
}

global.getUserLvIcon = (level)=>{
  if(!level || !level.id) return null ;

  const lvIcons = {
    'lv1' : require('./images/icon_lvn1.png') ,
    'lv2' : require('./images/icon_lvn2.png') ,
    'lv3' : require('./images/icon_lvn3.png') ,
    'lv4' : require('./images/icon_lvn4.png') ,
    'lv5' : require('./images/icon_lvn5.png') ,
    'lv6' : require('./images/icon_lvn6.png') ,
    'lv7' : require('./images/icon_lvn7.png') ,
    'lv8' : require('./images/icon_lvn8.png') ,
    'lv9' : require('./images/icon_lvn9.png') ,
  } ;

  return lvIcons['lv'+level.id] ? lvIcons['lv'+level.id] : null ;
}


global.getUserTimelines = (uid)=>{
  if(!global.UsersTimlineList) return false ;
  if(!global.UsersTimlineList[uid]) return [] ;

  var timelines = [] ;
  for(var k in global.UsersTimlineList[uid]) timelines.push(global.UsersTimlineList[uid][k]) ;

  timelines.sort((a,b)=>b.id - a.id) ;
  return timelines ;
}
