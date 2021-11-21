window.TrackJS && TrackJS.install({ 
    token: "e9eb806865b14c10a044563560eb1b20"
    // for more configuration options, see https://docs.trackjs.com
  });

  TrackJS.track('Testing TrackJS!');

/* object literal wrapper to avoid namespace conflicts */
var AjaxTCRExamples = {};
 
/* URL of your server-side error recording script */
AjaxTCRExamples.errorReportingURL = "http://ajaxref.com/ch2/setjavascripterror.php";
 
AjaxTCRExamples.encodeValue = function(val)
{
 var encodedVal;
 if (!encodeURIComponent)
 {
   encodedVal = escape(val);
   /* fix the omissions */
   encodedVal = encodedVal.replace(/@/g, '%40');
   encodedVal = encodedVal.replace(/\//g, '%2F');
   encodedVal = encodedVal.replace(/\+/g, '%2B');
 }
 else
 {
   encodedVal = encodeURIComponent(val);
   /* fix the omissions */
   encodedVal = encodedVal.replace(/~/g, '%7E');
   encodedVal = encodedVal.replace(/!/g, '%21');
   encodedVal = encodedVal.replace(/\(/g, '%28');
   encodedVal = encodedVal.replace(/\)/g, '%29');
   encodedVal = encodedVal.replace(/'/g, '%27');
 }
 /* clean up the spaces and return */
 return encodedVal.replace(/\%20/g,'+'); 
}    
 
AjaxTCRExamples.reportJSError = function (errorMessage,url,lineNumber)
{
    function sendRequest(url,payload)
    {
         var img = new Image();
         img.src = url+"?"+payload;
    }
    
    /* form payload string with error data */
    var payload = "url=" + AjaxTCRExamples.encodeValue(url);
    payload += "&message=" + AjaxTCRExamples.encodeValue(errorMessage);
    payload += "&line=" + AjaxTCRExamples.encodeValue(lineNumber);
 
    /* submit error message  */
    sendRequest(AjaxTCRExamples.errorReportingURL,payload);
 
    alert("JavaScript Error Encountered.  \nSite Administrators have been notified.");
 
    return true; // suppress normal JS errors since we handled
}
 
AjaxTCRExamples.registerErrorHandler = function () 
{    
    if (window.onerror) // then one exists
      {
       var oldError = window.onerror;
       var newErrorHandler = function (errorMessage,url,lineNumber) { AjaxTCRExamples.reportJSError(errorMessage,url,lineNumber); oldError(errorMessage,url,lineNumber); }
       window.onerror = newErrorHandler;
      }
    else
      window.onerror = AjaxTCRExamples.reportJSError;
      console.log("error");
      fetch("https://capture.trackjs.com/capture?token=e9eb806865b14c10a044563560eb1b20", {
        method: "POST"});
}
 
/* bind the error handler */
AjaxTCRExamples.registerErrorHandler();
