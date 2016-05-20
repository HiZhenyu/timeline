import LCCommentList from './../module/comment/LCCommentList' ;
import LCTimelineDetail from './../module/timeline/LCTimelineDetail' ;
import LCTitle from './../module/pub/LCTitle' ;
import LCPage from './../LCPage' ;

import LCReplyToolBar from './../module/post/LCReplyToolBar' ;
import LCShare from './../module/pub/LCShare' ;
import LCSucc from './../module/pub/LCSucc' ;

export default class TimelinePage extends LCPage {

  static navigatorButtons= {
    rightButtons: [
      {
        icon: require('./../images/icon_menu_more.png'),
        id: 'id.timeline.share',
      }
    ]
  } ;

  constructor(props) {
    super(props) ;

    if(!props.timeline || !props.timeline.id) return ;

    let timeline = props.timeline ;
    if(!timeline.comment) timeline.comment = {sum:0} ;
    if(!timeline.dig) timeline.dig = {sum:0,did:false} ;
    if(!timeline.comments) timeline.comments = {sum:0,list:[]} ;
    if(!timeline.digs) timeline.digs = {sum:0,list:[]} ;
    if(!timeline.images) timeline.images = {sum:0,list:[]} ;

    this.mainView = LCCommentList ;
    this.mainViewProps = {
      timelineId : timeline.id ,
      loadMore : true ,
      list : this.props.comments ,
      onDidMount : this._onMainViewDidMount.bind(this),
      onItemPressReplyTo : this._onItemPressReplyTo.bind(this),
      ref : 'mainView',
    } ;

    this.theComponents = [
      {
        component : LCTimelineDetail ,
        props : {timeline : timeline} ,
        key : 'timelinedetail',
      }
    ] ;

    this.fixedBottomComponents = [
      {
        component : LCReplyToolBar ,
        props : {
          hidden : true,
          ref : 'replyBar',
          sum : timeline.comment.sum,
          timelineId : timeline.id ,
          onSucc : this._onSuccComment.bind(this) ,
        } ,
        key : 'replybar'
      } ,
      {
        component : LCShare ,
        props : {
          hidden : true,
          ref : 'share',
          url : '' ,
          icon : '' ,
          title : '' ,
          //onSucc : this._onSuccComment.bind(this) ,
          //onFail :
        }
      } ,
    ] ;

    if(this.props.showSuccTip){
      this.fixedBottomComponents.push({
        component : LCSucc,
        props : {
          ref : 'succTip',
          msg : '恭喜您，发表成功！',
          btns : [
            {
              title : '查看帖子',
              iconName : 'eye' ,
              iconSize : 40 ,
              iconColor: '#ccc',
              onPress : this._onPressLCSucc.bind(this),
            } ,
            {
              title : '继续盖楼',
              iconName : 'plug' ,
              iconSize : 40 ,
              iconColor: '#ccc',
              onPress : this._onPressLCSucc.bind(this,true),
            }
          ],
          hidden:false ,
        }
      }) ;
    }

    this.openReplyBar = !!this.props.openReplyBar ;
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _onNavigatorEvent(event) {
    if(event.type == 'NavBarButtonPress'){
      let fns = {
        'id.timeline.share' : this._onPressShare.bind(this) ,
      }

      fns[event.id] && fns[event.id]() ;
    }
  }

  _onPressLCSucc(showReplyBox){
    this.refs.succTip.hide() ;
    if(showReplyBox) this.refs.replyBar.focus() ;
  }

  _onPressShare(){
    this.refs.share.show() ;
  }

  //成功评论
  _onSuccComment(comment){
    this.refs.mainView.list.push(comment) ;

    let newState = {} ;
    newState.dataSource = this.refs.mainView.state.dataSource.cloneWithRows(this.refs.mainView.list) ;

    this.refs.mainView.setState(newState) ;
  }

  //加载完毕之后，才显示评论框
  _onMainViewDidMount(){
    this.refs.replyBar.show(()=>{
      this.timer = setTimeout(()=>{
         this.openReplyBar && this.refs.replyBar.focus() ;
      },500) ;
    }) ;
  }

  //点击之后，就去回复
  _onItemPressReplyTo(comment){
    this.refs.replyBar.reply(comment) ;
  }
}
