import Storage from 'react-native-storage' ;
import Toast from 'react-native-sk-toast' ;
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

  global.v2iapi('online/detail',{},{
    succ:(js) => {
      global.online = js.online ;
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

global.setOnline = (setOnline)=>{
  let online = global.getOnline() ;
  for(let k in setOnline) online[k] = setOnline[k] ;
  global.online = online ;
}

global.v2iapi = (apiPath,post,handle) => {
  if(!post) post = {} ;
  if(global.onlineKey) post.onlinekey = global.onlineKey ;

  if(!handle) handle = {} ;
  if(!handle.fail){
    handle.fail = (code,msg) => {
      return global.tip(msg) ;
    }
  }

  console.log('url:start :'+apiPath);
  console.log(post);

  let uploadFiles = {} ;
  let PostFields = {}
  Object.keys(post).map(k=>{
    if(typeof post[k] == 'object' && post[k].uri){
      uploadFiles[k] = post[k] ;
    }else{
      PostFields[k] = post[k] ;
    }
  }) ;

  let ops = {
     apiPath: apiPath,
     method: 'POST',
     headers: {
       'Accept': 'application/json',
     },
     fields: PostFields ,
     files: uploadFiles ,
   } ;


   let V2IPost = require('react-native').NativeModules.V2IPost ;
   V2IPost.post(ops).then(ret=>{
      let json = JSON.parse(ret);

      console.log('url:'+apiPath);
      console.log(json);

      if(!json) json = {} ;
      if(handle.ever) handle.ever(json) ;
      if(!json.code || json.code != '200'){
        return handle.fail(json.code,json.msg ? json.msg : '网络错误，请重试！') ;
      }
      if(!json.data) json.data = {} ;
      if(handle.succ) handle.succ(json.data) ;
    }).catch(error=>{
      console.log(error);
      if(handle.ever) handle.ever() ;
      return handle.fail('503','网络错误!') ;
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
  Toast.center(msg) ;
  return ;
}


global.getEmotionKs = ()=>{
  return [{"k":"\u5fae\u7b11","v":"5c\/huanglianwx_org"},{"k":"\u563b\u563b","v":"0b\/tootha_org"},{"k":"\u54c8\u54c8","v":"6a\/laugh"},{"k":"\u53ef\u7231","v":"14\/tza_org"},{"k":"\u53ef\u601c","v":"af\/kl_org"},{"k":"\u6316\u9f3b","v":"0b\/wabi_org"},{"k":"\u5403\u60ca","v":"f4\/cj_org"},{"k":"\u5bb3\u7f9e","v":"6e\/shamea_org"},{"k":"\u6324\u773c","v":"c3\/zy_org"},{"k":"\u95ed\u5634","v":"29\/bz_org"},{"k":"\u9119\u89c6","v":"71\/bs2_org"},{"k":"\u7231\u4f60","v":"6d\/lovea_org"},{"k":"\u6cea","v":"9d\/sada_org"},{"k":"\u5077\u7b11","v":"19\/heia_org"},{"k":"\u4eb2\u4eb2","v":"8f\/qq_org"},{"k":"\u751f\u75c5","v":"b6\/sb_org"},{"k":"\u592a\u5f00\u5fc3","v":"58\/mb_org"},{"k":"\u767d\u773c","v":"d9\/landeln_org"},{"k":"\u53f3\u54fc\u54fc","v":"98\/yhh_org"},{"k":"\u5de6\u54fc\u54fc","v":"6d\/zhh_org"},{"k":"\u5618","v":"a6\/x_org"},{"k":"\u8870","v":"af\/cry"},{"k":"\u59d4\u5c48","v":"73\/wq_org"},{"k":"\u5410","v":"9e\/t_org"},{"k":"\u54c8\u6b20","v":"cc\/haqianv2_org"},{"k":"\u62b1\u62b1","v":"27\/bba_org"},{"k":"\u6012","v":"7c\/angrya_org"},{"k":"\u7591\u95ee","v":"5c\/yw_org"},{"k":"\u998b\u5634","v":"a5\/cza_org"},{"k":"\u62dc\u62dc","v":"70\/88_org"},{"k":"\u601d\u8003","v":"e9\/sk_org"},{"k":"\u6c57","v":"24\/sweata_org"},{"k":"\u56f0","v":"40\/kunv2_org"},{"k":"\u7761","v":"96\/huangliansj_org"},{"k":"\u94b1","v":"90\/money_org"},{"k":"\u5931\u671b","v":"0c\/sw_org"},{"k":"\u9177","v":"40\/cool_org"},{"k":"\u8272","v":"20\/huanglianse_org"},{"k":"\u54fc","v":"49\/hatea_org"},{"k":"\u9f13\u638c","v":"36\/gza_org"},{"k":"\u6655","v":"d9\/dizzya_org"},{"k":"\u60b2\u4f24","v":"1a\/bs_org"},{"k":"\u6293\u72c2","v":"62\/crazya_org"},{"k":"\u9ed1\u7ebf","v":"91\/h_org"},{"k":"\u9634\u9669","v":"6d\/yx_org"},{"k":"\u6012\u9a82","v":"60\/numav2_org"},{"k":"\u4e92\u7c89","v":"89\/hufen_org"},{"k":"\u5fc3","v":"40\/hearta_org"},{"k":"\u4f24\u5fc3","v":"ea\/unheart"},{"k":"\u732a\u5934","v":"58\/pig"},{"k":"\u718a\u732b","v":"6e\/panda_org"},{"k":"\u5154\u5b50","v":"81\/rabbit_org"},{"k":"ok","v":"d6\/ok_org"},{"k":"\u8036","v":"d9\/ye_org"},{"k":"good","v":"d8\/good_org"},{"k":"NO","v":"ae\/buyao_org"},{"k":"\u8d5e","v":"d0\/z2_org"},{"k":"\u6765","v":"40\/come_org"},{"k":"\u5f31","v":"d8\/sad_org"},{"k":"\u8349\u6ce5\u9a6c","v":"7a\/shenshou_org"},{"k":"\u795e\u9a6c","v":"60\/horse2_org"},{"k":"\u56e7","v":"15\/j_org"},{"k":"\u6d6e\u4e91","v":"bc\/fuyun_org"},{"k":"\u7ed9\u529b","v":"1e\/geiliv2_org"},{"k":"\u56f4\u89c2","v":"f2\/wg_org"},{"k":"\u5a01\u6b66","v":"70\/vw_org"},{"k":"\u5965\u7279\u66fc","v":"bc\/otm_org"},{"k":"\u793c\u7269","v":"c4\/liwu_org"},{"k":"\u949f","v":"d3\/clock_org"},{"k":"\u8bdd\u7b52","v":"9f\/huatongv2_org"},{"k":"\u8721\u70db","v":"d9\/lazhuv2_org"},{"k":"\u86cb\u7cd5","v":"3a\/cakev2_thumb"},{"k":"\u53d1\u7ea2\u5305","v":"ca\/fahongbao_org"},{"k":"\u53bb\u65c5\u884c","v":"7e\/qlx_org"},{"k":"\u6b6a\u679c\u4ec1\u590f\u514b\u7acb","v":"9c\/bbqnxiakeli_org"},{"k":"\u6700\u53f3","v":"c8\/lxhzuiyou_org"},{"k":"\u6cea\u6d41\u6ee1\u9762","v":"64\/lxhtongku_org"},{"k":"\u6c5f\u5357style","v":"67\/gangnamstyle_org"},{"k":"\u5077\u4e50","v":"fa\/lxhtouxiao_org"},{"k":"doge","v":"b6\/doge_org"},{"k":"\u55b5\u55b5","v":"4a\/mm_org"},{"k":"\u7b11cry","v":"34\/xiaoku_org"},{"k":"xkl\u8f6c\u5708","v":"f4\/xklzhuanquan_org"},{"k":"\u52a0\u6cb9\u554a","v":"03\/lxhjiayou_org"},{"k":"\u897f\u74dc","v":"6b\/watermelon"},{"k":"\u8db3\u7403","v":"c0\/football"},{"k":"\u6bcd\u4eb2\u8282","v":"36\/carnation_org"},{"k":"\u80a5\u7682","v":"e5\/soap_org"},{"k":"\u6709\u94b1","v":"e6\/youqian_org"},{"k":"\u5730\u7403\u4e00\u5c0f\u65f6","v":"dc\/earth1r_org"},{"k":"\u56fd\u65d7","v":"dc\/flag_org"},{"k":"\u8bb8\u613f","v":"87\/lxhxuyuan_org"},{"k":"\u98ce\u6247","v":"92\/fan"},{"k":"\u96ea","v":"00\/snow_org"},{"k":"\u8ba9\u7ea2\u5305\u98de","v":"0b\/hongbaofei2014_org"},{"k":"ali\u505a\u9b3c\u8138","v":"20\/alizuoguiliannew_org"},{"k":"ali\u54c7","v":"de\/aliwanew_org"},{"k":"\u9177\u5e93\u718a\u987d\u76ae","v":"46\/kxwanpi_org"},{"k":"bm\u53ef\u7231","v":"95\/bmkeai_org"},{"k":"BOBO\u7231\u4f60","v":"74\/boaini_org"},{"k":"\u8f6c\u53d1","v":"02\/lxhzhuanfa_org"},{"k":"\u5f97\u610f\u5730\u7b11","v":"d4\/lxhdeyidixiao_org"},{"k":"ppb\u9f13\u638c","v":"7e\/ppbguzhang_org"},{"k":"din\u63a8\u649e","v":"dd\/dintuizhuang_org"},{"k":"moc\u8f6c\u53d1","v":"cb\/moczhuanfa_org"},{"k":"lt\u5207\u514b\u95f9","v":"73\/ltqiekenao_org"},{"k":"\u7b11\u54c8\u54c8","v":"32\/lxhwahaha_org"}] ;

}

global.getEmotionContents = (content) => {
  let es = [] ;
  let emtioncs = {} ;
  global.getEmotionKs().map(it=>emtioncs[it.k]=it.v) ;

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
