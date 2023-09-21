
export const handleKeyPress = (event) => {
    if(event.shiftKey){
        switch (event.keyCode) {
            case 78:console.log(`Key pressed: ${event.key}`);
                
                break;
        
            default:
                break;
        }
    }
   
    // if (event.shiftKey && event.keyCode === 78) {
    //   console.log("Hello");
    // }
    // console.log(`Key pressed: ${event.key}`);
  };