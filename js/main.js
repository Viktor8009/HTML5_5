// Audio Controller

var audioHandler = function(div){

    this.div = div;
    
    this.playBtn = div.querySelector(".play");
    this.muteBtn = div.querySelector(".mute");
    this.fullScreenBtn = div.querySelector(".full-screen");
    
    // Selecting and saving the audio element
    this.audio = div.querySelector("audio");
    this.video = div.querySelector("video");
    
    // Constructor
    
    this.construct = function(){
        
        this.mediaElement = this.audio == null ? this.video : this.audio;
        
        if(this.mediaElement == null)
        {
            console.error("No media-elements found");
            return;
        }
        
        // Play controll
        var self = this;
        this.playBtn.addEventListener("click", function(){
            
            self.div.handler.togglePlay();
            
        },false);
        
        // Mute controll
        
        this.muteBtn.addEventListener("click", function(){
            
            self.div.handler.toggleMute();
            
        },false);
        
        //If full-screen button exists then it's set
        
        if(this.fullScreenBtn !== null)
        {
            this.fullScreenBtn.addEventListener("click",function(){
                
                if(self.video.parentNode.classList.contains("col-md-12"))
                {   
                    self.video.parentNode.classList.remove("col-md-12");
                    self.video.parentNode.classList.add("col-md-3");    
                }
                else
                {   
                    self.video.parentNode.classList.remove("col-md-3");
                    self.video.parentNode.classList.add("col-md-12");    
                }
                        
            },false);
        };
    
        
        this.mediaElement.volume=0.23;
    };
    
    //Play
    this.play = function(){
        
        this.mediaElement.play();        
    };
    
    // Toggle play
    
    this.togglePlay = function(){
        
        if(this.mediaElement.paused)
        {
            this.play();
            this.div.classList.add("played");
        }
        else{
            
            this.pause();
            this.div.classList.remove("played");
        }
    };
    
    
    //Pause
    this.pause = function(){
        
        this.mediaElement.pause();
    };
    
    //Setting the volume
    this.volume = function(vol){
       
        this.mediaElement.volume = vol;   
       
   }
    
    //Muting
    this.mute = function(){
        
        this.mediaElement.muted = true;  
    };
    
    
    // Toggling mute
    this.toggleMute = function(){
        
        this.mediaElement.muted = !this.mediaElement.muted;
        
        if(this.mediaElement.muted)
        {
            this.div.classList.add("muted");
        }
        else{
            
            this.div.classList.remove("muted");
        }
    };
    
    
    //Muting all audio elements
    this.muteAll = function(){
        
        var allAudio = document.querySelectorAll("audio,video");
        
        //Iterating through each of them
       Array.prototype.forEach.call(allAudio,function(listItem){
          
           listItem.muted = true;
           
       });
    };
    
    
    //Seeking audio
    this.setTime = function(cTime){
        
        cTime = parseInt(cTime, 10);
        
        if(isNaN(cTime))
        {      
            console.error("The value must be a number!");
            return;          
        }
        
        // Value of cTime to see whether its value greater than the length of audio
        cTime = cTime < this.audio.duration ? cTime : this.audio.duration;
        
        
        // setting the seeking-time
        this.mediaElement.currentTime = cTime;
        
    }
    
    this.construct();
    
};

var audioDivs = document.querySelectorAll(".media-handler-div");

Array.prototype.forEach.call(audioDivs, function(item){
    
   item.handler = new audioHandler(item);
    
});

//var audio1 = new audioHandler(".audio1");
//var audio2 = new audioHandler(".audio2");



