import React,{ Component } from 'react' ;

import LCPicker from './LCPicker' ;

export default class LCAreaPicker extends Component {
  static defaultProps = {
    hidden : false ,
  };

  constructor(props) {
    super(props) ;

    this.state = {
      hidden : this.props.hidden ,
    }

    this.provinceId = this.props.provinceId ,
    this.cityId = this.props.cityId

    if(!this.provinceId) this.provinceId = '1001' ;

    //可变的
    this.areaData = [
      {
        selected : this.provinceId ? this.provinceId : 1001 ,
        options : AreaData.provinces ,
      }
    ] ;

    let citySelector = {
      selected : '1001',
      options : AreaData.citys['1001'] ,
    }

    if(this.provinceId){
      let citySelected ;
      if(this.cityId) citySelected = this.cityId ;
      else{
        for(let k in AreaData.citys[this.provinceId]){
          citySelected = k ;
          break ;
        }
      }

      citySelector = {
        selected : citySelected ,
        options : AreaData.citys[this.provinceId] ,
      }
    }

    this.areaData.push(citySelector) ;
  }

  show(){
    this.refs.areaSelector.show() ;
  }

  hide(){
    this.refs.areaSelector.hide() ;
  }

  _onValueChange(dataIndex,val){
    dataIndex == 0 && (this.provinceId = val) ;
    dataIndex == 1 && (this.cityId = val) ;

    this.area = {} ;
    if(this.provinceId){
      this.area.id = this.provinceId ;
      this.area.name = AreaData.provinces[this.provinceId] ;
    }
    if(this.cityId){
      this.area.id = this.cityId ;
      if(this.area.id != this.provinceId && AreaData.citys[this.provinceId][this.area.id]) this.area.name += AreaData.citys[this.provinceId][this.area.id] ;
    }

    if(dataIndex == 1) return ;

    let data = this.refs.areaSelector.state.data ;
    data[1] = {
      selected : val,
      options : {}
    } ;
    data[1].options[val] = data[0].options[val] ;

    let selectedCity = null ;
    if(AreaData.citys[val]){
      for(let k in AreaData.citys[val]){
        selectedCity = k ;
        break ;
      }
      data[1] = {
        selected : selectedCity,
        options :  AreaData.citys[val] ,
      } ;
    }

    this.cityId = selectedCity ;
    !this.cityId && (this.cityId = this.provinceId) ;
    this.area.id = this.cityId ;
    if(this.area.id != this.provinceId && AreaData.citys[this.provinceId][this.area.id]) this.area.name += AreaData.citys[this.provinceId][this.area.id] ;

    this.refs.areaSelector.setState({data}) ;
  }

  _onSelected(){
    //succ 回调
    this.props.onSelected && this.props.onSelected(this.provinceId,this.cityId,this.area) ;
  }

  render(){
    return <LCPicker
      ref="areaSelector"
      hidden={this.state.hidden}
      data={this.areaData}
      onSelected={this._onSelected.bind(this)}
      onValueChange={this._onValueChange.bind(this)} /> ;
  }
}

