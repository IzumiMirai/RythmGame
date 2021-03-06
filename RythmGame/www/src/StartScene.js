var StartLayer = cc.Layer.extend({
    timeTick:0,
    startButton:null,
    background:null,
    ctor:function()
    {
        this._super();
        this.background = new cc.Sprite(asset.MenuScreen_png);
        this.background.attr({x:cc.winSize.width/2, y:cc.winSize.height/2});
        this.addChild(this.background,0);
        this.startButton = new cc.Sprite(asset.Retry_png);
        this.startButton.attr({x:cc.winSize.width/2, y:cc.winSize.height/6});
        
        
        this.addChild(this.startButton,1);
        
        //Checks for touches
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            console.log("Adding touch listener");
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesEnded: function (touches, event) {
                    console.log("Touch event");
                     for(var touch in touches){                    
                        event.getCurrentTarget().processEvent(touches[0]);
                      }
                    }
                }, this);
        }
        else
        {
            console.log("Touches not supported");
        }
        this.scheduleUpdate();
        return true;    
    },
        
    
    processEvent:function(touch)
    {
        touch = touch.getLocation();
        console.log(touch);
        var bb = this.startButton.getBoundingBoxToWorld();
        if(bb.x < touch.x && bb.y < touch.y && bb.x + bb.width > touch.x && bb.x + bb.height > touch.y)
        {
            console.log("Startin");
            this.startGame();
        }
    },
    startGame:function()
    {
        var scene =new cc.Scene();
        scene.addChild(new SongLayer());
        cc.director.runScene(new cc.TransitionFade(1.2,scene));     
    }
    
});
var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});