const AreaData = {"provinces":{"1001":"\u5317\u4eac","1002":"\u4e0a\u6d77","1003":"\u5929\u6d25","1004":"\u91cd\u5e86","1005":"\u6cb3\u5317","1006":"\u5c71\u897f","1007":"\u5185\u8499\u53e4","1008":"\u8fbd\u5b81","1009":"\u5409\u6797","1010":"\u9ed1\u9f99\u6c5f","1011":"\u6c5f\u82cf","1012":"\u6d59\u6c5f","1013":"\u5b89\u5fbd","1014":"\u798f\u5efa","1015":"\u6c5f\u897f","1016":"\u5c71\u4e1c","1017":"\u6cb3\u5357","1018":"\u6e56\u5317","1019":"\u6e56\u5357","1020":"\u5e7f\u4e1c","1021":"\u5e7f\u897f","1022":"\u6d77\u5357","1023":"\u56db\u5ddd","1024":"\u8d35\u5dde","1025":"\u4e91\u5357","1026":"\u897f\u85cf","1027":"\u9655\u897f","1028":"\u7518\u8083","1029":"\u9752\u6d77","1030":"\u5b81\u590f","1031":"\u65b0\u7586","1032":"\u53f0\u6e7e","1033":"\u9999\u6e2f","1034":"\u6fb3\u95e8"},"citys":{"1001":{"1001":"\u5317\u4eac"},"1002":{"1002":"\u4e0a\u6d77"},"1003":{"1003":"\u5929\u6d25"},"1004":{"1004":"\u91cd\u5e86"},"1005":{"1135":"\u77f3\u5bb6\u5e84\u5e02","1136":"\u5510\u5c71\u5e02","1137":"\u79e6\u7687\u5c9b\u5e02","1138":"\u90af\u90f8\u5e02","1139":"\u90a2\u53f0\u5e02","1140":"\u4fdd\u5b9a\u5e02","1141":"\u5f20\u5bb6\u53e3\u5e02","1142":"\u627f\u5fb7\u5e02","1143":"\u6ca7\u5dde\u5e02","1144":"\u5eca\u574a\u5e02","1145":"\u8861\u6c34\u5e02"},"1006":{"1146":"\u592a\u539f\u5e02","1147":"\u5927\u540c\u5e02","1148":"\u9633\u6cc9\u5e02","1149":"\u957f\u6cbb\u5e02","1150":"\u664b\u57ce\u5e02","1151":"\u6714\u5dde\u5e02","1152":"\u664b\u4e2d\u5e02","1153":"\u8fd0\u57ce\u5e02","1154":"\u5ffb\u5dde\u5e02","1155":"\u4e34\u6c7e\u5e02","1156":"\u5415\u6881\u5e02"},"1007":{"1157":"\u547c\u548c\u6d69\u7279\u5e02","1158":"\u5305\u5934\u5e02","1159":"\u4e4c\u6d77\u5e02","1160":"\u8d64\u5cf0\u5e02","1161":"\u901a\u8fbd\u5e02","1162":"\u9102\u5c14\u591a\u65af\u5e02","1163":"\u547c\u4f26\u8d1d\u5c14\u5e02","1164":"\u5df4\u5f66\u6dd6\u5c14\u5e02","1165":"\u4e4c\u5170\u5bdf\u5e03\u5e02","1166":"\u5174\u5b89\u76df","1167":"\u9521\u6797\u90ed\u52d2\u76df","1168":"\u963f\u62c9\u5584\u76df"},"1008":{"1169":"\u6c88\u9633\u5e02","1170":"\u5927\u8fde\u5e02","1171":"\u978d\u5c71\u5e02","1172":"\u629a\u987a\u5e02","1173":"\u672c\u6eaa\u5e02","1174":"\u4e39\u4e1c\u5e02","1175":"\u9526\u5dde\u5e02","1176":"\u8425\u53e3\u5e02","1177":"\u961c\u65b0\u5e02","1178":"\u8fbd\u9633\u5e02","1179":"\u76d8\u9526\u5e02","1180":"\u94c1\u5cad\u5e02","1181":"\u671d\u9633\u5e02","1182":"\u846b\u82a6\u5c9b\u5e02"},"1009":{"1183":"\u957f\u6625\u5e02","1184":"\u5409\u6797\u5e02","1185":"\u56db\u5e73\u5e02","1186":"\u8fbd\u6e90\u5e02","1187":"\u901a\u5316\u5e02","1188":"\u767d\u5c71\u5e02","1189":"\u677e\u539f\u5e02","1190":"\u767d\u57ce\u5e02","1191":"\u5ef6\u8fb9"},"1010":{"1192":"\u54c8\u5c14\u6ee8\u5e02","1193":"\u9f50\u9f50\u54c8\u5c14\u5e02","1194":"\u9e21\u897f\u5e02","1195":"\u9e64\u5c97\u5e02","1196":"\u53cc\u9e2d\u5c71\u5e02","1197":"\u5927\u5e86\u5e02","1198":"\u4f0a\u6625\u5e02","1199":"\u4f73\u6728\u65af\u5e02","1200":"\u4e03\u53f0\u6cb3\u5e02","1201":"\u7261\u4e39\u6c5f\u5e02","1202":"\u9ed1\u6cb3\u5e02","1203":"\u7ee5\u5316\u5e02","1204":"\u5927\u5174\u5b89\u5cad"},"1011":{"1205":"\u5357\u4eac\u5e02","1206":"\u65e0\u9521\u5e02","1207":"\u5f90\u5dde\u5e02","1208":"\u5e38\u5dde\u5e02","1209":"\u82cf\u5dde\u5e02","1210":"\u5357\u901a\u5e02","1211":"\u8fde\u4e91\u6e2f\u5e02","1212":"\u6dee\u5b89\u5e02","1213":"\u76d0\u57ce\u5e02","1214":"\u626c\u5dde\u5e02","1215":"\u9547\u6c5f\u5e02","1216":"\u6cf0\u5dde\u5e02","1217":"\u5bbf\u8fc1\u5e02"},"1012":{"1218":"\u676d\u5dde\u5e02","1219":"\u5b81\u6ce2\u5e02","1220":"\u6e29\u5dde\u5e02","1221":"\u5609\u5174\u5e02","1222":"\u6e56\u5dde\u5e02","1223":"\u7ecd\u5174\u5e02","1224":"\u91d1\u534e\u5e02","1225":"\u8862\u5dde\u5e02","1226":"\u821f\u5c71\u5e02","1227":"\u53f0\u5dde\u5e02","1228":"\u4e3d\u6c34\u5e02"},"1013":{"1229":"\u5408\u80a5\u5e02","1230":"\u829c\u6e56\u5e02","1231":"\u868c\u57e0\u5e02","1232":"\u6dee\u5357\u5e02","1233":"\u9a6c\u978d\u5c71\u5e02","1234":"\u6dee\u5317\u5e02","1235":"\u94dc\u9675\u5e02","1236":"\u5b89\u5e86\u5e02","1237":"\u9ec4\u5c71\u5e02","1238":"\u6ec1\u5dde\u5e02","1239":"\u961c\u9633\u5e02","1240":"\u5bbf\u5dde\u5e02","1241":"\u5de2\u6e56\u5e02","1242":"\u516d\u5b89\u5e02","1243":"\u4eb3\u5dde\u5e02","1244":"\u6c60\u5dde\u5e02","1245":"\u5ba3\u57ce\u5e02"},"1014":{"1246":"\u798f\u5dde\u5e02","1247":"\u53a6\u95e8\u5e02","1248":"\u8386\u7530\u5e02","1249":"\u4e09\u660e\u5e02","1250":"\u6cc9\u5dde\u5e02","1251":"\u6f33\u5dde\u5e02","1252":"\u5357\u5e73\u5e02","1253":"\u9f99\u5ca9\u5e02","1254":"\u5b81\u5fb7\u5e02"},"1015":{"1255":"\u5357\u660c\u5e02","1256":"\u666f\u5fb7\u9547\u5e02","1257":"\u840d\u4e61\u5e02","1258":"\u4e5d\u6c5f\u5e02","1259":"\u65b0\u4f59\u5e02","1260":"\u9e70\u6f6d\u5e02","1261":"\u8d63\u5dde\u5e02","1262":"\u5409\u5b89\u5e02","1263":"\u5b9c\u6625\u5e02","1264":"\u629a\u5dde\u5e02","1265":"\u4e0a\u9976\u5e02"},"1016":{"1266":"\u6d4e\u5357\u5e02","1267":"\u9752\u5c9b\u5e02","1268":"\u6dc4\u535a\u5e02","1269":"\u67a3\u5e84\u5e02","1270":"\u4e1c\u8425\u5e02","1271":"\u70df\u53f0\u5e02","1272":"\u6f4d\u574a\u5e02","1273":"\u6d4e\u5b81\u5e02","1274":"\u6cf0\u5b89\u5e02","1275":"\u5a01\u6d77\u5e02","1276":"\u65e5\u7167\u5e02","1277":"\u83b1\u829c\u5e02","1278":"\u4e34\u6c82\u5e02","1279":"\u5fb7\u5dde\u5e02","1280":"\u804a\u57ce\u5e02","1281":"\u6ee8\u5dde\u5e02","1282":"\u83cf\u6cfd\u5e02"},"1017":{"1283":"\u90d1\u5dde\u5e02","1284":"\u5f00\u5c01\u5e02","1285":"\u6d1b\u9633\u5e02","1286":"\u5e73\u9876\u5c71\u5e02","1287":"\u5b89\u9633\u5e02","1288":"\u9e64\u58c1\u5e02","1289":"\u65b0\u4e61\u5e02","1290":"\u7126\u4f5c\u5e02","1291":"\u6fee\u9633\u5e02","1292":"\u8bb8\u660c\u5e02","1293":"\u6f2f\u6cb3\u5e02","1294":"\u4e09\u95e8\u5ce1\u5e02","1295":"\u5357\u9633\u5e02","1296":"\u5546\u4e18\u5e02","1297":"\u4fe1\u9633\u5e02","1298":"\u5468\u53e3\u5e02","1299":"\u9a7b\u9a6c\u5e97\u5e02"},"1018":{"1300":"\u6b66\u6c49\u5e02","1301":"\u9ec4\u77f3\u5e02","1302":"\u5341\u5830\u5e02","1303":"\u5b9c\u660c\u5e02","1304":"\u8944\u6a0a\u5e02","1305":"\u9102\u5dde\u5e02","1306":"\u8346\u95e8\u5e02","1307":"\u5b5d\u611f\u5e02","1308":"\u8346\u5dde\u5e02","1309":"\u9ec4\u5188\u5e02","1310":"\u54b8\u5b81\u5e02","1311":"\u968f\u5dde\u5e02","1312":"\u6069\u65bd","1313":"\u4ed9\u6843\u5e02","1314":"\u6f5c\u6c5f\u5e02","1315":"\u5929\u95e8\u5e02","1316":"\u795e\u519c\u67b6\u6797\u533a"},"1019":{"1317":"\u957f\u6c99\u5e02","1318":"\u682a\u6d32\u5e02","1319":"\u6e58\u6f6d\u5e02","1320":"\u8861\u9633\u5e02","1321":"\u90b5\u9633\u5e02","1322":"\u5cb3\u9633\u5e02","1323":"\u5e38\u5fb7\u5e02","1324":"\u5f20\u5bb6\u754c\u5e02","1325":"\u76ca\u9633\u5e02","1326":"\u90f4\u5dde\u5e02","1327":"\u6c38\u5dde\u5e02","1328":"\u6000\u5316\u5e02","1329":"\u5a04\u5e95\u5e02","1330":"\u6e58\u897f"},"1020":{"1331":"\u5e7f\u5dde\u5e02","1332":"\u97f6\u5173\u5e02","1333":"\u6df1\u5733\u5e02","1334":"\u73e0\u6d77\u5e02","1335":"\u6c55\u5934\u5e02","1336":"\u4f5b\u5c71\u5e02","1337":"\u6c5f\u95e8\u5e02","1338":"\u6e5b\u6c5f\u5e02","1339":"\u8302\u540d\u5e02","1340":"\u8087\u5e86\u5e02","1341":"\u60e0\u5dde\u5e02","1342":"\u6885\u5dde\u5e02","1343":"\u6c55\u5c3e\u5e02","1344":"\u6cb3\u6e90\u5e02","1345":"\u9633\u6c5f\u5e02","1346":"\u6e05\u8fdc\u5e02","1347":"\u4e1c\u839e\u5e02","1348":"\u4e2d\u5c71\u5e02","1349":"\u6f6e\u5dde\u5e02","1350":"\u63ed\u9633\u5e02","1351":"\u4e91\u6d6e\u5e02"},"1021":{"1352":"\u5357\u5b81\u5e02","1353":"\u67f3\u5dde\u5e02","1354":"\u6842\u6797\u5e02","1355":"\u68a7\u5dde\u5e02","1356":"\u5317\u6d77\u5e02","1357":"\u9632\u57ce\u6e2f\u5e02","1358":"\u94a6\u5dde\u5e02","1359":"\u8d35\u6e2f\u5e02","1360":"\u7389\u6797\u5e02","1361":"\u767e\u8272\u5e02","1362":"\u8d3a\u5dde\u5e02","1363":"\u6cb3\u6c60\u5e02","1364":"\u6765\u5bbe\u5e02","1365":"\u5d07\u5de6\u5e02"},"1022":{"1366":"\u6d77\u53e3\u5e02","1367":"\u4e09\u4e9a\u5e02","1368":"\u4e94\u6307\u5c71\u5e02","1369":"\u743c\u6d77\u5e02","1370":"\u510b\u5dde\u5e02","1371":"\u6587\u660c\u5e02","1372":"\u4e07\u5b81\u5e02","1373":"\u4e1c\u65b9\u5e02","1374":"\u5b9a\u5b89\u53bf","1375":"\u5c6f\u660c\u53bf","1376":"\u6f84\u8fc8\u53bf","1377":"\u4e34\u9ad8\u53bf","1378":"\u767d\u6c99","1379":"\u660c\u6c5f","1380":"\u4e50\u4e1c","1381":"\u9675\u6c34","1382":"\u4fdd\u4ead","1383":"\u743c\u4e2d"},"1023":{"1384":"\u6210\u90fd\u5e02","1385":"\u81ea\u8d21\u5e02","1386":"\u6500\u679d\u82b1\u5e02","1387":"\u6cf8\u5dde\u5e02","1388":"\u5fb7\u9633\u5e02","1389":"\u7ef5\u9633\u5e02","1390":"\u5e7f\u5143\u5e02","1391":"\u9042\u5b81\u5e02","1392":"\u5185\u6c5f\u5e02","1393":"\u4e50\u5c71\u5e02","1394":"\u5357\u5145\u5e02","1395":"\u7709\u5c71\u5e02","1396":"\u5b9c\u5bbe\u5e02","1397":"\u5e7f\u5b89\u5e02","1398":"\u8fbe\u5dde\u5e02","1399":"\u96c5\u5b89\u5e02","1400":"\u5df4\u4e2d\u5e02","1401":"\u8d44\u9633\u5e02","1402":"\u963f\u575d","1403":"\u7518\u5b5c","1404":"\u51c9\u5c71"},"1024":{"1405":"\u8d35\u9633\u5e02","1406":"\u516d\u76d8\u6c34\u5e02","1407":"\u9075\u4e49\u5e02","1408":"\u5b89\u987a\u5e02","1409":"\u94dc\u4ec1\u5730\u533a","1410":"\u9ed4\u897f\u5357","1411":"\u6bd5\u8282\u5730\u533a","1412":"\u9ed4\u4e1c\u5357","1413":"\u9ed4\u5357"},"1025":{"1414":"\u6606\u660e\u5e02","1415":"\u66f2\u9756\u5e02","1416":"\u7389\u6eaa\u5e02","1417":"\u4fdd\u5c71\u5e02","1418":"\u662d\u901a\u5e02","1419":"\u4e3d\u6c5f\u5e02","1420":"\u666e\u6d31\u5e02","1421":"\u4e34\u6ca7\u5e02","1422":"\u695a\u96c4","1423":"\u7ea2\u6cb3","1424":"\u6587\u5c71","1425":"\u897f\u53cc\u7248\u7eb3","1426":"\u5927\u7406","1427":"\u5fb7\u5b8f","1428":"\u6012\u6c5f","1429":"\u8fea\u5e86"},"1026":{"1430":"\u62c9\u8428\u5e02","1431":"\u660c\u90fd\u5730\u533a","1432":"\u5c71\u5357\u5730\u533a","1433":"\u65e5\u5580\u5219\u5730\u533a","1434":"\u90a3\u66f2\u5730\u533a","1435":"\u963f\u91cc\u5730\u533a","1436":"\u6797\u829d\u5730\u533a"},"1027":{"1437":"\u897f\u5b89\u5e02","1438":"\u94dc\u5ddd\u5e02","1439":"\u5b9d\u9e21\u5e02","1440":"\u54b8\u9633\u5e02","1441":"\u6e2d\u5357\u5e02","1442":"\u5ef6\u5b89\u5e02","1443":"\u6c49\u4e2d\u5e02","1444":"\u6986\u6797\u5e02","1445":"\u5b89\u5eb7\u5e02","1446":"\u5546\u6d1b\u5e02"},"1028":{"1447":"\u5170\u5dde\u5e02","1448":"\u5609\u5cea\u5173\u5e02","1449":"\u91d1\u660c\u5e02","1450":"\u767d\u94f6\u5e02","1451":"\u5929\u6c34\u5e02","1452":"\u6b66\u5a01\u5e02","1453":"\u5f20\u6396\u5e02","1454":"\u5e73\u51c9\u5e02","1455":"\u9152\u6cc9\u5e02","1456":"\u5e86\u9633\u5e02","1457":"\u5b9a\u897f\u5e02","1458":"\u9647\u5357\u5e02","1459":"\u4e34\u590f","1460":"\u7518\u5357"},"1029":{"1461":"\u897f\u5b81\u5e02","1462":"\u6d77\u4e1c\u5730\u533a","1463":"\u6d77\u5317","1464":"\u9ec4\u5357","1465":"\u6d77\u5357","1466":"\u679c\u6d1b","1467":"\u7389\u6811","1468":"\u6d77\u897f"},"1030":{"1469":"\u94f6\u5ddd\u5e02","1470":"\u77f3\u5634\u5c71\u5e02","1471":"\u5434\u5fe0\u5e02","1472":"\u56fa\u539f\u5e02","1473":"\u4e2d\u536b\u5e02"},"1031":{"1474":"\u4e4c\u9c81\u6728\u9f50\u5e02","1475":"\u514b\u62c9\u739b\u4f9d\u5e02","1476":"\u5410\u9c81\u756a\u5730\u533a","1477":"\u54c8\u5bc6\u5730\u533a","1478":"\u660c\u5409","1479":"\u535a\u5c14\u5854\u62c9","1480":"\u5df4\u97f3\u90ed\u695e","1481":"\u963f\u514b\u82cf\u5730\u533a","1482":"\u514b\u5b5c\u52d2\u82cf","1483":"\u5580\u4ec0\u5730\u533a","1484":"\u548c\u7530\u5730\u533a","1485":"\u4f0a\u7281","1486":"\u5854\u57ce\u5730\u533a","1487":"\u963f\u52d2\u6cf0\u5730\u533a","1488":"\u77f3\u6cb3\u5b50\u5e02","1489":"\u963f\u62c9\u5c14\u5e02","1490":"\u56fe\u6728\u8212\u514b\u5e02","1491":"\u4e94\u5bb6\u6e20\u5e02"},"1032":{"1032":"\u53f0\u6e7e"},"1033":{"1033":"\u9999\u6e2f"},"1034":{"1034":"\u6fb3\u95e8"}}};
